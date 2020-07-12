using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thumbstack.webapi.Models.Api.Response
{
    public class OrderARModel
    {
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public List<OrderItemARModel> Items { get; set; }
        public string Status { get; set; }

        public double FoodTotal
        {
            get
            {
                return Math.Round(this.Items.Sum(c => c.Cost * c.Quantity), 2);
            }
        }

        public double TipAmount
        {
            get
            {
                return this.TipPercentage > 0 ? Math.Round((this.TipPercentage / 100) * this.FoodTotal, 2) : 0;
            }
        }

        public double TotalAmount { get; set; }
        public double TipPercentage { get; set; }
    }

    public class OrderItemARModel
    {
        public int FoodItemId { get; set; }

        public string Name { get; set; }
        public double Cost { get; set; }

        public int Quantity { get; set; }
    }
}
