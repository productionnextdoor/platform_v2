using System.ComponentModel.DataAnnotations;

namespace PMHelmutSchmidtPortal.HSUPortal.Materials.Dto;

public class CreateMaterialInput
{
    [Required]
    [StringLength(200)]
    public string Name { get; set; }
}
