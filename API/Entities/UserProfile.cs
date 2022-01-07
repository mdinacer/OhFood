namespace API.Entities;

public class UserProfile
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Phone1 { get; set; }
    public string? Phone2 { get; set; }
    public string? PictureUrl { get; set; }
    
    public List<UserAddress> Addresses { get; set; } = new();
    public DateTime CreationDate { get; set; } = DateTime.UtcNow;
    public DateTime LastLogin { get; set; } = DateTime.UtcNow;
    
    
    public string UserId { get; set; }
    public User User { get; set; }

    public UserProfile()
    {
    }


    public override string ToString()
    {
        return $"{FirstName} {LastName}";
    }
}