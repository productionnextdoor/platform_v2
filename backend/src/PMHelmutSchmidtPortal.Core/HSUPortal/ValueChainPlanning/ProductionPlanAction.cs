using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.HSUPortal.ProductCosts;
using PMHelmutSchmidtPortal.HSUPortal.ProductionSteps;
using PMHelmutSchmidtPortal.HSUPortal.Products.Details;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning;

[Table("PmProductionPlanAction")]
public class ProductionPlanAction: FullAuditedEntity
{
    public ProductionStep ProductionStep { get; set; }
    public int ProductionStepId { get; set; }
    public ICollection<ProductionPlanActionPreconditionState> PreconditionsStates { get; set; }
    public ProductionState FinalState { get; set; }
    public int FinalStateId { get; set; }
    public float StartPoint { get; set; }
    public float EndPoint { get; set; }
    public User Producer { get; set; }
    public long ProducerId { get; set; }
    public float ProcessingTimeInWeeks { get; set; }
    public float WorkingTimeInHours { get; set; }
    
    public ICollection<VariantProductionPlanActionCost> VariantActionCost { get; set; }
}