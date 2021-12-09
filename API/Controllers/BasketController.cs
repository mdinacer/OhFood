using API.Data;
using API.DTO;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        const string buyerIdVal = "buyerId";
        private readonly StoreContext _context;
        public BasketController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetriveBasket(GetBuyerId());

            return basket.ToBasketDto();
        }

        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            var basket = await RetriveBasket(GetBuyerId()) ?? CreateBasket();
            var product = await _context.Products
                .SingleOrDefaultAsync(p => p.Id == productId);
            if (product == null) return BadRequest(new ProblemDetails { Title = "Product not found" });
            basket.AddItem(product, quantity);

            var success = await _context.SaveChangesAsync() > 0;

            return success
                ? CreatedAtRoute("GetBasket", basket.ToBasketDto())
                : BadRequest(new ProblemDetails { Title = "Problem adding item to basket" });
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            var basket = await RetriveBasket(GetBuyerId());
            if (basket == null) return NotFound();

            basket.RemoveItem(productId, quantity);

            var success = await _context.SaveChangesAsync() > 0;

            return success
                ? StatusCode(201)
                : BadRequest(new ProblemDetails { Title = "Problem removing item from basket" });
        }

        private async Task<Basket?> RetriveBasket(string? buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }
            return await _context.Baskets
                            .Include(basket => basket.Items)
                            .ThenInclude(item => item.Product)
                            .SingleOrDefaultAsync(basket => basket.BuyerId == buyerId);
        }

        private string? GetBuyerId()
        {
            return User.Identity?.Name ?? Request.Cookies["buyerId"];
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
            Response.Cookies.Append(buyerIdVal, buyerId, cookieOptions);
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