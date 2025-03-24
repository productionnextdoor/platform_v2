using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning;

namespace PMHelmutSchmidtPortal.HSUPortal.ShopOrders;

[Table("PmOrderProductionPlanAction")]
public class OrderProductionPlanAction: FullAuditedEntity
{
    public OrderProductionPlan OrderProductionPlan { get; set; }
    public int OrderProductionPlanId { get; set; }
    public ProductionPlanAction PlanAction { get; set; }
    public int PlanActionId { get; set; }
    public ActionStatus ActionStatus { get; set; }
}