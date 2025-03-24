using System.Threading.Tasks;
using Abp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.DeliveryAddressStep;
using PMHelmutSchmidtPortal.HSUPortal.ShopOrders;

namespace PMHelmutSchmidtPortal.HSUPortal.Products;

public class ProductCustomerInfoManager: HSUDomainBaseService, IProductCustomerInfoManager
{
    private readonly IProductCustomerInfoRepository _productCustomerInfoRepository;
    public ProductCustomerInfoManager(
        IProductCustomerInfoRepository productCustomerInfoRepository
    )
    {
        _productCustomerInfoRepository = productCustomerInfoRepository;
    }
    public async Task<DeliveryAddressOutputDto> GetByProductId(int productId)
    {
        ProductCustomerInfo pci = await GetByProductIdOrDefault(productId);
        return ObjectMapper.Map<DeliveryAddressOutputDto>(pci);
    }

    public async Task<DeliveryAddressOutputDto> CreateOrUpdateAsync(Product product, DeliveryAddressInputDto deliveryAddressInputDto)
    {
        ProductCustomerInfo pci = await GetByProductIdOrDefault(product.Id);
        pci.CustomerInfo ??= new CustomerInfo();
        
        pci.CustomerInfo.Name = deliveryAddressInputDto.Name;
        pci.CustomerInfo.PhoneNumber = deliveryAddressInputDto.PhoneNumber;
        pci.CustomerInfo.EmailAddress = deliveryAddressInputDto.EmailAddress;
        pci.CustomerInfo.Street = deliveryAddressInputDto.Street;
        pci.CustomerInfo.Zip = deliveryAddressInputDto.Zip;
        pci.CustomerInfo.City = deliveryAddressInputDto.City;
        
        
        ProductCustomerInfo updatedPci = await _productCustomerInfoRepository.InsertOrUpdateAsync(pci);
        return ObjectMapper.Map<DeliveryAddressOutputDto>(updatedPci);
    }

    private async Task<ProductCustomerInfo> GetByProductIdOrDefault(int productId)
    {
        return await _productCustomerInfoRepository
            .GetByProductId(productId)
            .SingleOrDefaultAsync() ?? new ProductCustomerInfo{ProductId = productId, CustomerInfo = new CustomerInfo()};
    }
}