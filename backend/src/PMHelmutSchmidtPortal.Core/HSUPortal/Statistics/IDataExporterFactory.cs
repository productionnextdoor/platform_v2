using Abp.Domain.Services;
using PMHelmutSchmidtPortal.HSUPortal.Statistics.DataExporters;

namespace PMHelmutSchmidtPortal.HSUPortal.Statistics;

public interface IDataExporterFactory : IDomainService
{
    IStatisticsDataExporter GetExporter(StatisticsDataType dataType);
}