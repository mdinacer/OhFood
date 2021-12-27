using System.ComponentModel.DataAnnotations;

namespace API.DTO;

public class AnnounceDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string PictureUrl { get; set; }
    public string? PublicId { get; set; }
    public string Description { get; set; }
}

public class CreateAnnounceDto
{
    [Required]
    public string Title { get; set; }
    [Required]
    public IFormFile File { get; set; }
    public string Description { get; set; }
    public string? PublicId { get; set; }
}

public class UpdateAnnounceDto
{
    public int Id { get; set; }
    [Required]
    public string Title { get; set; }
    [Required]
    public IFormFile File { get; set; }
    public string Description { get; set; }
    public string? PublicId { get; set; }
}