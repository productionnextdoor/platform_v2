using System.Collections.Generic;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ValueChainPlanner
{
    public class VcpProductionStepDto
    {
        public int Id { get; set; }
        public int InitialStateId { get; set; }
        public int FinalStateId { get; set; }
        public decimal Costs { get; set; }
        public long ProducerId { get; set; }
        public decimal ProcessingTimeInWeeks { get; set; }
        public decimal WorkingTimeInHours { get; set; }
        
        public List<VcpStepPreconditionDto> Preconditions { get; set; }
    }
}