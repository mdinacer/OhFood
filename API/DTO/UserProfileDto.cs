using System.ComponentModel.DataAnnotations;
using API.Entities;

namespace API.DTO;

public class UserProfileDto
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Phone1 { get; set; }
    public string? Phone2 { get; set; }
    public string? PictureUrl { get; set; }
    public string? PublicId { get; set; }
    public DateTime CreationDate { get; set; } = DateTime.UtcNow;
    public DateTime LastLogin { get; set; } = DateTime.UtcNow;
}

public class CreateUserProfileDto
{
    [Required] public string FirstName { get; set; }
    [Required] public string LastName { get; set; }
    [Required] public string Phone1 { get; set; }
    public string? Phone2 { get; set; }
    public IFormFile? File { get; set; }
}

public class UpdateUserProfileDto
{
    [Required] public string FirstName { get; set; }
    [Required] public string LastName { get; set; }
    [Required] public string Phone1 { get; set; }
    public string? Phone2 { get; set; }
    public IFormFile? File { get; set; }
}