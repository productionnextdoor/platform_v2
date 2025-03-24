using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using PMHelmutSchmidtPortal.HSUPortal.Products;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning;

[Table("PmProductionPlan")]
public class ProductionPlan : FullAuditedEntity
{
    public ProductionDetails ProductionDetails { get; set; }
    public int ProductionDetailsId { get; set; }
    public float PlanValue { get; set; }
    public decimal LeadTime { get; set; }
    public ICollection<ProductionPlanAction> PlanActions { get; set; }
    public ICollection<ProductionPlanRating> PlanRatings { get; set; }
    public bool IsActive { get; set; }
}