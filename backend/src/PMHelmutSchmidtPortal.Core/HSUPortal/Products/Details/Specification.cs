using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Details;

[Table("PmSpecification")]
public class Specification: FullAuditedEntity
{
    [StringLength(200)]
    public string Name { get; set; }

    public int MaterialGroupId { get; set; }

    public MaterialGroup MaterialGroup { get; set; }

    public int? SpecificationGroupId { get; set; }

    public SpecificationGroup SpecificationGroup { get; set; }
}