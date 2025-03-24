using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using PMHelmutSchmidtPortal.HSUPortal.Users;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning;

[Table("PmProductionPlanRating")]
public class ProductionPlanRating: FullAuditedEntity
{
    public RatingType RatingType { get; set; }
    public int RatingTypeId { get; set; }
    public decimal Rating { get; set; }
    
    public ProductionPlan ProductionPlan { get; set; }
    
    public int ProductionPlanId { get; set; }
}