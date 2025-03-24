using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ProductionSteps
{
    public class ProductionStepBaseDto : IValidatableObject
    {
        [Required] 
        public int ProductionDetailsId { get; set; }
        public int StepId { get; set; }
        public int StartStateId { get; set; }
        public int EndStateId { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if ((StepId == 0 && (StartStateId == 0 || EndStateId == 0)))
            {
                yield return new ValidationResult(
                    "ProductionStepId or both StartStateId and EndStateId should be provided",
                    new[] { "ProductionStepId", "StartStateId", "EndStateId" }
                );
            }
        }
    }
}