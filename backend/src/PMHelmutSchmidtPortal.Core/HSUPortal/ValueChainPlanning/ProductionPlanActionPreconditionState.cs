using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using PMHelmutSchmidtPortal.HSUPortal.Products.Details;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning;

[Table("PmProductionPlanActionPreconditionState")]
public class ProductionPlanActionPreconditionState: FullAuditedEntity
{
    public ProductionPlanAction Action { get; set; }
    public int ActionId { get; set; }
    public ProductionState State { get; set; }
    public int StateId { get; set; }
}