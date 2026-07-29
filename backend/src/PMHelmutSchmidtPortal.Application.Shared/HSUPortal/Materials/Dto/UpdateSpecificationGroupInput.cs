using System.ComponentModel.DataAnnotations;

namespace PMHelmutSchmidtPortal.HSUPortal.Materials.Dto;

public class UpdateSpecificationGroupInput
{
    [Required]
    [StringLength(200)]
    public string Name { get; set; }
}
