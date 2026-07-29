using System;
using System.Threading.Tasks;
using Abp.Authorization;
using Microsoft.AspNetCore.Http;
using PMHelmutSchmidtPortal.Authorization;
using PMHelmutSchmidtPortal.Extensions;
using PMHelmutSchmidtPortal.HSUPortal.ProductCosts;

namespace PMHelmutSchmidtPortal.HSUPortal.ShopImportExport;

public class ProductExportAppService : HsuBaseAppService, IProductExportAppService
{
 
    private readonly IProductCostManager _productCostManager;
    private readonly IProductExportManager _productExportManager;

    public ProductExportAppService(IProductCostManager productCostManager, IProductExportManager productExportManager)
    {
        _productCostManager = productCostManager;
        _productExportManager = productExportManager;
    }

    [AbpAuthorize(AppPermissions.Hsu_ValueChainPlanning_ExportProductToShop)]
    public async Task ExportProductToShop(int productId)
    {
        await _productCostManager.CalculateProductVariantCost(productId);
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
   
}