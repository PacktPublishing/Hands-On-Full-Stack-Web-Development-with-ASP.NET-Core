using System.ComponentModel.DataAnnotations;

namespace GiveNTake.Model.DTO
{
    public class NewProductDTO
    {
        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string Title { get; set; }
        [MaxLength(50)]
        public string Description { get; set; }
        [Required]
        public string Category { get; set; }
        [Required]
        public string Subcategory { get; set; }
        [Required]
        public string City { get; set; }
    }
}