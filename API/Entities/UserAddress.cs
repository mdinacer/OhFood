namespace API.Entities
{
    public class UserAddress : Address
    {
        public int Id { get; set; }
        public bool IsDefault { get; set; }
        
    }
}