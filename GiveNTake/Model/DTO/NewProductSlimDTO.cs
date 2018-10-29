using System.ComponentModel.DataAnnotations;

namespace GiveNTake.Model.DTO
{
    public class NewProductSlimDTO
    {
        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string Title { get; set; }
        [MaxLength(50)]
        public string Description { get; set; }
        [Required]
        public string Category { get; set; }
    }
}