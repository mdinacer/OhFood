using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class User : IdentityUser
    {
        public int ProfileId { get; set; }
        public UserProfile Profile { get; set; } = new();
    }
}