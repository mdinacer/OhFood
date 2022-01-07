using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class AddressDto
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Address1 { get; set; }
        public string City { get; set; }
        public bool IsDefault { get; set; }
    }

    public class CreateAddressDto
    {
        [Required]
        public string FullName { get; set; }
        [Required]
        public string Address1 { get; set; }
        [Required]
        public string City { get; set; }
        public bool IsDefault { get; set; }
    }




}