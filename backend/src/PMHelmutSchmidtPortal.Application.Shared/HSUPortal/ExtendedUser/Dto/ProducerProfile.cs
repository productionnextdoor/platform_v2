using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto
{
    public class ProducerProfile : ProfileBase, IProducerAddress,IProducerInfo, IValidatableObject
    {
        [Required, StringLength(200)]
        public string CompanyName { get; set; }

        [Required]
        public int NumberOfEmployees { get; set; }

        [Required]
        public decimal Rate { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (Rate <= 0)
            {
                yield return new ValidationResult(
                    "Rate should be bigger than 0",
                    new[] { "Rate" }
                );
            }
        }
    }
}