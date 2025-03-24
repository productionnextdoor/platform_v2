using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Domain.Services;
using PMHelmutSchmidtPortal.HSUPortal.Orders.Dto;
using PMHelmutSchmidtPortal.HSUPortal.ProductVariants;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning;


namespace PMHelmutSchmidtPortal.HSUPortal.ShopOrders;

public interface IOrderManager : IDomainService
{
    Task<List<ShopOrder>> ImportOrdersFromShop();
    Task<ShopOrder> CreateOrderFromOffer(ProductVariant variant, int selectedValueChainId, int ratingTypeId,CustomerInfo deliveryAddress);
    Task<PagedResultDto<OrderListAdminDto>> GetOrdersListAdmin(OrderInputAdminDto input, CancellationToken cancellationToken);
    Task<PagedResultDto<OrderListProducerDto>> GetOrdersListProducer(OrderInputDto input, long currentUserId, CancellationToken token);
    IQueryable<ShopOrder> GetOrderById(int orderId);
    Task<int> GetProductId(int orderId);
    Task<ActionStatus> GetProducerOrderStatus(int orderId, long currentUserId);
    Task CancelOrder(int orderId);
}