using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Services;
using PMHelmutSchmidtPortal.HSUPortal.Orders.Dto.Details;

namespace PMHelmutSchmidtPortal.HSUPortal.ShopOrders;

public interface IOrderDetailsManager : IDomainService
{
    Task<List<OrderValueChainAdminDto>> GetOrderValueChains(int orderId);
    Task<OrderValueChainProducerDto> GetOrderCommissionedValueChain(int orderId);
    Task<CustomerInfo> GetOrderCustomerInfo(int orderId);
    Task<OrderedProductDto> GetOrderProductInfoAdmin(int orderId);
    Task<OrderedProductDto> GetOrderProductInfoProducer(int orderId, long producerId);
}