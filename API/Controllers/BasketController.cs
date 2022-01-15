using API.Data;
using API.DTO;
using API.Entities;
using API.Extensions;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private const string BuyerIdVal = "buyerId";
        private readonly StoreContext _context;
        private readonly IMapper _mapper;

        public BasketController(StoreContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket(GetBuyerId());

            if (basket == null) return NotFound();

            return basket.ToBasketDto();
        }

        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            var basket = await RetrieveBasket(GetBuyerId()) ?? CreateBasket();
            var product = await _context.Products
                .Include(p => p.Category)
                .SingleOrDefaultAsync(p => p.Id == productId);
            if (product == null) return BadRequest(new ProblemDetails { Title = "Product not found" });
            basket.AddItem(product, quantity);

            var success = await _context.SaveChangesAsync() > 0;


            var basketDto = basket.ToBasketDto();

            return success
                ? CreatedAtRoute("GetBasket", basketDto)
                : BadRequest(new ProblemDetails { Title = "Problem adding item to basket" });
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            var basket = await RetrieveBasket(GetBuyerId());
            if (basket == null) return NotFound();

            basket.RemoveItem(productId, quantity);

            var success = await _context.SaveChangesAsync() > 0;

            return success
                ? StatusCode(201)
                : BadRequest(new ProblemDetails { Title = "Problem removing item from basket" });
        }

        private async Task<Basket?> RetrieveBasket(string? buyerId)
        {
            if (!string.IsNullOrEmpty(buyerId))
                return await _context.Baskets
                    .Include(basket => basket.Items)
                    .ThenInclude(item => item.Product)
                    .ThenInclude(p => p.Category)
                    .SingleOrDefaultAsync(basket => basket.BuyerId == buyerId);
            Response.Cookies.Delete(BuyerIdVal);
            return null;
        }

        private string? GetBuyerId()
        {
            return User.Identity?.Name ?? Request.Cookies[BuyerIdVal];
        }

        private Basket CreateBasket()
        {
            var buyerId = User.Identity?.Name;
            if (string.IsNullOrEmpty(buyerId))
            {
                buyerId = Guid.NewGuid().ToString();
            }

            var cookieOptions = new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.Now.AddDays(30),
            };
            Response.Cookies.Append(BuyerIdVal, buyerId, cookieOptions);
            var basket = new Basket(buyerId);
            _context.Baskets.Add(basket);
            return basket;
        }

        // private BasketDto MapBasketToDto(Basket basket)
        // {
        //     return new BasketDto
        //     {
        //         Id = basket.Id,
        //         BuyerId = basket.BuyerId,
        //         Items = basket.Items.Select(item => new BasketItemDto
        //         {
        //             ProductId = item.ProductId,
        //             Name = item.Product.Name,
        //             Brand = item.Product.Brand,
        //             Type = item.Product.Type,
        //             PictureUrl = item.Product.PictureUrl,
        //             Price = item.Product.Price,
        //             Quantity = item.Quantity
        //         }).ToList()
        //     };
        // }
    }
}