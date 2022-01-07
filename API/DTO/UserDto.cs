namespace API.DTO
{
    public class UserDto
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public UserProfileDto Profile { get; set; }
        public BasketDto? Basket { get; set; }
    }
}