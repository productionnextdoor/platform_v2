using Abp.Domain.Services;

namespace PMHelmutSchmidtPortal.Authorization.Users.Password
{
    public interface IPasswordExpirationService : IDomainService
    {
        void ForcePasswordExpiredUsersToChangeTheirPassword();
    }
}
