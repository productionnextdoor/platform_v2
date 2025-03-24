using System.Collections.Generic;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ValueChainPlanner
{
    public class VcpPlanDto
    {
        public int PlanId { get; set; }
        public float PlanValue { get; set; }
        public List<VcpPlanActionsDto> Actions { get; set; }
        
    }
}