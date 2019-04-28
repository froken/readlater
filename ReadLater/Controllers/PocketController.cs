using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ReadLater.BusinessLogic;
using ReadLater.Models;
using System.Threading.Tasks;

namespace ReadLater.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PocketController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUserSessionService _userSessionService;

        public PocketController(UserManager<ApplicationUser> userManager, IUserSessionService userSessionService)
        {
            _userManager = userManager;
            _userSessionService = userSessionService;
        }

        [HttpPost]
        [Route("token/request")]
        public async Task<IActionResult> RequestToken()
        {
            var userName = HttpContext.User.Identity.Name;
            var token = await _userSessionService.GetRequestTokenAsync(userName);

            return new JsonResult(token);
        }

        [HttpPost]
        [Route("token/access")]
        public async Task<IActionResult> AccessTokenAsync()
        {
            var userName = HttpContext.User.Identity.Name;
            var accessToken = await _userSessionService.GetAccessTokenAsync(userName);

            return new JsonResult(accessToken);
        }

        [HttpGet]
        [Route("account")]
        public IActionResult Account()
        {
            var userName = HttpContext.User.Identity.Name;
            var userSession = _userSessionService.GetUserSession(userName);

            var pocketAccount = new PocketAccountModel
            {
                UserName = userName,
                RequestToken = userSession.RequestToken,
                AccessToken = userSession.AccessToken
            };

            return new JsonResult(pocketAccount);
        }
    }
}