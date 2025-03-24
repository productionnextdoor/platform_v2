using PMHelmutSchmidtPortal.Dto;

namespace PMHelmutSchmidtPortal.Organizations.Dto
{
    public class FindOrganizationUnitRolesInput : PagedAndFilteredInputDto
    {
        public long OrganizationUnitId { get; set; }
    }
}