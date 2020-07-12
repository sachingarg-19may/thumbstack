using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thumbstack.webapi.Models.Data
{
    public class ThumbStackContext : DbContext
    {
        public ThumbStackContext(DbContextOptions<ThumbStackContext> options) : base(options)
        {

        }
        public DbSet<FoodItem> FoodItems { get; set; }
        public DbSet<Order> Orders { get; set; }
    }
}
