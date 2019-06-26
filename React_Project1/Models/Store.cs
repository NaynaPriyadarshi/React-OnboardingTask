using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace React_Project1.Models
{
    public partial class Store
    {
        public Store()
        {
            Sales = new HashSet<Sales>();
        }

        [Key]
        public int Id { get; set; }

        [DisplayName("Store Name")]
        [Required(ErrorMessage = "Store Name is required")]
        [StringLength(20, MinimumLength = 3)]
        public string Name { get; set; }


        [Required(ErrorMessage = "Store Address is required")]
        [StringLength(70)]
        public string Address { get; set; }

        public virtual ICollection<Sales> Sales { get; set; }
    }
}
