using System.Collections.Generic;
using PMHelmutSchmidtPortal.Auditing.Dto;
using PMHelmutSchmidtPortal.Dto;

namespace PMHelmutSchmidtPortal.Auditing.Exporting
{
    public interface IAuditLogListExcelExporter
    {
        FileDto ExportToFile(List<AuditLogListDto> auditLogListDtos);

        FileDto ExportToFile(List<EntityChangeListDto> entityChangeListDtos);
    }
}
