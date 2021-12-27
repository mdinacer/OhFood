namespace API.DTO;

public class ProductDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public string? PictureUrl { get; set; }
    public string Type { get; set; }
    public string Ingredients { get; set; }
    public int Inventory { get; set; }
    public string? PublicId { get; set; }
}

public class ProductLiteDto
{

    public string Name { get; set; }
    public decimal Price { get; set; }
    public string? Description { get; set; }
    public string Ingredients { get; set; }
}