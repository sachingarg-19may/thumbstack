using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thumbstack.webapi.Models.Data
{
    public class OrderItem : BaseEntity
    {
        public int OrderId { get; set; }
        public virtual Order Order { get; set; }

        public int FoodItemId { get; set; }
        public virtual FoodItem FoodItem { get; set; }

        public int Quantity { get; set; }
    }
}
