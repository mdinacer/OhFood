using System.ComponentModel.DataAnnotations;

namespace API.DTO
{
    public class AddressDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string FullName { get; set; }
        public string Address1 { get; set; }
        
        public string Country { get; set; }
        public string Postcode { get; set; }
        public string State { get; set; }
        public string County { get; set; }
        public string? Suburb { get; set; }
        public string? Town { get; set; }
        public string Neighbourhood { get; set; }
        public string Longitude { get; set; }
        public string Latitude { get; set; }
        public bool IsDefault { get; set; }
    }

    public class CreateAddressDto
    {
        [Required] public string Title { get; set; }
        [Required] public string FullName { get; set; }
        [Required] public string Address1 { get; set; }
        [Required] public string Country { get; set; }
        [Required] public string Postcode { get; set; }
        [Required] public string State { get; set; }
        [Required] public string County { get; set; }
        public string? Suburb { get; set; }
        public string? Town { get; set; }
        [Required] public string Neighbourhood { get; set; }
        [Required] public string Longitude { get; set; }
        [Required] public string Latitude { get; set; }
        [Required] public bool IsDefault { get; set; }
    }
}