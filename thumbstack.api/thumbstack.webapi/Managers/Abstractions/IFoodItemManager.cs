using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using thumbstack.webapi.Models.Api.Request;
using thumbstack.webapi.Models.Api.Response;

namespace thumbstack.webapi.Managers.Abstractions
{
    public interface IFoodItemManager
    {
        Task<List<FoodItemARModel>> All();
        Task Add(FoodItemApiModel model);
    }
}
