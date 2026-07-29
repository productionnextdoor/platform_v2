using System;
using System.Collections.Generic;
using Abp.Application.Services.Dto;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ProductionPlan
{
    public class PlanListOutputDto
    {
        public DateTime? LastPlanCalculatedAt { get; set; }
        public List<PlanRatingTypesDto> RatingTypes { get; set; }
        public PagedResultDto<PlanListDto> Plans { get; set; }
    }
}