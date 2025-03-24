using PMHelmutSchmidtPortal.Dto;

namespace PMHelmutSchmidtPortal.WebHooks.Dto
{
    public class GetAllSendAttemptsInput : PagedInputDto
    {
        public string SubscriptionId { get; set; }
    }
}
