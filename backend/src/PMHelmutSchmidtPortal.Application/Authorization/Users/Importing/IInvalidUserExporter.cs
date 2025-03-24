using System.Collections.Generic;
using PMHelmutSchmidtPortal.Authorization.Users.Importing.Dto;
using PMHelmutSchmidtPortal.Dto;

namespace PMHelmutSchmidtPortal.Authorization.Users.Importing
{
    public interface IInvalidUserExporter
    {
        FileDto ExportToFile(List<ImportUserDto> userListDtos);
    }
}
