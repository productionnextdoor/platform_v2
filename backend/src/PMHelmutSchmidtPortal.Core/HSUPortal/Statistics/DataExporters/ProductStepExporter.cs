using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Abp.Linq.Extensions;
using Abp.UI;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.HSUPortal.ProductionSteps;
using PMHelmutSchmidtPortal.HSUPortal.Products;
using PMHelmutSchmidtPortal.HSUPortal.Statistics.Dto;

namespace PMHelmutSchmidtPortal.HSUPortal.Statistics.DataExporters;

public class ProductStepExporter : AbstractStatisticsExporter
{
    private readonly IProductionStepRepository _productionStepRepository;
    protected override string LocalisationPrefix => "Statistics.ProductStep";

    public ProductStepExporter(IProductionStepRepository productionStepRepository
    )
    {
        _productionStepRepository = productionStepRepository;
    }

    public override async Task<List<Dictionary<string, object>>> GetData(StatisticsInputDto filter)
    {
        bool filterProduct = int.TryParse(filter.FilterVar, out int productNumber);

        List<ProductionStep> productionSteps = await _productionStepRepository
            .GetAll()
            .Where(ps => ps.ProductionDetails.ProductionDetailsType == ProductionDetailsType.Live)
            .WhereIf(filterProduct, ps => ps.ProductionDetails.Product.ProductNumber == productNumber)
            .WhereIf(filter.DateFrom.HasValue, ps => ps.ProductionDetails.Product.CreationTime >= filter.DateFrom.Value)
            .WhereIf(filter.DateTo.HasValue, ps => ps.ProductionDetails.Product.CreationTime <= filter.DateTo.Value)
            .Include(ps => ps.ProductionDetails.Product)
            .Include(ps => ps.ProducerInfo.User.UserAddress)
            .Include(ps => ps.StartState)
            .Include(ps => ps.EndState)
            .Include(ps => ps.StepMeasurementVariants)
            .ThenInclude(smv => smv.ProductMeasurement)
            .Include(ps => ps.StepMeasurementVariants)
            .ThenInclude(smv => smv.StepWorkPieceVariantCosts)
            .ThenInclude(swpvc => swpvc.Variant)
            .OrderBy(ps => ps.ProductionDetails.Product.Name)
            .ToListAsync();

        List<Dictionary<string, object>> items = new();

        int maxMaterials = productionSteps
            .Select(ps => ps.StepMeasurementVariants.First().StepWorkPieceVariantCosts.Count).Max();

        foreach (ProductionStep step in productionSteps)
        {
            Dictionary<string, object> item = new()
            {
                { L($"{LocalisationPrefix}.ProductName"), step.ProductionDetails.Product.Name },
                { L($"{LocalisationPrefix}.ProductNumber"), step.ProductionDetails.Product.ProductNumber },
                { L($"{LocalisationPrefix}.StartStateType"), L($"{LocalisationPrefix}.StateType.{step.StartState.StateType.ToString()}") },
                { L($"{LocalisationPrefix}.StartStateName"), step.StartState.Description },
                { L($"{LocalisationPrefix}.FinalStateType"), L($"{LocalisationPrefix}.StateType.{step.EndState.StateType.ToString()}") },
                { L($"{LocalisationPrefix}.FinalStateName"), step.EndState.Description },
                { L($"{LocalisationPrefix}.ProducerName"), step.ProducerInfo.User.UserAddress.Name },
                { L($"{LocalisationPrefix}.CostPerHour"), step.ProducerInfo.Rate }
            };
            ProductionStepMeasurementVariant standard = step.StepMeasurementVariants
                .First(smv => smv.ProductMeasurement.IsDefault);
            SetMeasurementsData(item, standard, maxMaterials, step.ProducerInfo.Rate, step.StartState.Description);

            ProductionStepMeasurementVariant min = step.StepMeasurementVariants
                .OrderBy(smv => smv.ProductMeasurement.Position)
                .First();
            SetMeasurementsData(item, min, maxMaterials, step.ProducerInfo.Rate, step.StartState.Description, "Min");


            ProductionStepMeasurementVariant max = step.StepMeasurementVariants
                .OrderByDescending(smv => smv.ProductMeasurement.Position)
                .First();
            SetMeasurementsData(item, max, maxMaterials, step.ProducerInfo.Rate, step.StartState.Description, "Max");

            items.Add(item);
        }

        if (items.Count == 0)
        {
            throw new UserFriendlyException(L("Error.Statistics.NoData"));
        }

        return items;
    }

    private void SetMeasurementsData(
        Dictionary<string, object> item,
        ProductionStepMeasurementVariant measurementVariant,
        int maxMaterials,
        decimal producersRate,
        string standardDescription,
        string positionPrefix = "Standard")
    {
        item.Add(L($"{LocalisationPrefix}.StepProcessingInWeeks") + $" ({positionPrefix})", measurementVariant.OrderProcessingTime);
        item.Add(L($"{LocalisationPrefix}.PreProcessedInWeeks") + $" ({positionPrefix})", measurementVariant.SupplyOtherCraftsInWeeks);
        item.Add(L($"{LocalisationPrefix}.WorkingTimeHours") + $" ({positionPrefix})", measurementVariant.WorkHours);
        item.Add(L($"{LocalisationPrefix}.TransportAndAssemblyCost") + $" ({positionPrefix})", measurementVariant.TransportAndAssemblyCost);
        item.Add(L($"{LocalisationPrefix}.AdditionalMaterialsCost") + $" ({positionPrefix})", measurementVariant.AdditionalCost);

        decimal totalLabourCost = (measurementVariant.WorkHours * producersRate) +
                                  measurementVariant.TransportAndAssemblyCost +
                                  measurementVariant.AdditionalCost;

        ProductionStepWorkPieceVariantCost[] variants = measurementVariant.StepWorkPieceVariantCosts.ToArray();

        for (int i = 0; i < maxMaterials; i++)
        {
            string description = "";
            string cost = "";
            string totalCost = "";

            if (variants.Length > i)
            {
                description = variants[i].IsStandard ? standardDescription : variants[i].Variant.Description;
                cost = variants[i].MaterialCost.ToString(CultureInfo.CurrentCulture);
                totalCost = (variants[i].MaterialCost + totalLabourCost).ToString(CultureInfo.CurrentCulture);
            }

            item.Add(L($"{LocalisationPrefix}.MaterialName") + $" ({positionPrefix})" + " " + (i + 1), description);
            item.Add(L($"{LocalisationPrefix}.MaterialCost") + $" ({positionPrefix})" + " " + (i + 1), cost);
            item.Add(L($"{LocalisationPrefix}.TotalVariantCost") + $" ({positionPrefix})" + " " + (i + 1), totalCost);
        }
    }
}