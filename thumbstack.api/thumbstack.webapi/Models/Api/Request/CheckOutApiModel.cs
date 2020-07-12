using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace thumbstack.webapi.Models.Api.Request
{
    public class CheckOutApiModel
    {
        [Required]
        public int? OrderId { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public double? TipPercentage { get; set; }
    }
}
