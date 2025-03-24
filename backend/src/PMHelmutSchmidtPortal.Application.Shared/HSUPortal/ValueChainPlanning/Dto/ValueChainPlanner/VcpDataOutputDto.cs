using System.Collections.Generic;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ValueChainPlanner
{
    public class VcpDataOutputDto
    {
        public string OptimizeFor { get; set; }
        public List<VcpProducerDto> Producer { get; set; }
        public List<VcpProductionStateDto> States { get; set; }
        public List<VcpProductionStepDto> ProcessSteps { get; set; }
        
    }
}