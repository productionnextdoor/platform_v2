using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Services;
using PMHelmutSchmidtPortal.HSUPortal.Products.Details;
using PMHelmutSchmidtPortal.HSUPortal.ShopImportExport.Products;
using PMHelmutSchmidtPortal.HSUPortal.ShopImportExport.PropertyGroups;

namespace PMHelmutSchmidtPortal.HSUPortal.ShopImportExport;

public interface IProductApiManager: IDomainService
{
    Task ExportProductToShop(ProductForExportDto productForExportDto);
    
    Task UpdateProductInShop(ProductForExportDto productForExportDto, string productShopId);
    
    Task<List<MediaDto>> UploadImages(IEnumerable<ProductFile> images);

    Task DeleteProductChildren(List<string> productChildrenIds);
    
    Task CreateProductChildren(List<ChildDto> productChildren);

    Task<string> GetProductShopId(string productNumber);

    Task<List<string>> GetProductChildrenIds(string productShopId);
    
    Task<string> GetTaxId(string taxName);

    Task<string> GetCurrencyId(string currencyName);

    Task<string> GetCategoryId(string categoryName);

    Task<string> GetSalesChanelId(string salesChannelName);

    Task<string> CreateMediaHolderAndGetId();

    IEnumerable<ConfiguratorSettings> GetConfiguratorSettings(IEnumerable<PropertyGroupDto> propertyGroupDtos);
}