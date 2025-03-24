using System.Threading.Tasks;
using Abp.Domain.Services;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.DeliveryAddressStep;

namespace PMHelmutSchmidtPortal.HSUPortal.Products;

public interface IProductCustomerInfoManager: IDomainService
{
    Task<DeliveryAddressOutputDto> GetByProductId(int productId);
    Task<DeliveryAddressOutputDto> CreateOrUpdateAsync(Product product, DeliveryAddressInputDto deliveryAddressInputDto);
}