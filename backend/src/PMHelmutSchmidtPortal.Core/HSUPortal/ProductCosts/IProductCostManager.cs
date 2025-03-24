using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Services;
using PMHelmutSchmidtPortal.HSUPortal.ProductVariants;

namespace PMHelmutSchmidtPortal.HSUPortal.ProductCosts;

public interface IProductCostManager: IDomainService
{
    Task CalculateAndSaveProductVariantsCost(int productId);

    Task<List<ProductVariant>> GetProductVariantsForSinglePlan(int productId, int planId);
}