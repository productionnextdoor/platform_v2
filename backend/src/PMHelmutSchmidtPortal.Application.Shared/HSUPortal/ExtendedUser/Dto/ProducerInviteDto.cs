using System.ComponentModel.DataAnnotations;

namespace PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto
{
    public class ProducerInviteDto : IBaseUserInvite
    {
        [Required, StringLength(200)]
        public string CompanyName { get; set; }
        
        [Required]
        public string Email { get; set; }
        
        [Required]
        public string FullName { get; set; }
        
        [Required]
        public TradeTypeDto TradeType { get; set; }
    }
}