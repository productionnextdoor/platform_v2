using System.ComponentModel.DataAnnotations;

namespace PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto
{
    public class DeveloperProfile : ProfileBase, IDeveloperAddress
    {
        [Required]
        public string Region { get; set; }

        [Required]
        public string Country { get; set; }
    }
}