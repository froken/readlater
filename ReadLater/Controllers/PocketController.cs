using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ReadLater.BusinessLogic;
using ReadLater.Models;
using ReadLater.Services.Pocket;
using System.Threading.Tasks;

namespace ReadLater.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PocketController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IPocketService _pocketService;
        private readonly IUserSessionService _userSessionService;

        public PocketController(UserManager<ApplicationUser> userManager, IPocketService pocketService, IUserSessionService userSessionService)
        {
            _userManager = userManager;
            _pocketService = pocketService;
            _userSessionService = userSessionService;
        }

        [HttpPost]
        [Route("token/request")]
        public async Task<IActionResult> RequestToken()
        {
            var token = await _pocketService.GetRequestTokenAsync();
            return new JsonResult(token);
        }

        [HttpPost]
        [Route("token/access")]
        public IActionResult AccessToken()
        {
            var accessToken = _userSessionService.GetAccessToken(HttpContext.User.Identity.Name);

            if (accessToken != null)
            {
                return new JsonResult(new { accessToken });
            }



            return new JsonResult(token);
        }
    }
}