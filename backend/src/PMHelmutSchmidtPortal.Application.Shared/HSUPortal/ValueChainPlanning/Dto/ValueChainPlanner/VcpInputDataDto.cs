using System.Collections.Generic;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ValueChainPlanner
{
    public class VcpInputDataDto
    {
        public string OptimizeFor { get; set; }
        public decimal MinimumPlan { get; set; }
        public decimal MaximumPlan { get; set; }
        public int NumberOfPlans { get; set; }
        public List<VcpPlanDto> Plans { get; set; }
    }
}