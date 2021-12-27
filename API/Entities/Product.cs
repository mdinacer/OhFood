namespace API.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public string? PictureUrl { get; set; }
        public int TypeId { get; set; }
        public ProductType Type { get; set; }
        public string? Ingredients { get; set; }
        public int Inventory { get; set; }
        public string? PublicId { get; set; }

        
    }
}