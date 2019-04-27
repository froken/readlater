using Microsoft.AspNetCore.Mvc;
using ReadLater.Services.Pocket;
using System.Threading.Tasks;

namespace ReadLater.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PocketController : ControllerBase
    {
        private readonly IPocketService _pocketService;

        public PocketController(IPocketService pocketService)
        {
            _pocketService = pocketService;
        }

        [HttpPost]
        [Route("token")]
        public async Task<IActionResult> RequestToken()
        {
            var token = await _pocketService.RequestToken();
            return new JsonResult(token);
        }
    }
}