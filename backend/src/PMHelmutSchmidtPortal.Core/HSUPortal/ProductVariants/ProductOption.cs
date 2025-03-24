using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using PMHelmutSchmidtPortal.HSUPortal.Products.Details;

namespace PMHelmutSchmidtPortal.HSUPortal.ProductVariants;

[Table("PmProductOption")]
public class ProductOption: FullAuditedEntity
{
    public ProductVariant ProductVariant { get; set; }
    public int ProductVariantId { get; set; }
    public WorkPiece WorkPiece { get; set; }
    public int WorkPieceId { get; set; }
    public WorkPieceVariant WorkPieceVariant { get; set; }
    public int? WorkPieceVariantId { get; set; }
}