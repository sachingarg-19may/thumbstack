using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using thumbstack.webapi.Managers.Abstractions;
using thumbstack.webapi.Models.Api.Request;
using thumbstack.webapi.Models.Api.Response;
using thumbstack.webapi.Repositories.Abstractions;

namespace thumbstack.webapi.Managers.Implementations
{
    public class FoodItemManager : IFoodItemManager
    {
        private IFoodItemRepository foodItemRepository;

        public FoodItemManager(IFoodItemRepository foodItemRepository)
        {
            this.foodItemRepository = foodItemRepository;
        }

        public async Task<List<FoodItemARModel>> All()
        {
            var foodItems = await this.foodItemRepository.GetAll();
            return foodItems.Select(c => new FoodItemARModel() { Id = c.Id, Cost = c.Cost, Name = c.Name }).ToList();
        }

        public async Task Add(FoodItemApiModel model)
        {
            await this.foodItemRepository.Add(new Models.Data.FoodItem() { Name = model.Name, Cost = model.Cost.Value });
        }
    }
}
