using System.Threading.Tasks;
using Abp.Domain.Services;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.HSUPortal.Orders.Dto.Details;

namespace PMHelmutSchmidtPortal.HSUPortal.ShopOrders;

public interface IOrderProductionManager: IDomainService
{
    Task CheckOrdersForTimeoutAndSelectNextValueChain();
    Task SelectValueChainForOrder(int orderId);
    Task AcceptOrRejectProductionAction(AcceptOrRejectActionInputDto input, long producerId);
    Task StartProductionAction(int valueChainActionId, long currentProducerId);
    Task FinishProductionAction(int valueChainActionId, long currentProducerId);
    Task ReRequestProducer(ActionReRequestDto input);
}