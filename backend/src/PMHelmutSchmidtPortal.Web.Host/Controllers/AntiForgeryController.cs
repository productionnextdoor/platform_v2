using Microsoft.AspNetCore.Antiforgery;

namespace PMHelmutSchmidtPortal.Web.Controllers
{
    public class AntiForgeryController : PMHelmutSchmidtPortalControllerBase
    {
        private readonly IAntiforgery _antiforgery;

        public AntiForgeryController(IAntiforgery antiforgery)
        {
            _antiforgery = antiforgery;
        }

        public void GetToken()
        {
            _antiforgery.SetCookieTokenAndHeader(HttpContext);
        }
    }
}
