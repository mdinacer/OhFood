namespace API.Entities
{
    public class Address
    {
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
    }
}