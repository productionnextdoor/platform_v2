using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using PMHelmutSchmidtPortal.HSUPortal.Products;
using PMHelmutSchmidtPortal.HSUPortal.Products.Details;
using PMHelmutSchmidtPortal.HSUPortal.Users;

namespace PMHelmutSchmidtPortal.HSUPortal.ProductionSteps;

[Table("PmProductionStepWorkPieceVariantCost")]
public class ProductionStepWorkPieceVariantCost: FullAuditedEntity
{
    public ProductionStepMeasurementVariant MeasurementVariant { get; set; }
    public WorkPiece WorkPiece { get; set; }
    public int WorkPieceId { get; set; }
    public WorkPieceVariant Variant { get; set; }
    
    // Has to be nullable as the default workPiece is not a variant in the WorkPieceVariant Table
    public int? VariantId { get; set; }
    public bool IsStandard { get; set; }
    public decimal MaterialCost { get; set; }
    public bool CanProduce { get; set; }
    
    public ProductionDetails ProductionDetails { get; set; }
    public int ProductionDetailsId { get; set; }
    public ProducerInfo ProducerInfo { get; set; }
    public int ProducerInfoId { get; set; }
}