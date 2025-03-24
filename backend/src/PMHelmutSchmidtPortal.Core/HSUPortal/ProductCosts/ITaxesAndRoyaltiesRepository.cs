using System.Linq;
using System.Threading.Tasks;
using Abp.Domain.Repositories;

namespace PMHelmutSchmidtPortal.HSUPortal.ProductCosts;

public interface ITaxesAndRoyaltiesRepository: IRepository<TaxesAndRoyalties, int>
{
    Task<TaxesAndRoyalties> GetDeveloperRoyaltyRate();
    Task<TaxesAndRoyalties> GetPlatformRoyaltyRate();
    Task<TaxesAndRoyalties> GetProductTaxRate();
    IQueryable<TaxesAndRoyalties> GetActiveTaxesAndRoyalties();
}