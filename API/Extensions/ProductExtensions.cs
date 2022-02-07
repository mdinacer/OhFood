using API.Entities;

namespace API.Extensions
{
    public static class ProductExtensions
    {
        public static IQueryable<Product> Sort(this IQueryable<Product> query, string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return query.OrderBy(p => p.Name);

            query = orderBy switch
            {
                "id" => query.OrderBy(p => p.Id),
                "category" => query.OrderBy(p => p.CategoryId).ThenBy(p => p.Id),
                "price" => query.OrderBy(p => p.Price),
                "priceDesc" => query.OrderByDescending(p => p.Price),
                _ => query.OrderBy(p => p.Name),
            };
            return query;
        }

        public static IQueryable<Product> Search(this IQueryable<Product> query, string? searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
                return query;

            searchTerm = searchTerm.Trim().ToLower();

            query = query.Where(p => p.Name.ToLower().Contains(searchTerm));
            return query;
        }


        public static IQueryable<Product> Filter(this IQueryable<Product> query, int? category)
        {
            if (category is >= 0)
                query = query.Where(p => p.CategoryId == category);

            return query;
        }
    }
}