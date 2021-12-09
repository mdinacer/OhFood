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


        public static IQueryable<Product> Filter(this IQueryable<Product> query, string? brands, string? types)
        {
            var brandsList = !string.IsNullOrEmpty(brands)
                ? new List<string>(brands.ToLower().Split(','))
                : null;

            var typesList = !string.IsNullOrEmpty(types)
                ? new List<string>(types.ToLower().Split(','))
                : null;

            if (brandsList != null && brandsList.Any())
                query = query.Where(p => brandsList.Contains(p.Brand.ToLower()));

            if (typesList != null && typesList.Any())
                query = query.Where(p => typesList.Contains(p.Type.ToLower()));

            return query;
        }
    }

}