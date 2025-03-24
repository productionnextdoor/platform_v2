using System.Threading.Tasks;
using PMHelmutSchmidtPortal.Authorization.Users;

namespace PMHelmutSchmidtPortal.HSUPortal.Users;

public interface IRegistrationEmailer
{
    Task SendInvitation(User user, string userRole);
}