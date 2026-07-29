using System.ComponentModel.DataAnnotations;

namespace PMHelmutSchmidtPortal.HSUPortal.Materials.Dto;

public class CreateSpecificationInput
{
    [Required]
    [StringLength(200)]
    public string Name { get; set; }

    public int? SpecificationGroupId { get; set; }
}
