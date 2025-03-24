using PMHelmutSchmidtPortal.Configuration;
using PMHelmutSchmidtPortal.Url;

namespace PMHelmutSchmidtPortal.Web.Url;

public class WebUrlServiceExtended : WebUrlService, IWebUrlServiceExtended
{
    private readonly IAppConfigurationAccessor _configurationAccessor;

    public WebUrlServiceExtended(IAppConfigurationAccessor configurationAccessor) : base(configurationAccessor)
    {
        _configurationAccessor = configurationAccessor;
    }

    public string PlannerAddressFormatKey => "App:PlannerRootAddress";

    public string ShopAddressFormatKey => "App:ShopRootAddress";

    public string GetPlannerRootAddress(string tenancyName = null)
    {
        return _configurationAccessor.Configuration[PlannerAddressFormatKey] ?? "https://localhost:8000/";
    }

    public string GetShopRootAddress(string tenancyName = null)
    {
        return _configurationAccessor.Configuration[ShopAddressFormatKey] ?? "https://sw6.local/";
    }
}