using System.Collections.Generic;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ProductionSteps
{
    public class ProductionStepCreateOrUpdateDto : ProductionStepBaseDto
    {
        public List<StepMeasurementVariantsDto> StepMeasurementVariants { get; set; }
    }
}