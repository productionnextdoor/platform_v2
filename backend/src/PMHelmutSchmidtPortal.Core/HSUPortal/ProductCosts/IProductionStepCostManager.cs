using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Services;
using PMHelmutSchmidtPortal.HSUPortal.ProductionSteps;

namespace PMHelmutSchmidtPortal.HSUPortal.ProductCosts;

public interface IProductionStepCostManager: IDomainService
{
    Task<IEnumerable<(ProductionStepKey stepKey, IEnumerable<(ProductVariantKey productVariantKey, StepVariantCostInformation variantAverage)> variantAverageCost)>> CalculateAverageStepCostByWorkPieceVariant(int productionDetailsId);
}