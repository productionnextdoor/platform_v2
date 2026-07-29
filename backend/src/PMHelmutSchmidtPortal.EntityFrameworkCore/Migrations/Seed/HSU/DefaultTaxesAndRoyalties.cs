using PMHelmutSchmidtPortal.HSUPortal.ProductCosts;

namespace PMHelmutSchmidtPortal.Migrations.Seed.HSU;

public static class DefaultTaxesAndRoyalties
{
    public static readonly TaxesAndRoyalties DefaultTax = new TaxesAndRoyalties()
    {
        Id = 1,
        IsActive = true,
        Percentage = 0.19m,
        TaxType = TaxType.ProductTax
    };
    
    public static readonly TaxesAndRoyalties DefaultDeveloperRoyalty = new TaxesAndRoyalties()
    {
        Id = 2,
        IsActive = true,
        Percentage = 0.05m,
        TaxType = TaxType.DeveloperRoyalty
    };
    
    public static readonly TaxesAndRoyalties DefaultPlatformRoyalty = new TaxesAndRoyalties()
    {
        Id = 3,
        IsActive = true,
        Percentage = 0.1m,
        TaxType = TaxType.PlatformRoyalty
    };
}