using System.Collections.Generic;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ProductionPlan
{
    public class PlanListDto
    {
        public int PlanId { get; set; }
        public string ProducersList { get; set; }
        public decimal PlanValue { get; set; }
        public decimal LeadTime { get; set; }
        public List<PlanRatingDto> PlanRatings { get; set; }
        public bool IsActive { get; set; }
    }
}