using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Details;

[Table("PmMaterialGroup")]
public class MaterialGroup: FullAuditedEntity
{
    [StringLength(200)]
    public string Name { get; set; }
    
    [ForeignKey("MaterialGroupId")]
    public ICollection<Specification> Specifications  {get; set;}

    [ForeignKey("MaterialGroupId")]
    public ICollection<SpecificationGroup> SpecificationGroups { get; set; }
}