using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using PMHelmutSchmidtPortal.Authentication.TwoFactor.Google;
using PMHelmutSchmidtPortal.Authorization;
using PMHelmutSchmidtPortal.Authorization.Roles;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.Editions;
using PMHelmutSchmidtPortal.MultiTenancy;

namespace PMHelmutSchmidtPortal.Identity
{
    public static class IdentityRegistrar
    {
        public static IdentityBuilder Register(IServiceCollection services)
        {
            services.AddLogging();

            return services.AddAbpIdentity<Tenant, User, Role>(options =>
                {
                    options.Tokens.ProviderMap[GoogleAuthenticatorProvider.Name] = new TokenProviderDescriptor(typeof(GoogleAuthenticatorProvider));
                })
                .AddAbpTenantManager<TenantManager>()
                .AddAbpUserManager<UserManager>()
                .AddAbpRoleManager<RoleManager>()
                .AddAbpEditionManager<EditionManager>()
                .AddAbpUserStore<UserStore>()
                .AddAbpRoleStore<RoleStore>()
                .AddAbpSignInManager<SignInManager>()
                .AddAbpUserClaimsPrincipalFactory<UserClaimsPrincipalFactory>()
                .AddAbpSecurityStampValidator<SecurityStampValidator>()
                .AddPermissionChecker<PermissionChecker>()
                .AddDefaultTokenProviders();
        }
    }
}
