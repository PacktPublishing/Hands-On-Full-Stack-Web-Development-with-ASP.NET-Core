using System;
using System.Collections.Generic;

namespace GiveNTake.Model
{
    public class Product
    {
        public int ProductId { get; set; }
        public User Owner { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Category Category { get; set; }
        public City City { get; set; }
        public IList<ProductMedia> Media { get; set; }
        public DateTime PublishDate { get; set; }
        
    }
}