namespace PMHelmutSchmidtPortal.Url;

public interface IWebUrlServiceExtended : IWebUrlService
{
    string PlannerAddressFormatKey { get; }
    
    string ShopAddressFormatKey { get; }
    
    string GetPlannerRootAddress(string tenancyName = null);
    
    string GetShopRootAddress(string tenancyName = null);
}