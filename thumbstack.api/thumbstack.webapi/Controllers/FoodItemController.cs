using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using thumbstack.webapi.Managers.Abstractions;
using thumbstack.webapi.Models.Api.Request;
using thumbstack.webapi.Models.Api.Response;

namespace thumbstack.webapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FoodItemController : ControllerBase
    {
        private readonly IFoodItemManager manager;

        public FoodItemController(IFoodItemManager manager)
        {
            this.manager = manager;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await this.manager.All());
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]FoodItemApiModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await manager.Add(model);
            return Ok();
        }
    }
}
