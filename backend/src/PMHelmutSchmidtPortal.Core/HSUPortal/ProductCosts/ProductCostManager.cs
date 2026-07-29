using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.HSUPortal.Extensions;
using PMHelmutSchmidtPortal.HSUPortal.Products;
using PMHelmutSchmidtPortal.HSUPortal.Products.Details;
using PMHelmutSchmidtPortal.HSUPortal.ProductVariants;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning;

namespace PMHelmutSchmidtPortal.HSUPortal.ProductCosts;

public class ProductCostManager : HSUDomainBaseService, IProductCostManager
{
    private readonly IProductManager _productManager;
    private readonly IProductionStepCostManager _stepCostManager;
    private readonly IProductionPlanRepository _productionPlanRepository;
    private readonly IProductVariantRepository _productVariantRepository;
    private readonly ITaxesAndRoyaltiesRepository _taxesAndRoyaltiesRepository;

    public ProductCostManager(
        IProductManager productManager,
        IProductionStepCostManager stepCostManager,
        IProductionPlanRepository productionPlanRepository,
        IProductVariantRepository productVariantRepository,
        ITaxesAndRoyaltiesRepository taxesAndRoyaltiesRepository)
    {
        _productManager = productManager;
        _stepCostManager = stepCostManager;
        _productionPlanRepository = productionPlanRepository;
        _productVariantRepository = productVariantRepository;
        _taxesAndRoyaltiesRepository = taxesAndRoyaltiesRepository;
    }

    public async Task CalculateProductVariantCost(int productId)
    {
        Product product = _productManager
            .GetProduct(productId)
            .IncludeProductMeasurements()
            .IncludeWorkPiecesWithConnections()
            .IncludeNonArchivedProductionDetails()
            .Single();

        int productionDetailsLiveId = product
            .ProductionDetails
            .Single(details => details.ProductionDetailsType == ProductionDetailsType.Live).Id;

        Dictionary<ProductionStepKey, Dictionary<ProductVariantKey, StepVariantCostInformation>> productAverageStepCostByWorkPieceVariant =
            (await _stepCostManager.CalculateAverageStepCostByWorkPieceVariant(productionDetailsLiveId))
            .ToDictionary(
                c => c.stepKey,
                c => c.variantAverageCost
                    .ToDictionary(
                        v => v.productVariantKey,
                        v => v.variantAverage)
            );

        await CalculateProductVariantPrices(product, productionDetailsLiveId, productAverageStepCostByWorkPieceVariant);
    }


    private async Task CalculateProductVariantPrices(
        Product product,
        int productionDetailsId,
        IReadOnlyDictionary<ProductionStepKey, Dictionary<ProductVariantKey, StepVariantCostInformation>> productAverageStepCostByWorkPieceVariant
    )
    {
        int totalVariantsCombinations = product.WorkPieces
            .Select(workPiece => workPiece.WorkPieceVariants.Count + 1).Aggregate((x, y) => x * y);

        foreach (ProductMeasurement priceProductMeasurement in product.ProductMeasurements)
        {
            for (int i = 0; i < totalVariantsCombinations; i++)
            {
                ProductVariant productVariant = GetProductVariant(product, productionDetailsId, priceProductMeasurement, product.WorkPieces, i);

                List<ProductVariantKey> combinationKeys = productVariant
                    .ProductOptions
                    .Select(option => new ProductVariantKey(
                        productVariant.ProductMeasurementId,
                        option.WorkPieceId,
                        option.WorkPieceVariantId))
                    .ToList();

                List<ProductionPlan> productionPlans = _productionPlanRepository
                    .GetProductionPlansForVariant(productVariant)
                    .Where(plan => plan.IsActive)
                    .ToList();

                int plansCount = productionPlans.Count;

                if (plansCount == 0)
                {
                    continue;
                }

                List<(int planId, StepVariantCostInformation planCost)> plansCost = productionPlans
                    .Select(p => (p.Id, p.PlanActions
                        .Select(pa => new ProductionStepKey(pa.ProductionStep.StartStateId, pa.FinalStateId))
                        .Select(stepKey => productAverageStepCostByWorkPieceVariant[stepKey]
                            .First(pvk => combinationKeys.Contains(pvk.Key))
                            .Value)
                        .AggregateSum()))
                    .ToList();

                StepVariantCostInformation averageCostInformation = plansCost.Select(pc => pc.planCost).AggregateAverage();


                ApplyProductVariantCostInformation(productVariant, averageCostInformation);
                await ApplyProductVariantPrice(productVariant);


                List<VariantProductionPlanActionCost> actionCosts = productionPlans
                    .SelectMany(plan => plan.PlanActions
                        .Select(action =>
                        {
                            StepVariantCostInformation totalPlanCost = plansCost
                                .Single(planCost => planCost.planId == plan.Id).planCost;
                            ProductionStepKey stepKey = new ProductionStepKey(action.ProductionStep.StartStateId, action.FinalStateId);
                            StepVariantCostInformation actionCosts = productAverageStepCostByWorkPieceVariant[stepKey]
                                .First(pvk => combinationKeys.Contains(pvk.Key))
                                .Value;

                            VariantProductionPlanActionCost actionCost = productVariant.VariantActionCost?
                                .FirstOrDefault(cost => cost.PlanActionId == action.Id) ?? new VariantProductionPlanActionCost
                            {
                                PlanActionId = action.Id,
                                ProductVariantId = productVariant.Id
                            };

                            actionCost.WorkCost = actionCosts.WorkCost / totalPlanCost.WorkCost * averageCostInformation.WorkCost;
                            actionCost.AdditionalCost = actionCosts.AdditionalCost / totalPlanCost.AdditionalCost * averageCostInformation.AdditionalCost;
                            actionCost.TransportAndAssemblyCost = actionCosts.TransportAndAssemblyCost / totalPlanCost.TransportAndAssemblyCost * averageCostInformation.TransportAndAssemblyCost;
                            actionCost.MaterialCost = actionCosts.MaterialCost / totalPlanCost.MaterialCost * averageCostInformation.MaterialCost;
                            return actionCost;
                        })).ToList();

                productVariant.VariantActionCost = actionCosts;
                await _productVariantRepository.InsertOrUpdateAndGetIdAsync(productVariant);
            }
        }
    }

    private ProductVariant GetProductVariant(Product product, int productionDetailsId, ProductMeasurement priceProductMeasurement, IEnumerable<WorkPiece> workPieces, int i)
    {
        List<ProductOption> productOptions = new();

        int divisor = 1;
        foreach (WorkPiece workPiece in workPieces)
        {
            int variantsCount = workPiece.WorkPieceVariants.Count + 1;
            int workPieceIndex = (i / divisor) % variantsCount;

            productOptions.Add(
                new ProductOption
                {
                    WorkPieceId = workPiece.Id,
                    WorkPieceVariantId = workPieceIndex > 0
                        ? workPiece.WorkPieceVariants.ToArray()[workPieceIndex - 1].Id
                        : null
                });
            divisor *= variantsCount;
        }

        ProductVariant productVariant = _productVariantRepository
            .GetProductVariantsWithOptions(product.Id, priceProductMeasurement.Id, productionDetailsId)
            .Include(variant => variant.VariantActionCost)
            .AsEnumerable()
            .FirstOrDefault(pv =>
                pv.ProductOptions.All(po =>
                    productOptions.Any(pot =>
                        pot.WorkPieceId == po.WorkPieceId &&
                        pot.WorkPieceVariantId == po.WorkPieceVariantId
                    )
                )
            ) ?? new ProductVariant
        {
            ProductId = product.Id,
            ProductionDetailsId = productionDetailsId,
            ProductMeasurementId = priceProductMeasurement.Id,
            ProductOptions = productOptions
        };

        return productVariant;
    }

    private static void ApplyProductVariantCostInformation(ProductVariant variant, StepVariantCostInformation productCostInformation)
    {
        variant.WorkCost = productCostInformation.WorkCost;
        variant.AdditonalCost = productCostInformation.AdditionalCost;
        variant.TransportAndAssemblyCost = productCostInformation.TransportAndAssemblyCost;
        variant.MaterialCost = productCostInformation.MaterialCost;

        variant.Cost = productCostInformation.TotalCost();
    }

    private async Task ApplyProductVariantPrice(ProductVariant variant)
    {
        IEnumerable<TaxesAndRoyalties> taxesAndRoyalties = await _taxesAndRoyaltiesRepository
            .GetActiveTaxesAndRoyalties()
            .ToListAsync();

        variant.Tax = taxesAndRoyalties.Single(tar => tar.TaxType == TaxType.ProductTax);
        variant.DeveloperRoyalty = taxesAndRoyalties.Single(tar => tar.TaxType == TaxType.DeveloperRoyalty);
        variant.PlatformRoyalty = taxesAndRoyalties.Single(tar => tar.TaxType == TaxType.PlatformRoyalty);

        variant.Price = (variant.Cost + (variant.Cost * variant.DeveloperRoyalty.Percentage) + (variant.Cost * variant.PlatformRoyalty.Percentage)) * (1 + variant.Tax.Percentage);
    }
}