using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Services;

namespace PMHelmutSchmidtPortal.HSUPortal.ProductCosts;

public interface IProductionStepCostManager: IDomainService
{
    Task<IEnumerable<(ProductionStepKey stepKey, IEnumerable<(ProductVariantKey productVariantKey, StepVariantCostInformation variantAverage)> variantAverageCost)>> CalculateAverageStepCostByWorkPieceVariant(int productionDetailsId);
    Task<IEnumerable<(ProductionStepKey stepKey, IEnumerable<(ProductVariantKey productVariantKey, StepVariantCostInformation variant)> variantCost)>> CalculateStepCostForValueChain(int planId);
}