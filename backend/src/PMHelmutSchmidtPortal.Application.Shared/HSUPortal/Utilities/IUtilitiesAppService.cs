using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductFilesStep;

namespace PMHelmutSchmidtPortal.HSUPortal.Utilities
{
    public interface IUtilitiesAppService : IApplicationService
    {
        Task<List<ProductFileDto>> RemoveAllMissingFilesDbEntries();
        Task<List<ProductFileDto>> RemoveAllProductMissingFileDbEntries(int productId);
        Task<string> ImportNewOrdersFromShop();
        Task RefreshOrdersValueChains();
        Task ReCalculateLiveProductPrices();
        Task<string> RemoveProductsById(List<int> productIds);
    }
}