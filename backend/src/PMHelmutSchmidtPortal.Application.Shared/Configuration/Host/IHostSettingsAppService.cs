using System.Threading.Tasks;
using Abp.Application.Services;
using PMHelmutSchmidtPortal.Configuration.Host.Dto;

namespace PMHelmutSchmidtPortal.Configuration.Host
{
    public interface IHostSettingsAppService : IApplicationService
    {
        Task<HostSettingsEditDto> GetAllSettings();

        Task UpdateAllSettings(HostSettingsEditDto input);

        Task SendTestEmail(SendTestEmailInput input);
    }
}
