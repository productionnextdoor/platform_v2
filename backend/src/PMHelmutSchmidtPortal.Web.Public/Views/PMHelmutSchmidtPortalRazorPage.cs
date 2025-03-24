using Abp.AspNetCore.Mvc.Views;
using Abp.Runtime.Session;
using Microsoft.AspNetCore.Mvc.Razor.Internal;

namespace PMHelmutSchmidtPortal.Web.Public.Views
{
    public abstract class PMHelmutSchmidtPortalRazorPage<TModel> : AbpRazorPage<TModel>
    {
        [RazorInject]
        public IAbpSession AbpSession { get; set; }

        protected PMHelmutSchmidtPortalRazorPage()
        {
            LocalizationSourceName = PMHelmutSchmidtPortalConsts.LocalizationSourceName;
        }
    }
}
