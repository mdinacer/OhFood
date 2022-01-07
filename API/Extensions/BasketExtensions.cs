using API.DTO;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class BasketExtensions
    {
        public static BasketDto ToBasketDto(this Basket basket)
        {
            var basketDto = new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    category = item.Product.Category.Name,
                    PictureUrl = item.Product.PictureUrl,
                    Price = item.Product.Price,
                    Quantity = item.Quantity
                }).ToList(),
            };

            return basketDto;
        }

        public static IQueryable<Basket> RetrieveBasketWithItems(this IQueryable<Basket> query, string buyerId)
        {
            return query.Include(b => b.Items)
                .ThenInclude(item => item.Product)
                .ThenInclude(p => p.Category)
                .Where(b => b.BuyerId == buyerId);
        }
    }
}