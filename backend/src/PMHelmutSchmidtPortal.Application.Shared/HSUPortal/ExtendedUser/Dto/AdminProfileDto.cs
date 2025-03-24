using System.ComponentModel.DataAnnotations;

namespace PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto
{
    public class AdminProfileDto
    {
        [Required]
        public string FullName { get; set; }
        
        [Required]
        public string EmailAddress { get; set; }
    }
}