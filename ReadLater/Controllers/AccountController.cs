using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ReadLater.Models;

namespace ReadLater.ReadLater
{

    public class AccountController : Controller
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;

        public AccountController(SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [HttpPost]
        [Route("api/account")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            var applicationUser = new ApplicationUser
            {
                UserName = model.UserName,
                PasswordHash = model.Password,
                Email = model.Email,
            };

            var result = await _userManager.CreateAsync(applicationUser, model.Password);

            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest(result.Errors);
        }

        [HttpGet]
        [Route("api/account")]
        public async Task<IActionResult> Authenticate()
        {
            var result = await HttpContext.AuthenticateAsync();

            if (result.Succeeded)
            {
                return Ok(result.Principal.Identity.Name);
            }

            return Unauthorized();
        }

        [HttpPost]
        [Route("api/auth/login")]
        public async Task<IActionResult> Login([FromBody] LoginModel login)
        {
            var result = await _signInManager.PasswordSignInAsync(
                userName: login.UserName,
                password: login.Password,
                isPersistent: false,
                lockoutOnFailure: false
            );

            if (result.RequiresTwoFactor)
            {
                return StatusCode(StatusCodes.Status501NotImplemented);
            }
            if (result.IsLockedOut)
            {
                return StatusCode(StatusCodes.Status423Locked);
            }
            if (result.Succeeded)
            {
                return Ok();
            }

            return Unauthorized();
        }

        public IActionResult AccessDenied(string returnUrl = null)
        {
            return View();
        }

        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync();
            return Redirect("/");
        }
    }
}
