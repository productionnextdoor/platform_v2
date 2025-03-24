using System.Collections.Generic;
using PMHelmutSchmidtPortal.Authorization.Users.Dto;
using PMHelmutSchmidtPortal.Dto;

namespace PMHelmutSchmidtPortal.Authorization.Users.Exporting
{
    public interface IUserListExcelExporter
    {
        FileDto ExportToFile(List<UserListDto> userListDtos);
    }
}