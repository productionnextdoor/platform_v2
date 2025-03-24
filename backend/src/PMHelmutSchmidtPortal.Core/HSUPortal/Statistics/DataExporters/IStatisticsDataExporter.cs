using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Services;
using PMHelmutSchmidtPortal.HSUPortal.Statistics.Dto;

namespace PMHelmutSchmidtPortal.HSUPortal.Statistics.DataExporters;

public interface IStatisticsDataExporter:IDomainService
{
    string GetFileName(DateTime startDate, DateTime? endDate);
    Task<List<Dictionary<string, object>>> GetData(StatisticsInputDto filter);
}