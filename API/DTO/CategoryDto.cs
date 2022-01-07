namespace API.DTO;

public class CategoryDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string PictureUrl { get; set; }
    public string? PublicId { get; set; }
}


public class CategoryFullDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string PictureUrl { get; set; }
    public List<ProductLiteDto> Products { get; set; }
}