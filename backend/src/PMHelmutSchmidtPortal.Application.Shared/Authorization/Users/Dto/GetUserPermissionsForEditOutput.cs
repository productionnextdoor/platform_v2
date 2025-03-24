using System.Collections.Generic;
using PMHelmutSchmidtPortal.Authorization.Permissions.Dto;

namespace PMHelmutSchmidtPortal.Authorization.Users.Dto
{
    public class GetUserPermissionsForEditOutput
    {
        public List<FlatPermissionDto> Permissions { get; set; }

        public List<string> GrantedPermissionNames { get; set; }
    }
}