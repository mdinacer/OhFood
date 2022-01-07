namespace API.Entities;

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string? PictureUrl { get; set; }
    public string? PublicId { get; set; }
    public List<Product> Products { get; set; } = new();

    public Category()
    {
    }

    public Category(string name, string? pictureUrl)
    {
        Name = name;
        PictureUrl = pictureUrl;
    }
}