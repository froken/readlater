using Microsoft.AspNetCore.Mvc;

namespace ReadLater.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
