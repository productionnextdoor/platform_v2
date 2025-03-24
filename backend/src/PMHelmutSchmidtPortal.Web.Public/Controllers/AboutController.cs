using Microsoft.AspNetCore.Mvc;
using PMHelmutSchmidtPortal.Web.Controllers;

namespace PMHelmutSchmidtPortal.Web.Public.Controllers
{
    public class AboutController : PMHelmutSchmidtPortalControllerBase
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}