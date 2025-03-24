using System.Threading.Tasks;
using Abp.Application.Services;
using PMHelmutSchmidtPortal.Editions.Dto;
using PMHelmutSchmidtPortal.MultiTenancy.Dto;

namespace PMHelmutSchmidtPortal.MultiTenancy
{
    public interface ITenantRegistrationAppService: IApplicationService
    {
        Task<RegisterTenantOutput> RegisterTenant(RegisterTenantInput input);

        Task<EditionsSelectOutput> GetEditionsForSelect();

        Task<EditionSelectDto> GetEdition(int editionId);
    }
}