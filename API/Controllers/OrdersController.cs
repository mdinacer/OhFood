using API.Data;
using API.DTO;
using API.Entities;
using API.Entities.OrderAggregate;
using API.Extensions;
using API.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class OrdersController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IHubContext<MainHub> _hub;

        public OrdersController(StoreContext context, IHubContext<MainHub> hub)
        {
            _context = context;
            _hub = hub;
        }

        [HttpGet]
        public async Task<ActionResult<List<OrderDto>>> GetOrders()
        {
            return await _context.Orders
                .Where(o => o.BuyerId == User.Identity!.Name)
                .ToOrderDto()
                .ToListAsync();
        }

        [HttpGet("{id}", Name = "GetOrder")]
        public async Task<ActionResult<OrderDto>> GetOrder(int id)
        {
            var order = await _context.Orders
                .Where(o => o.BuyerId == User.Identity!.Name && o.Id == id)
                .ToOrderDto()
                .FirstOrDefaultAsync();

            if (order == null) return NotFound();

            return order;
        }

        [HttpPost]
        public async Task<ActionResult<int>> CreateOrder(CreateOrderDto orderDto)
        {
            var buyerId = User.Identity.Name;
            var basket = await _context.Baskets
                .RetrieveBasketWithItems(buyerId)
                .FirstOrDefaultAsync();

            if (basket == null)
                return BadRequest(new ProblemDetails { Title = "Could not locate basket", Type = "ItemNotFound" });

            var items = new List<OrderItem>();

            basket.Items.ForEach(async (item) =>
            {
                var productItem = await _context.Products.FindAsync(item.ProductId);
                var itemOrdered = new ProductItemOrdered
                {
                    ProductId = productItem.Id,
                    Name = productItem.Name,
                    PictureUrl = productItem.PictureUrl,
                };

                var orderItem = new OrderItem
                {
                    ItemOrdered = itemOrdered,
                    Price = productItem.Price,
                    Quantity = item.Quantity,
                };
                items.Add(orderItem);
                productItem.Inventory -= item.Quantity;
            });

            var subtotal = items.Sum(item => item.Price * item.Quantity);
            var deliveryFee = subtotal < 10000 ? 300 : 0;

            var order = new Order
            {
                Items = items,
                BuyerId = buyerId,
                ShippingAddress = orderDto.ShippingAddress,
                Subtotal = subtotal,
                DeliveryFee = deliveryFee,
            };

            _context.Orders.Add(order);
            _context.Baskets.Remove(basket);

            if (orderDto.SaveAddress)
            {
                var user = await _context.Users
                    .Include(u => u.Address)
                    .SingleOrDefaultAsync(x => x.UserName == buyerId);

                var address = new UserAddress
                {
                    FullName = orderDto.ShippingAddress.FullName,
                    Address1 = orderDto.ShippingAddress.Address1,
                    //Address2 = orderDto.ShippingAddress.Address2,
                    City = orderDto.ShippingAddress.City,
                    //State = orderDto.ShippingAddress.State,
                    //ZipCode = orderDto.ShippingAddress.ZipCode,
                    //Country = orderDto.ShippingAddress.Country,
                };

                user.Address = address;
            }

            var success = await _context.SaveChangesAsync() > 0;
            
            await _hub.Clients.Group("Admin").SendAsync("OrderAdded",orderDto);

            return success
                ? CreatedAtRoute("GetOrder", new { id = order.Id }, order.Id)
                : BadRequest("Problem creating order");
        }
    }
}