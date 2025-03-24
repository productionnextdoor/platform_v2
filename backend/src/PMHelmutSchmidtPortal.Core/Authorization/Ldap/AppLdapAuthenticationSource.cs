using Abp.Zero.Ldap.Authentication;
using Abp.Zero.Ldap.Configuration;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.MultiTenancy;

namespace PMHelmutSchmidtPortal.Authorization.Ldap
{
    public class AppLdapAuthenticationSource : LdapAuthenticationSource<Tenant, User>
    {
        public AppLdapAuthenticationSource(ILdapSettings settings, IAbpZeroLdapModuleConfig ldapModuleConfig)
            : base(settings, ldapModuleConfig)
        {
        }
    }
}