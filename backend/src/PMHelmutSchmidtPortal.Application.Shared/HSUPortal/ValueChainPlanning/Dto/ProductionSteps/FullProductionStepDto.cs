using System.Collections.Generic;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ProductionState;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ProductionSteps
{
    public class FullProductionStepDto : ProductionStepDto
    {
        public ProductionStateDto StartState { get; set; }
        public ProductionStateDto EndState { get; set; }
        public List<StepMeasurementVariantsDto> StepMeasurementVariants { get; set; }
    }
}