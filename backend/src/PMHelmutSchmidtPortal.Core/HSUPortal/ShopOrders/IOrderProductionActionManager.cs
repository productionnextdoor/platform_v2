using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Domain.Services;
using PMHelmutSchmidtPortal.HSUPortal.Orders.Dto.Details;

namespace PMHelmutSchmidtPortal.HSUPortal.ShopOrders;

public interface IOrderProductionActionManager : IDomainService
{
    Task<List<OrderProducerRequestOutput>> GetProducerActionRequests(int orderId, long producerId);
    IQueryable<OrderProductionPlanAction> GetOrderPlanActionsByStep( int orderId, int stepId);

}