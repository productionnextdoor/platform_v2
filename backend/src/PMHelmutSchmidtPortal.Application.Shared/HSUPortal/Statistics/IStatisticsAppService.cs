using System.Threading.Tasks;
using Abp.Application.Services;
using PMHelmutSchmidtPortal.Dto;
using PMHelmutSchmidtPortal.HSUPortal.Statistics.Dto;

namespace PMHelmutSchmidtPortal.HSUPortal.Statistics
{
    public interface IStatisticsAppService: IApplicationService
    {
        Task<FileDto> GetStatistics(StatisticsInputDto input);

    }
}