using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using MiniExcelLibs;
using PMHelmutSchmidtPortal.Dto;
using PMHelmutSchmidtPortal.HSUPortal.Statistics.DataExporters;
using PMHelmutSchmidtPortal.HSUPortal.Statistics.Dto;
using PMHelmutSchmidtPortal.Storage;
using Abp.AspNetZeroCore.Net;
using MiniExcelLibs.Csv;

namespace PMHelmutSchmidtPortal.HSUPortal.Statistics.DataExporting;

public class StatisticsFileExporter : HsuBaseAppService
{
    private readonly ITempFileCacheManager _tempFileCacheManager;
    private readonly DataExporterFactory _dataExporterFactory;


    public StatisticsFileExporter(
        ITempFileCacheManager tempFileCacheManager,
        DataExporterFactory dataExporterFactory
    )
    {
        _tempFileCacheManager = tempFileCacheManager;
        _dataExporterFactory = dataExporterFactory;
    }

    public async Task<FileDto> ExportToFile(StatisticsInputDto statisticsInputDto)
    {
        IStatisticsDataExporter dataExporter = _dataExporterFactory.GetExporter(statisticsInputDto.DataType);
        List<Dictionary<string, object>> items = await dataExporter.GetData(statisticsInputDto);
        return CreateExcelPackage(dataExporter.GetFileName(statisticsInputDto.DateFrom ?? DateTime.Now,statisticsInputDto.DateTo), items);
    }

    private FileDto CreateExcelPackage(string fileName, List<Dictionary<string, object>> items)
    {
        FileDto file = new(fileName, MimeTypeNames.ApplicationVndOpenxmlformatsOfficedocumentSpreadsheetmlSheet);

        using MemoryStream stream = new();
        stream.SaveAs(items, true, "Sheet1", ExcelType.CSV,new CsvConfiguration()
        {
            Seperator = ';' 
        });
        _tempFileCacheManager.SetFile(file.FileToken, stream.ToArray());

        return file;
    }
}