using Abp.Application.Services.Dto;

namespace PMHelmutSchmidtPortal.Notifications.Dto
{
    public class GetAllForLookupTableInput : PagedAndSortedResultRequestDto
    {
        public string Filter { get; set; }
    }
}