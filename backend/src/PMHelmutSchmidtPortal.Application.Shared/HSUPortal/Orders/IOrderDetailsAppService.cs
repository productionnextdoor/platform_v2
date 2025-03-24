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
        Task<OrderValueChainProducerDto> GetOrderCommissionedValueChainDeveloper(int productId);
        Task<OrderDetailsBaseOutput> GetProducerOrderDetails(int orderId);
        Task<List<DeliveryDocumentsDto>> GetOrderDeliveryDocuments(int productId);

        Task AcceptOrRejectActionRequest(AcceptOrRejectActionInputDto input);

        Task ReRequestProducer(ActionReRequestDto input);

        Task CommissionValueChain(int planId);
        
        Task StartFinishValueChainAction(int valueChainActionId, bool start);
    }
}