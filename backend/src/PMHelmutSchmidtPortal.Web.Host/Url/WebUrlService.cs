using Abp.Dependency;
using PMHelmutSchmidtPortal.Configuration;
using PMHelmutSchmidtPortal.Url;

namespace PMHelmutSchmidtPortal.Web.Url
{
    public class WebUrlService : WebUrlServiceBase, IWebUrlService, ITransientDependency
    {
        public WebUrlService(
            IAppConfigurationAccessor configurationAccessor) :
            base(configurationAccessor)
        {
        }

        public override string WebSiteRootAddressFormatKey => "App:ClientRootAddress";

        public override string ServerRootAddressFormatKey => "App:ServerRootAddress";
    }
}