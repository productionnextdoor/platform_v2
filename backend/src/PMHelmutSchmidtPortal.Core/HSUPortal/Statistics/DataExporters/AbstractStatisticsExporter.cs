using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using PMHelmutSchmidtPortal.HSUPortal.Statistics.Dto;

namespace PMHelmutSchmidtPortal.HSUPortal.Statistics.DataExporters;

public abstract class AbstractStatisticsExporter : HSUDomainBaseService, IStatisticsDataExporter
{
    protected virtual string LocalisationPrefix => "";
    public virtual string GetFileName(DateTime startDate, DateTime? endDate)
    {
        string fileName = L($"{LocalisationPrefix}.FileName") + "_" + startDate.ToString("dd-MM-yyyy");
        
        if (endDate.HasValue)
        {
            fileName = fileName + "-" + endDate.Value.ToString("dd-MM-yyyy");
        }
        
        return fileName + ".csv";
    }

    public abstract Task<List<Dictionary<string, object>>> GetData(StatisticsInputDto filter);
       
}