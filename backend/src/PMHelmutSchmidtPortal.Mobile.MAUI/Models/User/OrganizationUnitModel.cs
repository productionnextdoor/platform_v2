using Abp.AutoMapper;
using PMHelmutSchmidtPortal.Organizations.Dto;

namespace PMHelmutSchmidtPortal.Mobile.MAUI.Models.User
{
    [AutoMapFrom(typeof(OrganizationUnitDto))]
    public class OrganizationUnitModel : OrganizationUnitDto
    {
        public bool IsAssigned { get; set; }
    }
}
