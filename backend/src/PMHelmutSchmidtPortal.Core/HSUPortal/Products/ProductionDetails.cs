using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using PMHelmutSchmidtPortal.HSUPortal.ProductionSteps;
using PMHelmutSchmidtPortal.HSUPortal.Products.Details;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning;

namespace PMHelmutSchmidtPortal.HSUPortal.Products;

[Table("PmProductProductionDetails")]
public class ProductionDetails :  FullAuditedEntity
{
    public Product Product { get; set; }
    public int ProductId { get; set; }
    public ICollection<ProductProducer> AssignedProducers { get; set; }
    public DateTime? ProcessingDeadline { get; set; }
    public ICollection<ProductionState> ProductionStates {get; set;}
    public ICollection<ProductionStep> ProductionSteps { get; set; }
    public ICollection<ProductionPlan> ProductionPlans { get; set; }
    public DateTime? LastPlanCalculatedAt { get; set; }
    public ProductionDetailsType ProductionDetailsType { get; set; }
}