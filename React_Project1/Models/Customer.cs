using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace React_Project1.Models
{
    public partial class Customer
    {
        public Customer()
        {
            Sales = new HashSet<Sales>();
        }
        [Key]
        public int Id { get; set; }

        [DisplayName("Customer Name")]
        [Required(ErrorMessage = "Customer Name is Required")]
        [StringLength(20, MinimumLength = 2)]

        public string Name { get; set; }

        [Required(ErrorMessage = "Customer Address is required")]
        [StringLength(70)]
        public string Address { get; set; }

        public virtual ICollection<Sales> Sales { get; set; }
    }
}
