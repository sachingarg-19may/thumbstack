using Microsoft.Extensions.DependencyInjection;
using thumbstack.webapi.Managers.Abstractions;
using thumbstack.webapi.Managers.Implementations;

namespace thumbstack.webapi.Managers
{
    public class ManagerDIConfig
    {
        public static void Register(IServiceCollection services)
        {
            services.AddScoped<IOrderManager, OrderManager>();
            services.AddScoped<IFoodItemManager, FoodItemManager>();
        }
    }
}
