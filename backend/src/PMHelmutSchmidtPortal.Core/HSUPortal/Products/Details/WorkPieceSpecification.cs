using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Details;

[Table("PmWorkPieceSpecification")]
public class WorkPieceSpecification : FullAuditedEntity
{
    public int WorkPieceId { get; set; }

    public WorkPiece WorkPiece { get; set; }

    public int SpecificationId { get; set; }

    public Specification Specification { get; set; }

    [StringLength(200)]
    public string SpecificationName { get; set; }
}
