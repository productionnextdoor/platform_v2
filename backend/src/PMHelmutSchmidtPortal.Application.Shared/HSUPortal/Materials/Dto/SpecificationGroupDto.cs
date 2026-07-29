using System.Collections.Generic;

namespace PMHelmutSchmidtPortal.HSUPortal.Materials.Dto;

public class SpecificationGroupDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<SpecificationDto> Specifications { get; set; }
}
