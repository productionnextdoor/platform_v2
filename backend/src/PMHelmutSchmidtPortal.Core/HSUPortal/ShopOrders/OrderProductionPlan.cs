using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning;

namespace PMHelmutSchmidtPortal.HSUPortal.ShopOrders;

[Table("PmOrderProductionPlan")]
public class OrderProductionPlan: FullAuditedEntity
{
    public ShopOrder ShopOrder { get; set; }
    public int ShopOrderId { get; set; }
    public ProductionPlan ProductionPlan { get; set; }
    public int ProductionPlanId { get; set; }
    public ICollection<OrderProductionPlanAction> OrderProductionPlanActions { get; set; }
    public ProductionStatus ProductionStatus { get; set; }
    public DateTime SelectedForProductionAt { get; set; }
    public DateTime? CommissionedAt { get; set; }
    
}