using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thumbstack.webapi.Models.Data
{
    public class Order : BaseEntity
    {
        public string CustomerName { get; set; }
        public virtual List<OrderItem> Items { get; set; }
        public string Status { get; set; }

        public double TotalAmount { get; set; }
        public double TipPercentage { get; set; }
    }
}
