namespace API.Entities;

public class ProductType
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string? PictureUrl { get; set; }
    public string? PublicId { get; set; }
    public List<Product> Products { get; set; } = new();

    public ProductType()
    {
    }

    public ProductType(string name, string? pictureUrl)
    {
        Name = name;
        PictureUrl = pictureUrl;
    }
}