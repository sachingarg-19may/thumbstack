using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thumbstack.webapi.Models.Data
{
    public class FoodItem : BaseEntity
    {
        public string Name { get; set; }
        public double Cost { get; set; }
    }
}
