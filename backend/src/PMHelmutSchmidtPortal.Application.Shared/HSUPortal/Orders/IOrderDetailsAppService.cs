using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using PMHelmutSchmidtPortal.HSUPortal.Orders.Dto.Details;

namespace PMHelmutSchmidtPortal.HSUPortal.Orders
{
    public interface IOrderDetailsAppService: IApplicationService
    {
        Task<AdminOrderDetailsOutput> GetOrderDetailsForAdmin(int orderId);

        Task<List<OrderProducerRequestOutput>> GetOrderProducerRequests(int orderId);

        Task<OrderValueChainProducerDto> GetOrderCommissionedValueChainProducer(int orderId);

        Task<OrderDetailsBaseOutput> GetProducerOrderDetails(int orderId);

        Task AcceptOrRejectActionRequest(AcceptOrRejectActionInputDto input);

        Task ReRequestProducer(ActionReRequestDto input);

        Task StartFinishValueChainAction(int valueChainActionId, bool start);
    }
}