using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Authorization;
using Abp.UI;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.Authorization;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.Extensions;
using PMHelmutSchmidtPortal.HSUPortal.Extensions;
using PMHelmutSchmidtPortal.HSUPortal.ProductionSteps;
using PMHelmutSchmidtPortal.HSUPortal.Products;
using PMHelmutSchmidtPortal.HSUPortal.Products.Details;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductDetailsOverview;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductVariantStep;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ProductionSteps;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.ProductionSteps;

public class ProductionStepAppService : HsuBaseAppService, IProductionStepAppService
{
    private readonly IProductManager _productManager;
    private readonly IProductionStepManager _productionStepManager;
    private readonly IProductionDetailsManager _productionDetailsManager;

    public ProductionStepAppService(
        IProductManager productManager,
        IProductionStepManager productionStepManager,
        IProductionDetailsManager productionDetailsManager
       )
    {
        _productManager = productManager;
        _productionStepManager = productionStepManager;
        _productionDetailsManager = productionDetailsManager;
    }


    [AbpAuthorize(AppPermissions.Hsu_ValueChainPlanning_ProductionSteps_Overview_Get)]
    public async Task<IEnumerable<ProductionStepListDto>> GetProductionStepsList(ProductionStepListInputDto input)
    {
        try
        {
            IEnumerable<ProductionStep> productionSteps = await _productionStepManager.GetProductProductionSteps(input).ToListAsync();
            return ObjectMapper.Map<IEnumerable<ProductionStepListDto>>(productionSteps);
        }
        catch (Exception e)
        {
            throw e.ToUserFriendlyException(StatusCodes.Status500InternalServerError);
        }
    }

    [AbpAuthorize(AppPermissions.Hsu_ValueChainPlanning_ProductionSteps_Overview_Get)]
    public async Task<ProductionStepOverviewDto> GetProductionsStepOverview(int productionStepId)
    {
        ProductionStep productionStep = await _productionStepManager
            .GetProductionStep(productionStepId)
            .Include(ps => ps.ProductionDetails.Product.ProductMeasurements)
            .IncludeStates()
            .IncludeProducerInfo()
            .IncludeMeasurementsAndCosts().SingleAsync();

        ProductionStepOverviewDto productionStepOverview = ObjectMapper.Map<ProductionStepOverviewDto>(productionStep);

        decimal hourlyWage = productionStep.ProducerInfo.Rate;
        int defaultMeasurementId = productionStep.ProductionDetails.Product.ProductMeasurements.First(pm => pm.IsDefault).Id;
        ProductionStepMeasurementVariant defaultMeasurementVariant = productionStep.StepMeasurementVariants
            .First(smv => smv.ProductMeasurementId == defaultMeasurementId);
        ProductionStepWorkPieceVariantCost defaultMaterialCosts = defaultMeasurementVariant.StepWorkPieceVariantCosts
            .First(swpv => swpv.IsStandard);

        productionStepOverview.WorkHours = defaultMeasurementVariant.WorkHours;
        productionStepOverview.OrderProcessingTime = defaultMeasurementVariant.OrderProcessingTime;
        productionStepOverview.WorkCost = defaultMeasurementVariant.WorkHours * hourlyWage;
        productionStepOverview.MaterialAndTransportCost = defaultMeasurementVariant.AdditionalCost +
                                                          defaultMeasurementVariant.TransportAndAssemblyCost +
                                                          defaultMaterialCosts.MaterialCost;

        return productionStepOverview;
    }

    [AbpAuthorize(AppPermissions.Hsu_ValueChainPlanning_ProductionSteps_Get)]
    public async Task<ProductionStepForEditOutput> GetProductionStepForEdit(ProductionStepBaseDto input)
    {
        User currentProducer = await GetCurrentUserAsync();
        ProductionDetails productionDetails = await (await _productionDetailsManager
            .GetForUser(input.ProductionDetailsId, currentProducer))
            .SingleAsync();
        
        Product product = await GetProductWithAllAssoc(productionDetails.ProductId, currentProducer);
        ProductionStep productionStep = await _productionStepManager.GetProductionStep(input, currentProducer.Id);

        List<ProductMeasurement> positions = product.ProductMeasurements
            .Where(pm =>
                pm.Position == product.ProductMeasurements.Max(prodm => prodm.Position) ||
                pm.Position == product.ProductMeasurements.Min(prodm => prodm.Position) ||
                pm.IsDefault)
            .ToList();

        WorkPiece workPiece = product.WorkPieces.First(wp => wp.Id == productionStep.StartState.WorkPieceId);

        return new ProductionStepForEditOutput
        {
            Measurements = ObjectMapper.Map<List<MeasurementDto>>(positions),
            WorkPiece = ObjectMapper.Map<WorkPieceOverview>(workPiece),
            WorkPieceVariants = ObjectMapper.Map<List<WorkPieceVariantDto>>(workPiece.WorkPieceVariants),
            ProductionStep = ObjectMapper.Map<FullProductionStepDto>(productionStep)
        };
    }

    [AbpAuthorize(AppPermissions.Hsu_ValueChainPlanning_ProductionSteps_Set)]
    public async Task CreateOrUpdateProductionStep(ProductionStepCreateOrUpdateDto input)
    {
        User currentProducer = await GetCurrentUserAsync();
        ProductionDetails productionDetails = await (await _productionDetailsManager.GetForUser(input.ProductionDetailsId, currentProducer))
            .SingleAsync(details => details.Id == input.ProductionDetailsId);
        
        Product product = await GetProductWithAllAssoc(productionDetails.ProductId, currentProducer);
        await _productionStepManager.CreateOrUpdateProductionStep(input, product, currentProducer.Id);
    }

    [AbpAuthorize(AppPermissions.Hsu_ValueChainPlanning_ProductionSteps_Delete)]
    public async Task DeleteProductionStep(int stepId)
    {
        User currentUser = await GetCurrentUserAsync();
        ProductionStep productionStep = await _productionStepManager
            .GetProductionStep(stepId)
            .Include(step => step.ProductionDetails)
            .Include(ps => ps.ProducerInfo)
            .SingleAsync();
        
        if (productionStep.ProductionDetails.ProcessingDeadline < DateTime.Now || productionStep.ProducerInfo.UserId != currentUser.Id)
        {
            throw new UserFriendlyException("Not allowed", "You are not allowed to delete the step");
        }

        await _productionStepManager.DeleteProductionStep(productionStep);
    }

    private async Task<Product> GetProductWithAllAssoc(int productId, User producer)
    {
        Product product = await (await _productManager.GetProductForProductionSteps(productId, producer))
            .FirstOrDefaultAsync();
        _productManager.CheckProductExists(product, productId);
        return product;
    }
}