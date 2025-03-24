using System.ComponentModel.DataAnnotations;

namespace PMHelmutSchmidtPortal.Authorization.Accounts.Dto
{
    public class ImpersonateUserInput
    {
        public int? TenantId { get; set; }
    
        [Range(1, long.MaxValue)]
        public long UserId { get; set; }
    }
}
