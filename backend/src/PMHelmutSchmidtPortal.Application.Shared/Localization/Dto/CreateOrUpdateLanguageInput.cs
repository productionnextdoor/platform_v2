using System.ComponentModel.DataAnnotations;

namespace PMHelmutSchmidtPortal.Localization.Dto
{
    public class CreateOrUpdateLanguageInput
    {
        [Required]
        public ApplicationLanguageEditDto Language { get; set; }
    }
}