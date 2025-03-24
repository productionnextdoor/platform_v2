using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using PMHelmutSchmidtPortal.HSUPortal.Products.Details;

namespace PMHelmutSchmidtPortal.HSUPortal.ProductionSteps;

[Table("PmProductionStepMeasurementVariant")]
public class ProductionStepMeasurementVariant : FullAuditedEntity
{
    public ProductionStep ProductionStep { get; set; }
    public int ProductionStepId { get; set; }
    public ProductMeasurement ProductMeasurement { get; set; }
    public int ProductMeasurementId { get; set; }
    public decimal OrderProcessingTime { get; set; }
    public decimal WorkHours { get; set; }
    
    public int SupplyOtherCraftsInWeeks { get; set; }
    public decimal TransportAndAssemblyCost { get; set; }
    public decimal AdditionalCost { get; set; }
    public ICollection<ProductionStepWorkPieceVariantCost> StepWorkPieceVariantCosts { get; set; }
}