using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NUglify.Helpers;
using PMHelmutSchmidtPortal.HSUPortal.Extensions;
using PMHelmutSchmidtPortal.HSUPortal.ProductionSteps;
using PMHelmutSchmidtPortal.HSUPortal.Utilities;

namespace PMHelmutSchmidtPortal.HSUPortal.ProductCosts;

public class ProductionStepCostManager : HSUDomainBaseService, IProductionStepCostManager
{
    private readonly IProductionStepRepository _productionStepRepository;
    
    public ProductionStepCostManager(
        IProductionStepRepository productionStepRepository
    ) {
        _productionStepRepository = productionStepRepository;
    }
    
    public static decimal CalculateDefaultStepCost(ProductionStep step)
    {
        int defaultMeasurementId = step.ProductionDetails.Product.ProductMeasurements.First(pm => pm.IsDefault).Id;
        int materialVariantCostId = step.StepMeasurementVariants
            .First(smv => smv.ProductMeasurementId == defaultMeasurementId)
            .StepWorkPieceVariantCosts.First(swpvc => swpvc.IsStandard).Id;
        
        return CalculateMeasurementMaterialVariantCost(step, defaultMeasurementId, materialVariantCostId).TotalCost();
    }

    public async Task<IEnumerable<(ProductionStepKey stepKey, IEnumerable<(ProductVariantKey productVariantKey, StepVariantCostInformation variantAverage)> variantAverageCost)>> CalculateAverageStepCostByWorkPieceVariant(int productionDetailsId)
    {
        List<ProductionStep> productionSteps = await _productionStepRepository
            .GetAllByProductionDetailsId(productionDetailsId)
            .Include(ps => ps.ProducerInfo)
            .IncludeMeasurementsAndCosts()
            .ToListAsync();

        IEnumerable<(ProductionStepKey Step, List<ProductionStep> producerProductionSteps)> groupedProductionSteps = productionSteps
            .GroupBy(ps => new ProductionStepKey(ps.StartStateId, ps.EndStateId))
            .Select(g => (g.Key, g.ToList()));

        return groupedProductionSteps
            .Select(gps => (gps.Step, CalculateAllMeasurementMaterialVariantCostAverages(gps.producerProductionSteps)));
    }

    private static IEnumerable<(ProductVariantKey, StepVariantCostInformation VariantAverage)> CalculateAllMeasurementMaterialVariantCostAverages(IEnumerable<ProductionStep> producerSteps)
    {
        List<(ProductVariantKey productVariantKey, StepVariantCostInformation stepVariantCost)> stepCostsByProductVariantKey = new();
            
        producerSteps.ForEach(ps =>
        {
            ps.StepMeasurementVariants.ForEach(smv =>
            {
                smv.StepWorkPieceVariantCosts.ForEach(swpvc =>
                {
                    if (swpvc.CanProduce)
                    {
                        stepCostsByProductVariantKey.Add((
                            new ProductVariantKey(
                                smv.ProductMeasurementId, 
                                swpvc.WorkPieceId, 
                                swpvc.VariantId),
                            CalculateMeasurementMaterialVariantCost(ps, smv.ProductMeasurementId, swpvc.Id)));
                    }
                });
            });
        });

        return stepCostsByProductVariantKey
            .GroupBy(stepCosts => stepCosts.productVariantKey)
            .Select(productVariantCosts => (
                productVariantCosts.Key, 
                MathUtilities.CalcOutlierAdjustedAverage(productVariantCosts
                    .Select(costs => costs.stepVariantCost)
                    .ToArray())
                )
            );
    }
        
    private static StepVariantCostInformation CalculateMeasurementMaterialVariantCost(ProductionStep step, int measurementVariantId, int materialVariantCostId)
    {
        ProductionStepMeasurementVariant defaultMeasurementVariant = step.StepMeasurementVariants.First(smv => smv.ProductMeasurementId == measurementVariantId);
        ProductionStepWorkPieceVariantCost defaultMaterialCosts = defaultMeasurementVariant.StepWorkPieceVariantCosts.First(swpv => swpv.Id == materialVariantCostId);

        return new StepVariantCostInformation(
            defaultMaterialCosts.WorkCost,
            defaultMeasurementVariant.AdditionalCost,
            defaultMeasurementVariant.TransportAndAssemblyCost,
            defaultMaterialCosts.MaterialCost);
    }   

    
}