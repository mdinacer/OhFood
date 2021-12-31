using System.ComponentModel.DataAnnotations;

namespace API.DTO;

public class ForgotPasswordRequest
{
    [Required] [EmailAddress] public string Email { get; set; }
}