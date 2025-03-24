using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using PMHelmutSchmidtPortal.HSUPortal.Orders.Dto;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning;

namespace PMHelmutSchmidtPortal.HSUPortal.Orders
{
    public interface IOrderAppService: IApplicationService
    {
        Task<PagedResultDto<OrderListAdminDto>> GetOrdersAdmin(OrderInputAdminDto input);
        Task<PagedResultDto<OrderListProducerDto>> GetOrdersProducer(OrderInputDto input);
        Task<ActionStatus> GetProducerOrderStatus(int orderId);
        Task CancelOrder(int orderId);
    }
}