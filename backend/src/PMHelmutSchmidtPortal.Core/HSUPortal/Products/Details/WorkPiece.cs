using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Details;

[Table("PmWorkPiece")]
public class WorkPiece: FullAuditedEntity
{
    public Product Product { get; set; }
    
    public int ProductId { get; set; }
    
    public MaterialGroup MaterialGroup { get; set; }
    
    public int MaterialGroupId { get; set; }
    
    [ForeignKey("WorkPieceId")]
    public ICollection<WorkPieceSpecification> WorkPieceSpecifications { get; set; }

    [ForeignKey("WorkPieceId")]
    public ICollection<ProductionState> ProductionStates  {get; set;}
    
    [ForeignKey("WorkPieceId")]
    public ICollection<WorkPieceVariant> WorkPieceVariants  {get; set;}
}