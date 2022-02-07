using System.ComponentModel.DataAnnotations;

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

public class CreateCategoryDto
{
    [Required] public string Name { get; set; }
    [Required] public IFormFile File { get; set; }
}

public class UpdateCategoryDto
{
    [Required] public int Id { get; set; }
    [Required] public string Name { get; set; }
    public IFormFile? File { get; set; }
}