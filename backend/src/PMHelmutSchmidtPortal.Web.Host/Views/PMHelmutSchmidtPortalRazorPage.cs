using Abp.AspNetCore.Mvc.Views;

namespace PMHelmutSchmidtPortal.Web.Views
{
    public abstract class PMHelmutSchmidtPortalRazorPage<TModel> : AbpRazorPage<TModel>
    {
        protected PMHelmutSchmidtPortalRazorPage()
        {
            LocalizationSourceName = PMHelmutSchmidtPortalConsts.LocalizationSourceName;
        }
    }
}
