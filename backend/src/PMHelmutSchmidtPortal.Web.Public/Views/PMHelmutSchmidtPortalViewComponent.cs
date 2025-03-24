using Abp.AspNetCore.Mvc.ViewComponents;

namespace PMHelmutSchmidtPortal.Web.Public.Views
{
    public abstract class PMHelmutSchmidtPortalViewComponent : AbpViewComponent
    {
        protected PMHelmutSchmidtPortalViewComponent()
        {
            LocalizationSourceName = PMHelmutSchmidtPortalConsts.LocalizationSourceName;
        }
    }
}