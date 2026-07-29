using System.Collections.Generic;

namespace PMHelmutSchmidtPortal.HSUPortal.Materials.Dto;

public class MaterialDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<SpecificationDto> Specifications { get; set; } = new();
    public List<SpecificationGroupDto> SpecificationGroups { get; set; } = new();
}
