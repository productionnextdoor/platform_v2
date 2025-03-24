using System.Collections.Generic;
using PMHelmutSchmidtPortal.Authorization.Users.Importing.Dto;
using Abp.Dependency;

namespace PMHelmutSchmidtPortal.Authorization.Users.Importing
{
    public interface IUserListExcelDataReader: ITransientDependency
    {
        List<ImportUserDto> GetUsersFromExcel(byte[] fileBytes);
    }
}
