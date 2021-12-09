using System.ComponentModel.DataAnnotations;

namespace API.DTO
{
    public class CreateProductDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string? Description { get; set; }
        [Required]
        [Range(100, double.PositiveInfinity)]
        public decimal Price { get; set; }
        [Required]
        public IFormFile File { get; set; }
        [Required]
        public string Type { get; set; }
        [Required]
        public string Brand { get; set; }
        [Required]
        [Range(0, 10000)]
        public int Inventory { get; set; }
    }
}