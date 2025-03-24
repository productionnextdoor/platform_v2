using System;
using Microsoft.Extensions.DependencyInjection;
using PMHelmutSchmidtPortal.HSUPortal.Statistics.DataExporters;

namespace PMHelmutSchmidtPortal.HSUPortal.Statistics;

public class DataExporterFactory : HSUDomainBaseService, IDataExporterFactory
{
    private readonly IServiceProvider _serviceProvider;

    public DataExporterFactory(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public IStatisticsDataExporter GetExporter(StatisticsDataType dataType)
    {
        return dataType switch
        {
            StatisticsDataType.ProductSteps => _serviceProvider.GetRequiredService<ProductStepExporter>(),
            StatisticsDataType.ProductValueChains => _serviceProvider.GetRequiredService<ProductValueChainExporter>(),
            StatisticsDataType.ProducerProductionRequests => _serviceProvider.GetRequiredService<ProducersPlanningRequestsExporter>(),
            _ => throw new ArgumentException("Invalid data type", nameof(dataType))
        };
    }
}