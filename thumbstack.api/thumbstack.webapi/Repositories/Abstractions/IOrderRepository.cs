using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using thumbstack.webapi.Models.Data;

namespace thumbstack.webapi.Repositories.Abstractions
{
    public interface IOrderRepository : IRepository<Order>
    {
        Task<List<Order>> GetAllOrders();
        Task<Order> GetById(int orderId);
    }
}
