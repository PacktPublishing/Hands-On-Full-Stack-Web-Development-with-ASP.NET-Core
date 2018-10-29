using System.Collections.Generic;

namespace GiveNTake.Model.DTO
{
    public class CategoryDTO
    {
        public string Name { get; set; }
        public IList<SubCategoryDTO> Subcategories { get; set; }
    }
}