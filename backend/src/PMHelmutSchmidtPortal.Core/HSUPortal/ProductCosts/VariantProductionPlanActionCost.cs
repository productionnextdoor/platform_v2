using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using PMHelmutSchmidtPortal.HSUPortal.ProductVariants;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning;

namespace PMHelmutSchmidtPortal.HSUPortal.ProductCosts;

[Table("PmVariantProductionPlanActionCost")]
public class VariantProductionPlanActionCost: FullAuditedEntity
{
    public ProductVariant ProductVariant { get; set; }
    public int ProductVariantId { get; set; }
    public ProductionPlanAction PlanAction { get; set; }
    public int PlanActionId { get; set; }
    public decimal WorkCost { get; set; }
    public decimal AdditionalCost { get; set; }
    public decimal TransportAndAssemblyCost { get; set; }
    public decimal MaterialCost { get; set; }
}