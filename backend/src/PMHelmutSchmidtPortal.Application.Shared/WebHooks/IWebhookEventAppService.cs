using System.Threading.Tasks;
using Abp.Webhooks;

namespace PMHelmutSchmidtPortal.WebHooks
{
    public interface IWebhookEventAppService
    {
        Task<WebhookEvent> Get(string id);
    }
}
