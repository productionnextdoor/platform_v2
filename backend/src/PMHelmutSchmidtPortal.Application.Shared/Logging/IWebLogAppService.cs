using Abp.Application.Services;
using PMHelmutSchmidtPortal.Dto;
using PMHelmutSchmidtPortal.Logging.Dto;

namespace PMHelmutSchmidtPortal.Logging
{
    public interface IWebLogAppService : IApplicationService
    {
        GetLatestWebLogsOutput GetLatestWebLogs();

        FileDto DownloadWebLogs();
    }
}
