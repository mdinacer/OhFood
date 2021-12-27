namespace API.DTO;

public class ProductTypeDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string PictureUrl { get; set; }
    public string? PublicId { get; set; }
}


public class ProductTypeFullDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string PictureUrl { get; set; }
    public List<ProductLiteDto> Products { get; set; }
}