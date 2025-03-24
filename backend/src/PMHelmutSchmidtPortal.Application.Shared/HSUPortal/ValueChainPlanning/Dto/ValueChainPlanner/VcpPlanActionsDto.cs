using System.Collections.Generic;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ValueChainPlanner
{
    public class VcpPlanActionsDto
    {
        public int Id { get; set; }
        public List<VcpProductionStateDto> Preconditions { get; set; }
        public VcpProductionStateDto FinalStateId { get; set; }
        public float StartingPoint { get; set; }
        public float EndingPoint { get; set; }
        public float Costs { get; set; }
        public VcpProducerDto ProducerId { get; set; }
        public float ProcessingTimeInWeeks { get; set; }
        public float WorkingTimeInHours { get; set; }
    }
}