using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace thumbstack.webapi.Models.Api.Request
{
    public class AddUpdateOderApiModel
    {
        [Required(AllowEmptyStrings = false)]
        public string CustomerName { get; set; }
        public List<OrderItemApiModel> Items { get; set; }
    }

    public class OrderItemApiModel
    {
        [Required]
        public int? FoodItemId { get; set; }

        [Required]
        [Range(0, 100)]
        public int? Quantity { get; set; }
    }
}
