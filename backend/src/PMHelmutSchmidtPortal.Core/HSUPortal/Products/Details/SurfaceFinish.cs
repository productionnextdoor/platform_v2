using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Details;

[Table("PmSurfaceFinish")]
public class SurfaceFinish: FullAuditedEntity
{
    [StringLength(200)]
    public string Name { get; set; }

    public int MaterialGroupId { get; set; }

    public MaterialGroup MaterialGroup { get; set; }
}