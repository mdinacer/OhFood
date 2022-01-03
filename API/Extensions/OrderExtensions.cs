using API.DTO;
using API.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrderDto> ToOrderDto(this IQueryable<Order> query)
        {
            return query.Select(order => new OrderDto
            {
                Id = order.Id,
                BuyerId = order.BuyerId,
                OrderDate = order.OrderDate,
                ShippingAddress = order.ShippingAddress,
                DeliveryFee = order.DeliveryFee,
                Subtotal = order.Subtotal,
                Status = order.Status.ToString(),
                Total = order.GetTotal(),
                Items = order.Items.Select(item => new OrderItemDto
                {
                    ProductId = item.ItemOrdered.ProductId,
                    Name = item.ItemOrdered.Name,
                    PictureUrl = item.ItemOrdered.PictureUrl,
                    Price = item.Price,
                    Quantity = item.Quantity,
                }).ToList()
            }).AsNoTracking();
        }

        public static IQueryable<Order> Sort(this IQueryable<Order> query, string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return query.OrderBy(p => p.OrderDate).ThenBy(p => p.Status);

            query = orderBy switch
            {
                "dateAsc" => query.OrderBy(p => p.OrderDate),
                "dateDesc" => query.OrderByDescending(p => p.OrderDate),
                "status" => query.OrderByDescending(p => p.Status),
                _ => query.OrderBy(p => p.OrderDate).ThenBy(p => p.Status)
            };
            return query;
        }

        public static IQueryable<Order> Search(this IQueryable<Order> query, string? searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
                return query;

            searchTerm = searchTerm.Trim().ToLower();

            query = query.Where(p => p.BuyerId.ToLower().Contains(searchTerm));
            return query;
        }


        public static IQueryable<Order> Filter(this IQueryable<Order> query, int? status)
        {
            if (status is >= 0)
                query = query.Where(p => p.Status == (OrderStatus)status);

            return query;
        }
    }
}