using Abp.AspNetCore.Mvc.Authorization;
using PMHelmutSchmidtPortal.Authorization.Users.Profile;
using PMHelmutSchmidtPortal.Graphics;
using PMHelmutSchmidtPortal.Storage;

namespace PMHelmutSchmidtPortal.Web.Controllers
{
    [AbpMvcAuthorize]
    public class ProfileController : ProfileControllerBase
    {
        public ProfileController(
            ITempFileCacheManager tempFileCacheManager,
            IProfileAppService profileAppService,
            IImageValidator imageValidator) :
            base(tempFileCacheManager, profileAppService, imageValidator)
        {
        }
    }
}