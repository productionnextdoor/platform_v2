using System.ComponentModel.DataAnnotations;

namespace PMHelmutSchmidtPortal.Authorization.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}
