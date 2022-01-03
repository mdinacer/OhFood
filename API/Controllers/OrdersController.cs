using API.Data;
using API.DTO;
using API.Entities;
using API.Entities.OrderAggregate;
using API.Extensions;
using API.Helpers;
using API.Hubs;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
public class OrdersController : BaseApiController
{
    private readonly StoreContext _context;
    private readonly UserManager<User> _userManager;
    private readonly IHubContext<MainHub> _hub;
    private readonly IMapper _mapper;

    public OrdersController(StoreContext context, UserManager<User> userManager, IHubContext<MainHub> hub,
        IMapper mapper)
    {
        _context = context;
        _userManager = userManager;
        _hub = hub;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<PagedList<OrderDto>>> GetOrders([FromQuery] OrderParams orderParams)
    {
        var user = await _userManager.FindByNameAsync(User.Identity!.Name);

        var isAdmin = await _userManager.IsInRoleAsync(user, "Admin");

        var query = _context.Orders
            .Where(o => isAdmin || o.BuyerId == User.Identity!.Name)
            .Filter(orderParams.status)
            .Search(orderParams.SearchTerm)
            .OrderByDescending(p => p.OrderDate)
            .ThenBy(p => p.Status)
            .ToOrderDto();

        var orders =
            await PagedList<OrderDto>.ToPagedList(query, orderParams.PageNumber, orderParams.PageSize);

        Response.AddPaginationHeader(orders.MetaData);
        return orders;
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("listAll")]
    public async Task<ActionResult<PagedList<OrderDto>>> GetAllOrders([FromQuery] OrderParams orderParams)
    {
        var query = _context.Orders
            .Filter(orderParams.status)
            .Search(orderParams.SearchTerm)
            .Sort(orderParams.OrderBy)
            .ToOrderDto();
        var orders =
            await PagedList<OrderDto>.ToPagedList(query, orderParams.PageNumber, orderParams.PageSize);

        Response.AddPaginationHeader(orders.MetaData);
        return orders;
    }

    [HttpGet("{id:int}", Name = "GetOrder")]
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
        var basket = await _context.Baskets
            .RetrieveBasketWithItems(User.Identity!.Name!)
            .FirstOrDefaultAsync();

        if (basket == null) return BadRequest(new ProblemDetails { Title = "Could not locate basket" });

        var items = new List<OrderItem>();

        foreach (var item in basket.Items)
        {
            var productItem = await _context.Products.FindAsync(item.ProductId);
            var itemOrdered = new ProductItemOrdered
            {
                ProductId = productItem!.Id,
                Name = productItem.Name,
                PictureUrl = productItem.PictureUrl
            };

            var orderItem = new OrderItem
            {
                ItemOrdered = itemOrdered,
                Price = productItem.Price,
                Quantity = item.Quantity
            };
            items.Add(orderItem);
            productItem.Inventory -= item.Quantity;
        }

        var subtotal = items.Sum(item => item.Price * item.Quantity);
        var deliveryFee = subtotal > 10000 ? 0 : 500;

        var order = new Order
        {
            Items = items,
            BuyerId = User.Identity.Name!,
            ShippingAddress = orderDto.ShippingAddress,
            Subtotal = subtotal,
            DeliveryFee = deliveryFee,
        };

        _context.Orders.Add(order);
        _context.Baskets.Remove(basket);

        if (orderDto.SaveAddress)
        {
            var user = await _context.Users
                .Include(a => a.Address)
                .FirstOrDefaultAsync(x => x.UserName == User.Identity.Name);

            var address = new UserAddress
            {
                FullName = orderDto.ShippingAddress.FullName,
                Address1 = orderDto.ShippingAddress.Address1,
                City = orderDto.ShippingAddress.City,
            };
            user!.Address = address;
        }

        var result = await _context.SaveChangesAsync() > 0;

        if (result)
        {
            //await _hub.Clients.Group("Admin").SendAsync("NotifyAdmin", order);
            return CreatedAtRoute("GetOrder", new { id = order.Id }, order.Id);
        }

        return BadRequest(new ProblemDetails { Title = "Problem creating order" });
    }

    [Authorize(Roles = "Admin")]
    [HttpPut]
    public async Task<ActionResult<Product>> UpdateOrderStatus(UpdateOrderDto updateOrderDto)
    {
        var order = await _context.Orders.FindAsync(updateOrderDto.Id);

        if (order == null) return NotFound();

        _mapper.Map(updateOrderDto, order);


        var success = await _context.SaveChangesAsync() > 0;

        return success
            ? Ok(order)
            : BadRequest(new ProblemDetails { Title = "Problem updating order" });
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteProduct(int id)
    {
        var order = await _context.Orders.FindAsync(id);

        if (order == null) return NotFound();

        _context.Orders.Remove(order);

        var success = await _context.SaveChangesAsync() > 0;

        return success
            ? Ok()
            : BadRequest(new ProblemDetails { Title = "Problem deleting product" });
    }
}