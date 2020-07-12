using System.Collections.Generic;
using System.Threading.Tasks;
using thumbstack.webapi.Models.Api.Request;
using thumbstack.webapi.Models.Api.Response;

namespace thumbstack.webapi.Managers.Abstractions
{
    public interface IOrderManager
    {
        Task<OrderARModel> Add(AddUpdateOderApiModel model);
        Task<OrderARModel> Update(int orderId, AddUpdateOderApiModel model);
        Task<OrderARModel> CheckOut(CheckOutApiModel model);
        Task<List<OrderARModel>> All();
    }
}
