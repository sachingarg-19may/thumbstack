using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using thumbstack.webapi.Models.Data;
using thumbstack.webapi.Repositories.Abstractions;

namespace thumbstack.webapi.Repositories.Implementations
{
    public class OrderRepository : EfCoreRepository<Order, ThumbStackContext>, IOrderRepository
    {
        public OrderRepository(ThumbStackContext context) : base(context)
        {
            
        }

        public Task<List<Order>> GetAllOrders()
        {
            return this.context.Orders
                .Include(c => c.Items)
                    .ThenInclude(c => c.FoodItem)
                .ToListAsync();
        }

        public Task<Order> GetById(int orderId)
        {
            return this.context.Orders
                .Include(c => c.Items)
                    .ThenInclude(c => c.FoodItem)
                .FirstOrDefaultAsync(c => c.Id == orderId);
        }
    }
}
