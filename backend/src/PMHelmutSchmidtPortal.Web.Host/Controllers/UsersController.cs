using Abp.AspNetCore.Mvc.Authorization;
using PMHelmutSchmidtPortal.Authorization;
using PMHelmutSchmidtPortal.Storage;
using Abp.BackgroundJobs;

namespace PMHelmutSchmidtPortal.Web.Controllers
{
    [AbpMvcAuthorize(AppPermissions.Pages_Administration_Users)]
    public class UsersController : UsersControllerBase
    {
        public UsersController(IBinaryObjectManager binaryObjectManager, IBackgroundJobManager backgroundJobManager)
            : base(binaryObjectManager, backgroundJobManager)
        {
        }
    }
}