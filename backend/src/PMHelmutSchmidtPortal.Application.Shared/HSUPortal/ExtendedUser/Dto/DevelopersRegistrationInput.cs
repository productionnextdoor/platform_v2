using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto
{
    public class DevelopersRegistrationInput: DeveloperProfile, IValidatableObject
    {
        [StringLength(200)]
        public string CompanyName { get; set; }
        public string VerificationCode { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public bool AcceptedTermsAndPrivacy { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (Password != ConfirmPassword)
            {
                yield return new ValidationResult(
                    "Password do not match",
                    new[] { "Password" }
                );
            }

            if (!AcceptedTermsAndPrivacy)
            {
                yield return new ValidationResult(
                    "Accept terms and conditions and privacy policy",
                    new[] { "AcceptedTermsAndPrivacy" }
                );
            }
        }
    }
}