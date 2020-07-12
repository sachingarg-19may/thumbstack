using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace thumbstack.webapi.Models.Api.Request
{
    public class FoodItemApiModel
    {
        [Required(AllowEmptyStrings = false)]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [Range(0.01, double.MaxValue)]
        public double? Cost { get; set; }
    }
}
