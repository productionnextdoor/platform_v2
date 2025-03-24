using System.ComponentModel.DataAnnotations;

namespace PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto
{
    public class FullProfileBase : FullProfileUserBase
    {
        [Required, StringLength(200)]
        public string CompanyName { get; set; }
        
        [StringLength(2000)]
        public string Note { get; set; }
    }
}