using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ReadLater.BusinessLogic;
using ReadLater.BusinessLogic.Read;
using ReadLater.Models;
using System.Threading.Tasks;

namespace ReadLater.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ReadController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUserSessionService _userSessionService;
        private readonly IReadService _readService;
     
        public ReadController(UserManager<ApplicationUser> userManager, IUserSessionService userSessionService, IReadService readService)
        {
            _userManager = userManager;
            _readService = readService;
            _userSessionService = userSessionService;
        }

        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> List()
        {
            var userName = HttpContext.User.Identity.Name;
            var list = await _readService.GetReadListAsync(userName);

            return new JsonResult(list);
        }

        [HttpPost]
        [Route("token/access")]
        public IActionResult AccessToken()
        {
            var userName = HttpContext.User.Identity.Name;
            var accessToken = _userSessionService.GetAccessToken(userName);

            return new JsonResult(accessToken);
        }

        [HttpGet]
        [Route("auth")]
        public async Task<IActionResult> AuthorizeRequestToken()
        {
            var userName = HttpContext.User.Identity.Name;
            await _userSessionService.AuthorizeRequestTokenAsync(userName);

            return Redirect("/");
        }

        [HttpGet]
        [Route("account")]
        public IActionResult Account()
        {
            var userName = this.User.Identity.Name;
            var userSession = _userSessionService.GetUserSession(userName);

            var pocketAccount = new PocketAccountModel
            {
                UserName = userName,
                RequestToken = userSession?.RequestToken,
                AccessToken = userSession?.AccessToken
            };

            return new JsonResult(pocketAccount);
        }
    }
}