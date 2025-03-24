using System.ComponentModel.DataAnnotations;

namespace PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto
{
    public class ProfileBase
    {
        [Required]
        public string ContactPersonFullName { get; set; }
        
        [Required, StringLength(200)] 
        public string Street { get; set; }
        
        [Required, StringLength(20)] 
        public string ZipCode { get; set; }
        
        [Required, StringLength(100)] 
        public string City { get; set; }
        
        [Required]
        public string Email { get; set; }
        
        [Required]
        public string PhoneNumber { get; set; }
    }
}