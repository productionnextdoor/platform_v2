using System.Threading.Tasks;
using Abp.Application.Services;
using PMHelmutSchmidtPortal.Configuration.Tenants.Dto;

namespace PMHelmutSchmidtPortal.Configuration.Tenants
{
    public interface ITenantSettingsAppService : IApplicationService
    {
        Task<TenantSettingsEditDto> GetAllSettings();

        Task UpdateAllSettings(TenantSettingsEditDto input);

        Task ClearDarkLogo();
        
        Task ClearLightLogo();

        Task ClearCustomCss();
    }
}
