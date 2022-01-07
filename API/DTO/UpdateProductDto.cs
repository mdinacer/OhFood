using System.ComponentModel.DataAnnotations;

namespace API.DTO
{
    public class UpdateProductDto
    {
        public int Id { get; set; }

        [Required] public string Name { get; set; }

        [Required] public string? Description { get; set; }

        [Required]
        [Range(100, double.PositiveInfinity)]
        public decimal Price { get; set; }

        public IFormFile? File { get; set; }

        [Required] public string Category { get; set; }

        [Required] [Range(0, 10000)] public int Inventory { get; set; }
    }
}