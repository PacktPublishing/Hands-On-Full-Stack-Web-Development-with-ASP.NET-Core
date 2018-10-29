using System.ComponentModel.DataAnnotations;

namespace GiveNTake.Model.DTO
{
    public class NewCategoryDTO
    {
        [Required]
        public string CategoryName { get; set; }
        public string SubcategoryName { get; set; }
    }
}