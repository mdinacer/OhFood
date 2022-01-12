namespace API.DTO
{
    public class RegisterDto : LoginDto
    {
        public string Email { get; set; }
        public CreateUserProfileDto Profile { get; set; }
    }
}