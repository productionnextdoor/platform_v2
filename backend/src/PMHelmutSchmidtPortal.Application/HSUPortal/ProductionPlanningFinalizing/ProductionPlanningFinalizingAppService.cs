using System;
using System.Linq;
using System.Threading.Tasks;
using Abp.Authorization;
using Abp.UI;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.Authorization;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.Extensions;
using PMHelmutSchmidtPortal.HSUPortal.ProductCosts;
using PMHelmutSchmidtPortal.HSUPortal.Products;
using PMHelmutSchmidtPortal.HSUPortal.ProductVariants;
using PMHelmutSchmidtPortal.HSUPortal.ShopImportExport;
using PMHelmutSchmidtPortal.HSUPortal.ShopOrders;
using PMHelmutSchmidtPortal.HSUPortal.Utilities;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning;

namespace PMHelmutSchmidtPortal.HSUPortal.ProductionPlanningFinalizing;

public class ProductionPlanningFinalizingAppService : HsuBaseAppService, IProductionPlanningFinalizingAppService
{
    private readonly IProductCostManager _productCostManager;
    private readonly IProductExportManager _productExportManager;
    private readonly IProductionDetailsManager _productionDetailsManager;
    private readonly IProductionPlanRepository _productionPlanRepository;
    private readonly IOrderManager _orderManager;
    private readonly IProductCustomerInfoRepository _productCustomerInfoRepository;
    private readonly CustomConfigService _configService;

    public ProductionPlanningFinalizingAppService(
        IProductCostManager productCostManager,
        IProductExportManager productExportManager,
        IProductionDetailsManager productionDetailsManager,
        IProductionPlanRepository productionPlanRepository,
        IOrderManager orderManager,
        IProductCustomerInfoRepository productCustomerInfoRepository,
        CustomConfigService configService)
    {
        _productCostManager = productCostManager;
        _productExportManager = productExportManager;
        _productionDetailsManager = productionDetailsManager;
        _productionPlanRepository = productionPlanRepository;
        _orderManager = orderManager;
        _productCustomerInfoRepository = productCustomerInfoRepository;
        _configService = configService;
    }

    [AbpAuthorize(AppPermissions.Hsu_ValueChainPlanning_ExportProductToShop)]
    public async Task FinalizeProductPlanning(int productId)
    {
        Product product = await GetProductAndValidateActivePlans(productId);
        if (_configService.IsOffer())
        {
            product.State = ProductState.ProductionPlanningFinalized;
            await CurrentUnitOfWork.SaveChangesAsync();
            return;
        }

        await ExportProductToShop(productId);
    }

    [AbpAuthorize(AppPermissions.Hsu_ValueChainPlanning_ProductionPlans_SelectForPorduction)]
    public async Task SelectPlanForProduction(int planId)
    {
        User currentUser = await GetCurrentUserAsync();

        ProductionPlan selectedValueChain = await _productionPlanRepository
            .GetAll()
            .Include(pp => pp.ProductionDetails.Product.AssignedDeveloper)
            .Include(pp => pp.ProductionDetails.Product.ProductMeasurements)
            .Include(pp => pp.PlanRatings)
            .SingleAsync(p => p.Id == planId);

        if (selectedValueChain == null)
        {
            throw new UserFriendlyException(L("PlanNotFound"));
        }

        Product product = selectedValueChain.ProductionDetails.Product;
        ProductCustomerInfo productCustomerInfo = _productCustomerInfoRepository.GetByProductId(product.Id).Single();

        if (product.State != ProductState.ProductionPlanningFinalized || product.AssignedDeveloper != currentUser)
        {
            throw new UserFriendlyException(L("Error.OfferBasedOrder.ValueChainForProduction.CanNotSelectValueChain"));
        }

        int defaultMeasurementId = product.ProductMeasurements.Where(pm => pm.IsDefault).Select(pm => pm.Id).Single();

        //Since variants currently disabled for MVP we only need the default variant
        ProductVariant variant = (await _productCostManager.GetProductVariantsForSinglePlan(product.Id, selectedValueChain.Id))
            .Single(pp => pp.ProductMeasurementId == defaultMeasurementId && pp.ProductOptions.All(po => po.WorkPieceVariantId == null));

        int ratingTypeId = selectedValueChain.PlanRatings.OrderByDescending(pr => pr.Rating).First().RatingTypeId;
        await _orderManager.CreateOrderFromOffer(variant, selectedValueChain.Id, ratingTypeId, productCustomerInfo.CustomerInfo);
        product.State = ProductState.ValueChainWaitingAdminConfirmation;
    }


    private async Task ExportProductToShop(int productId)
    {
        await _productCostManager.CalculateAndSaveProductVariantsCost(productId);
        await CurrentUnitOfWork.SaveChangesAsync();

        try
        {
            await _productExportManager.ExportProductToShop(productId);
        }
        catch (Exception e)
        {
            throw e.ToUserFriendlyException(StatusCodes.Status500InternalServerError);
        }
    }

    private async Task<Product> GetProductAndValidateActivePlans(int productId)
    {
        ProductionDetails productDetails = await _productionDetailsManager
            .GetActiveForProduct(productId)
            .Include(pd => pd.Product)
            .Include(pd => pd.ProductionPlans.Where(pp => pp.IsActive))
            .FirstOrDefaultAsync();
        if (productDetails == null)
        {
            throw new UserFriendlyException(L("Error.Product.ProductNotFound.Text", productId));
        }

        if (productDetails.ProductionPlans.Count == 0)
        {
            throw new UserFriendlyException("Error.ValueChainPlanning.NonSelected");
        }

        return productDetails.Product;
    }
}