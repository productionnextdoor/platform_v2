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

    public void Create(bool isOffer = false)
    {
        CreateTaxesAndRoyalties(isOffer);
    }

    private void CreateTaxesAndRoyalties(bool isOffer)
    {
        GetOrCreateTax(DefaultTaxesAndRoyalties.DefaultTax, !isOffer);
        GetOrCreateTax(DefaultTaxesAndRoyalties.DefaultDeveloperRoyalty, !isOffer);
        GetOrCreateTax(DefaultTaxesAndRoyalties.DefaultPlatformRoyalty, true);
        GetOrCreateTax(DefaultTaxesAndRoyalties.NoTax, isOffer);
        GetOrCreateTax(DefaultTaxesAndRoyalties.NoDeveloperRoyalty, isOffer);

        _context.SaveChanges();
    }

    private void GetOrCreateTax(TaxesAndRoyalties taxOrRoyalty, bool isActive = false)
    {
        TaxesAndRoyalties tax = _context.TaxesAndRoyalties.IgnoreQueryFilters()
            .FirstOrDefault(tar => tar.TaxType == taxOrRoyalty.TaxType && tar.Percentage == taxOrRoyalty.Percentage);

        if (tax == null)
        {
            tax = new TaxesAndRoyalties
            {
                TaxType = taxOrRoyalty.TaxType,
                Percentage = taxOrRoyalty.Percentage,
                IsActive = isActive
            };

            _context.TaxesAndRoyalties.Add(tax);
        }
        else if (tax.IsActive != isActive)
        {
            tax.IsActive = isActive;
        }
    }
}