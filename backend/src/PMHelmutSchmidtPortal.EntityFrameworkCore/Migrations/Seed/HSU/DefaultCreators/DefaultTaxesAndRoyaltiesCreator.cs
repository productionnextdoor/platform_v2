using System.Linq;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.EntityFrameworkCore;
using PMHelmutSchmidtPortal.HSUPortal.ProductCosts;

namespace PMHelmutSchmidtPortal.Migrations.Seed.HSU.DefaultCreators;

public class DefaultTaxesAndRoyaltiesCreator
{
    private readonly PMHelmutSchmidtPortalDbContext _context;

    public DefaultTaxesAndRoyaltiesCreator(PMHelmutSchmidtPortalDbContext context)
    {
        _context = context;
    }
    
    public void Create()
    {
        CreateTaxesAndRoyalties();
    }
    
    private void CreateTaxesAndRoyalties()
    {
        _ = _context.TaxesAndRoyalties.IgnoreQueryFilters()
            .FirstOrDefault(tar => tar.TaxType == TaxType.ProductTax && tar.IsActive) ?? _context.TaxesAndRoyalties.Add(DefaultTaxesAndRoyalties.DefaultTax).Entity;
        
        _ = _context.TaxesAndRoyalties.IgnoreQueryFilters()
            .FirstOrDefault(tar => tar.TaxType == TaxType.DeveloperRoyalty && tar.IsActive) ?? _context.TaxesAndRoyalties.Add(DefaultTaxesAndRoyalties.DefaultDeveloperRoyalty).Entity;
        
        _ = _context.TaxesAndRoyalties.IgnoreQueryFilters()
            .FirstOrDefault(tar => tar.TaxType == TaxType.PlatformRoyalty && tar.IsActive) ?? _context.TaxesAndRoyalties.Add(DefaultTaxesAndRoyalties.DefaultPlatformRoyalty).Entity;

        _context.SaveChanges();
    }
}