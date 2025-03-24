using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Threading;
using PMHelmutSchmidtPortal.Authorization;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.HSUPortal.Orders.Dto;
using PMHelmutSchmidtPortal.HSUPortal.ShopOrders;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning;

namespace PMHelmutSchmidtPortal.HSUPortal.Orders;

public class OrderAppService : HsuBaseAppService, IOrderAppService
{
    private readonly IOrderManager _orderManager;
    private readonly ICancellationTokenProvider _cancellationTokenProvider;

    public OrderAppService(IOrderManager orderManager, ICancellationTokenProvider cancellationTokenProvider)
    {
        _orderManager = orderManager;
        _cancellationTokenProvider = cancellationTokenProvider;
    }
  
    [AbpAuthorize(AppPermissions.Hsu_OrderManagement_Overview_Get_Admin)]
    public async Task<PagedResultDto<OrderListAdminDto>> GetOrdersAdmin(OrderInputAdminDto input)
    {
        return await CheckAndThrowIfCanceled(
            () => _orderManager.GetOrdersListAdmin(input,  _cancellationTokenProvider.Token)
        );
    }
    
    [AbpAuthorize(AppPermissions.Hsu_OrderManagement_Overview_Get_Producer)]
    public async Task<PagedResultDto<OrderListProducerDto>> GetOrdersProducer(OrderInputDto input)
    {
        User currentUser = await GetCurrentUserAsync();

        return await CheckAndThrowIfCanceled(
            () => _orderManager.GetOrdersListProducer(input, currentUser.Id, _cancellationTokenProvider.Token)
        );
    }

    [AbpAuthorize(AppPermissions.Hsu_OrderManagement_OrderDetails_Producer)]
    public async Task<ActionStatus> GetProducerOrderStatus(int orderId)
    {
        User currentUser = await GetCurrentUserAsync();
        return await _orderManager.GetProducerOrderStatus(orderId, currentUser.Id);
    }

    [AbpAuthorize(AppPermissions.Hsu_OrderManagement_CancelOrder)]
    public async Task CancelOrder(int orderId)
    {
        await _orderManager.CancelOrder(orderId);
    }
}