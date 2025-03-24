using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.EntityFrameworkCore;
using PMHelmutSchmidtPortal.EntityFrameworkCore.Repositories;
using PMHelmutSchmidtPortal.HSUPortal.ProductCosts;

namespace PMHelmutSchmidtPortal.HSUPortal.ProductCost;

public class TaxesAndRoyaltiesRepository: PmHelmutSchmidtPortalRepositoryBase<TaxesAndRoyalties, int>,ITaxesAndRoyaltiesRepository
{
    public TaxesAndRoyaltiesRepository(IDbContextProvider<PMHelmutSchmidtPortalDbContext> dbContextProvider) 
        : base(dbContextProvider)
    {
    }

    public Task<TaxesAndRoyalties> GetDeveloperRoyaltyRate()
    {
        return GetAll()
            .SingleAsync(tar => tar.TaxType == TaxType.DeveloperRoyalty && tar.IsActive);
    }
    
    public Task<TaxesAndRoyalties> GetPlatformRoyaltyRate()
    {
        return GetAll()
            .SingleAsync(tar => tar.TaxType == TaxType.PlatformRoyalty && tar.IsActive);
    }
    
    public Task<TaxesAndRoyalties> GetProductTaxRate()
    {
        return GetAll()
            .SingleAsync(tar => tar.TaxType == TaxType.ProductTax && tar.IsActive);
    }
    
    public IQueryable<TaxesAndRoyalties> GetActiveTaxesAndRoyalties()
    {
        return GetAll()
            .Where(tar => tar.IsActive);
    }
}