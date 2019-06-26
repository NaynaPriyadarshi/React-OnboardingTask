using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace React_Project1.Models
{
    public partial class Product
    {
        public Product()
        {
            Sales = new HashSet<Sales>();
        }

        [Key]
        public int Id { get; set; }

        [DisplayName("Product Name")]
        [Required(ErrorMessage = "Product Name is required")]
        [StringLength(20, MinimumLength = 2)]
        public string Name { get; set; }

        [Required(ErrorMessage = "Price is required")]
        public double Price { get; set; }

        public virtual ICollection<Sales> Sales { get; set; }
    }
}
