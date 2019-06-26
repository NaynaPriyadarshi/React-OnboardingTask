using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace React_Project1.Models
{
    public partial class Sales
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Product id is required")]
        public int ProductId { get; set; }


        [Required(ErrorMessage = "Customer id is required")]
        public int CustomerId { get; set; }


        [Required(ErrorMessage = "Store id is required")]
        public int StoreId { get; set; }


               
        [Required(ErrorMessage = "Enter the Sale date.")]
        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:MM/dd/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime DateSold { get; set; }

        public virtual Customer Customer { get; set; }
        public virtual Product Product { get; set; }
        public virtual Store Store { get; set; }
    }
}
