using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace React_Project1.Models
{
    public partial class Sales
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int CustomerId { get; set; }
        public int StoreId { get; set; }

        [Required(ErrorMessage = "Enter the Sale date.")]
        [DataType(DataType.Date)]

        public DateTime DateSold { get; set; }

        public virtual Customer Customer { get; set; }
        public virtual Product Product { get; set; }
        public virtual Store Store { get; set; }
    }
}
