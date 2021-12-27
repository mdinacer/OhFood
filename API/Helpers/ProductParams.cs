namespace API.Helpers
{
    public class ProductParams : PaginationParams
    {
        public string OrderBy { get; set; } = "name";
        public string? SearchTerm { get; set; }
        public int? ProductType { get; set; }
    }
}