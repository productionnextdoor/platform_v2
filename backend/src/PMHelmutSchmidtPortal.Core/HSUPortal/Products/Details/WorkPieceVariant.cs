using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Details;

[Table("PmWorkPieceVariant")]
public class WorkPieceVariant: FullAuditedEntity
{
    public WorkPiece WorkPiece { get; set; }
    public int WorkPieceId { get; set; }
    
    [StringLength(200)]
    public string Description { get; set; }
}