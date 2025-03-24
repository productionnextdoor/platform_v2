using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using PMHelmutSchmidtPortal.WebHooks.Dto;

namespace PMHelmutSchmidtPortal.WebHooks
{
    public interface IWebhookAttemptAppService
    {
        Task<PagedResultDto<GetAllSendAttemptsOutput>> GetAllSendAttempts(GetAllSendAttemptsInput input);

        Task<ListResultDto<GetAllSendAttemptsOfWebhookEventOutput>> GetAllSendAttemptsOfWebhookEvent(GetAllSendAttemptsOfWebhookEventInput input);
    }
}
