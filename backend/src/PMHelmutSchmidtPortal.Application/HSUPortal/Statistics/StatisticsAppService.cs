using System.Threading.Tasks;
using Abp.Authorization;
using PMHelmutSchmidtPortal.Authorization;
using PMHelmutSchmidtPortal.Dto;
using PMHelmutSchmidtPortal.HSUPortal.Statistics.DataExporting;
using PMHelmutSchmidtPortal.HSUPortal.Statistics.Dto;

namespace PMHelmutSchmidtPortal.HSUPortal.Statistics;

public class StatisticsAppService: HsuBaseAppService, IStatisticsAppService
{
    private readonly StatisticsFileExporter _statisticsFileExporter;

    public StatisticsAppService(StatisticsFileExporter statisticsFileExporter)
    {
        _statisticsFileExporter = statisticsFileExporter;
    }

    [AbpAuthorize(AppPermissions.Hsu_ImportExport_StatisticsExport)]
    public Task<FileDto> GetStatistics(StatisticsInputDto input)
    {
        return _statisticsFileExporter.ExportToFile(input);
    }
}