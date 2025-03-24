using PMHelmutSchmidtPortal.HSUPortal.ProductCosts;

namespace PMHelmutSchmidtPortal.Migrations.Seed.HSU;

public static class DefaultTaxesAndRoyalties
{
    public static readonly TaxesAndRoyalties DefaultTax = new()
    {
        Percentage = 0.19m,
        TaxType = TaxType.ProductTax
    };
    
    public static readonly TaxesAndRoyalties DefaultDeveloperRoyalty = new()
    {
        Percentage = 0.05m,
        TaxType = TaxType.DeveloperRoyalty
    };
    
    public static readonly TaxesAndRoyalties DefaultPlatformRoyalty = new()
    {
        Percentage = 0.1m,
        TaxType = TaxType.PlatformRoyalty
    };
    
    public static readonly TaxesAndRoyalties NoTax = new()
    {
        Percentage = 0,
        TaxType = TaxType.ProductTax
    };
    
    public static readonly TaxesAndRoyalties NoDeveloperRoyalty = new()
    {
        Percentage = 0,
        TaxType = TaxType.DeveloperRoyalty
    };
    
    
}