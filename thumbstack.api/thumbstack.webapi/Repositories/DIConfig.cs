using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using thumbstack.webapi.Models.Data;
using thumbstack.webapi.Repositories.Abstractions;
using thumbstack.webapi.Repositories.Implementations;

namespace thumbstack.webapi.Repositories
{
    public static class RepositoryDIConfig
    {
        public static void Register(IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ThumbStackContext>(options => options.UseSqlServer(configuration.GetConnectionString("ThumbStackContext")));

            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<IFoodItemRepository, FoodItemRepository>();
        }
    }
}
