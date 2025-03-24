using System.Threading.Tasks;
using PMHelmutSchmidtPortal.Authorization.Users;

namespace PMHelmutSchmidtPortal.WebHooks
{
    public interface IAppWebhookPublisher
    {
        Task PublishTestWebhook();
    }
}
