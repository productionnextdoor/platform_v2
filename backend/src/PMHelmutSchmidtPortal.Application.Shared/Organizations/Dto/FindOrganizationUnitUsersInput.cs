using PMHelmutSchmidtPortal.Dto;

namespace PMHelmutSchmidtPortal.Organizations.Dto
{
    public class FindOrganizationUnitUsersInput : PagedAndFilteredInputDto
    {
        public long OrganizationUnitId { get; set; }
    }
}
