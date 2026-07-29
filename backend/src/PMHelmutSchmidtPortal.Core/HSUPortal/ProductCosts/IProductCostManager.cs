using System.Threading.Tasks;
using Abp.Domain.Services;

namespace PMHelmutSchmidtPortal.HSUPortal.ProductCosts;

public interface IProductCostManager: IDomainService
{
    Task CalculateProductVariantCost(int productId);
}