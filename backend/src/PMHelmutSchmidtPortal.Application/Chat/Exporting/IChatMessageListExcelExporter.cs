using System.Collections.Generic;
using Abp;
using PMHelmutSchmidtPortal.Chat.Dto;
using PMHelmutSchmidtPortal.Dto;

namespace PMHelmutSchmidtPortal.Chat.Exporting
{
    public interface IChatMessageListExcelExporter
    {
        FileDto ExportToFile(UserIdentifier user, List<ChatMessageExportDto> messages);
    }
}
