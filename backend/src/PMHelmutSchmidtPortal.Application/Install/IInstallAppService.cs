using System.Threading.Tasks;
using Abp.Application.Services;
using PMHelmutSchmidtPortal.Install.Dto;

namespace PMHelmutSchmidtPortal.Install
{
    public interface IInstallAppService : IApplicationService
    {
        Task Setup(InstallDto input);

        AppSettingsJsonDto GetAppSettingsJson();

        CheckDatabaseOutput CheckDatabase();
    }
}