using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Authorization;
using Abp.UI;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.Authorization;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.HSUPortal.ProductCosts;
using PMHelmutSchmidtPortal.HSUPortal.ProductionSteps;
using PMHelmutSchmidtPortal.HSUPortal.Products;
using PMHelmutSchmidtPortal.HSUPortal.Products.Details;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductFilesStep;
using PMHelmutSchmidtPortal.HSUPortal.ShopOrders;

namespace PMHelmutSchmidtPortal.HSUPortal.Utilities;

public class UtilitiesAppService : HsuBaseAppService, IUtilitiesAppService
{
    private readonly IProductRepository _productRepository;
    private readonly IProductFileManager _productFileManager;
    private readonly IOrderManager _orderManager;
    private readonly IOrderProductionManager _productionManager;
    private readonly IProductCostManager _costManager;
    private readonly IProductionStepManager _stepManager;
    private readonly IProductDeleteManager _productDeleteManager;

    public UtilitiesAppService(
        IProductRepository productRepository,
        IProductFileManager productFileManager,
        IOrderManager orderManager,
        IOrderProductionManager productionManager,
        IProductCostManager costManager,
        IProductionStepManager stepManager,
        IProductDeleteManager productDeleteManager)
    {
        _productRepository = productRepository;
        _productFileManager = productFileManager;
        _orderManager = orderManager;
        _productionManager = productionManager;
        _costManager = costManager;
        _stepManager = stepManager;
        _productDeleteManager = productDeleteManager;
    }

    [AbpAuthorize(AppPermissions.Hsu_Utilities_RemoveNonExistingFileEntries)]
    public async Task<List<ProductFileDto>> RemoveAllMissingFilesDbEntries()
    {
        return ObjectMapper.Map<List<ProductFileDto>>(await _productFileManager.RemoveNonExistentFilesEntries());
    }

    [AbpAuthorize(AppPermissions.Hsu_Utilities_RemoveNonExistingFileEntries)]
    public async Task<List<ProductFileDto>> RemoveAllProductMissingFileDbEntries(int productId)
    {
        return ObjectMapper.Map<List<ProductFileDto>>(await _productFileManager.RemoveNonExistentFilesEntries(productId));
    }
    
    [AbpAuthorize(AppPermissions.Hsu_Utilities_RecalculateInBetweenStepMeasurement)]
    public async Task RecalculateInBetweenStepMeasurement()
    {
        User currentUser = await GetCurrentUserAsync();

        await _stepManager.RecalculateStepsData(currentUser);
    }
    

    [AbpAuthorize(AppPermissions.Hsu_Utilities_ImportNewOrdersFromShop)]
    public async Task<string> ImportNewOrdersFromShop()
    {
        List<ShopOrder> orders = await _orderManager.ImportOrdersFromShop();

        return $"{orders.Count} orders imported";
    }

    [AbpAuthorize(AppPermissions.Hsu_Utilities_CheckOrdersForExpierdValueChains)]
    public async Task RefreshOrdersValueChains()
    {
        await _productionManager.CheckOrdersForTimeoutAndSelectNextValueChain();
    }
    
    [AbpAuthorize(AppPermissions.Hsu_Utilities_ReCalculateLiveProductPrices)]
    public async Task ReCalculateLiveProductPrices()
    {
       List<int> productIds = await _productRepository
            .GetAll()
            .Where(product => product.State == ProductState.Live)
            .Select(product => product.Id)
            .ToListAsync();
       foreach (int productId in productIds)
       {
           await _costManager.CalculateProductVariantCost(productId);
       }
       
    }
    
    [AbpAuthorize(AppPermissions.Hsu_Utilities_RemoveProductsById)]
    public async Task<string> RemoveProductsById(List<int> productIds)
    {
        try
        {
            List<int> deleteProducts = await _productDeleteManager.DeleteProductsById(productIds);
            
            return $"Products removed: {String.Join(",", deleteProducts)}";
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw new UserFriendlyException(e.Message);
        }
        
    }
}