using System.ComponentModel.DataAnnotations;

namespace PMHelmutSchmidtPortal.Authorization.Accounts.Dto
{
    public class SendEmailActivationLinkInput
    {
        [Required]
        public string EmailAddress { get; set; }
    }
}