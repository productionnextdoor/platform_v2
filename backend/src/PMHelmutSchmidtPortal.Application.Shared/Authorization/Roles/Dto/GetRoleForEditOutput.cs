using System.Collections.Generic;
using PMHelmutSchmidtPortal.Authorization.Permissions.Dto;

namespace PMHelmutSchmidtPortal.Authorization.Roles.Dto
{
    public class GetRoleForEditOutput
    {
        public RoleEditDto Role { get; set; }

        public List<FlatPermissionDto> Permissions { get; set; }

        public List<string> GrantedPermissionNames { get; set; }
    }
}