using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using thumbstack.webapi.Managers.Abstractions;
using thumbstack.webapi.Models.Api.Request;
using thumbstack.webapi.Models.Api.Response;
using thumbstack.webapi.Models.Data;
using thumbstack.webapi.Repositories.Abstractions;

namespace thumbstack.webapi.Managers.Implementations
{
    public class OrderManager : IOrderManager
    {
        private readonly IOrderRepository orderRepository;

        public OrderManager(IOrderRepository orderRepository)
        {
            this.orderRepository = orderRepository;
        }

        public async Task<OrderARModel> Add(AddUpdateOderApiModel model)
        {
            var order = new Models.Data.Order()
            {
                CustomerName = model.CustomerName,
                Status = "On-going",
                Items = model.Items.Where(c => c.Quantity > 0).Select(c => new Models.Data.OrderItem()
                { FoodItemId = c.FoodItemId.Value, Quantity = c.Quantity.Value, IsActive = true, IsDeleted = false }).ToList()
            };
            await this.orderRepository.Add(order);

            order = await this.orderRepository.GetById(order.Id);
            return ContructOrderReponseModel(order);
        }

        public async Task<OrderARModel> Update(int orderId, AddUpdateOderApiModel model)
        {
            var order = await this.orderRepository.GetById(orderId);
            if (order != null && !order.Status.Equals("Completed"))
            {
                order.CustomerName = model.CustomerName;
                foreach (var item in model.Items)
                {
                    var foodExists = order.Items.FirstOrDefault(c => c.FoodItemId == item.FoodItemId);
                    if (foodExists != null)
                    {
                        if (item.Quantity <= 0)
                        {
                            foodExists.IsActive = false;
                            foodExists.IsDeleted = true;
                            foodExists.Quantity = 0;
                        }
                        else
                        {
                            foodExists.IsActive = true;
                            foodExists.IsDeleted = false;
                            foodExists.Quantity = item.Quantity.Value;
                        }
                    }
                    else
                    {
                        order.Items.Add(new Models.Data.OrderItem() { FoodItemId = item.FoodItemId.Value, Quantity = item.Quantity.Value, IsActive = true, IsDeleted = false });
                    }
                }

                foreach (var item in order.Items)
                {
                    var foodExists = model.Items.FirstOrDefault(c => c.FoodItemId == item.FoodItemId);
                    if (foodExists == null)
                    {
                        item.IsActive = false;
                        item.IsDeleted = true;
                        item.Quantity = 0;
                    }
                }

                await this.orderRepository.Update(order);
            }

            order = await this.orderRepository.GetById(orderId);
            return ContructOrderReponseModel(order);
        }

        public async Task<OrderARModel> CheckOut(CheckOutApiModel model)
        {
            var order = await this.orderRepository.GetById(model.OrderId.Value);
            if (order != null && order.Status.Equals("On-going"))
            {
                order.Status = "Completed";
                order.TipPercentage = model.TipPercentage.Value;
                var foodTotal = Math.Round(order.Items.Where(c => !c.IsDeleted).Sum(c => c.FoodItem.Cost * c.Quantity), 2);
                var tipAmount = model.TipPercentage.Value > 0 ? Math.Round((model.TipPercentage.Value / 100) * foodTotal, 2) : 0;
                order.TotalAmount = Math.Round(foodTotal + tipAmount, 2);
                await this.orderRepository.Update(order);
            }

            return ContructOrderReponseModel(order);
        }

        public async Task<List<OrderARModel>> All()
        {
            var orders = await this.orderRepository.GetAllOrders();
            return orders.Select(c => ContructOrderReponseModel(c)).ToList();
        }

        private static OrderARModel ContructOrderReponseModel(Order order)
        {
            if (order == null)
            {
                return null;
            }

            return new OrderARModel()
            {
                Id = order.Id,
                CustomerName = order.CustomerName,
                Status = order.Status,
                TipPercentage = order.TipPercentage,
                TotalAmount = order.TotalAmount,
                Items = order.Items.Where(e => !e.IsDeleted).Select(d => new OrderItemARModel()
                {
                    FoodItemId = d.FoodItemId,
                    Name = d.FoodItem.Name,
                    Cost = d.FoodItem.Cost,
                    Quantity = d.Quantity
                }).ToList()
            };
        }
    }
}
