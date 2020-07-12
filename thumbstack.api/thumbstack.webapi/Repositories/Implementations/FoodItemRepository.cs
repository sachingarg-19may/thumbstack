using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using thumbstack.webapi.Models.Data;
using thumbstack.webapi.Repositories.Abstractions;

namespace thumbstack.webapi.Repositories.Implementations
{
    public class FoodItemRepository : EfCoreRepository<FoodItem, ThumbStackContext>, IFoodItemRepository
    {
        public FoodItemRepository(ThumbStackContext context) : base(context)
        {

        }
    }
}
