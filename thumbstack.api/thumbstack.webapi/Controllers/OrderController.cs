using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using thumbstack.webapi.Managers.Abstractions;
using thumbstack.webapi.Models.Api.Request;

namespace thumbstack.webapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderManager manager;

        public OrderController(IOrderManager orderManager)
        {
            this.manager = orderManager;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await this.manager.All());
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] AddUpdateOderApiModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(await manager.Add(model));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] AddUpdateOderApiModel model)
        {
            if (id <= 0)
                ModelState.AddModelError("", "Invalid Id");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(await manager.Update(id, model));
        }

        [HttpPost("CheckOut")]
        public async Task<IActionResult> CheckOut([FromBody] CheckOutApiModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(await manager.CheckOut(model));
        }
    }
}
