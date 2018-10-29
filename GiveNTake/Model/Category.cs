using System.Collections.Generic;

namespace GiveNTake.Model
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IList<Category> Subcategories { get; set; }
        public Category ParentCategory { get; set; }
    }
}