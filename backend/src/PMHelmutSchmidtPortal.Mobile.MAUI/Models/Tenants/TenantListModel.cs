using Abp.AutoMapper;
using PMHelmutSchmidtPortal.MultiTenancy.Dto;

namespace PMHelmutSchmidtPortal.Mobile.MAUI.Models.Tenants
{
    [AutoMapFrom(typeof(TenantListDto))]
    [AutoMapTo(typeof(TenantEditDto), typeof(CreateTenantInput))]
    public class TenantListModel : TenantListDto
    {
 
    }
}
