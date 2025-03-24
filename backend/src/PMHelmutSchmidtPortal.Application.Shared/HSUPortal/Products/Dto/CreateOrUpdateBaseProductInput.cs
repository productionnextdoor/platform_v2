using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Dto
{
    public class CreateOrUpdateBaseProductInput : IValidatableObject
    {
        public int? ProductId { get; set; }
        
        [Required, StringLength(200)]
        public string Name { get; set; }
        
        [StringLength(2000)]
        public string DescriptionForDev { get; set; }
        
        public ProductState? State { get; set; }
        
        [Required, Range(1, long.MaxValue)]
        public long DeveloperId { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (State != null && State != ProductState.Draft && State != ProductState.InProcessDeveloper )
            {
                yield return new ValidationResult(
                    "State can only be draft or InProcessDeveloper",
                    new[] { "State" }
                );
            }
        }
    }
}