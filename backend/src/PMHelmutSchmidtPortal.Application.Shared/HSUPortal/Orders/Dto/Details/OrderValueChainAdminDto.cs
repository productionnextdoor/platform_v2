using System;
using System.Collections.Generic;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning;

namespace PMHelmutSchmidtPortal.HSUPortal.Orders.Dto.Details
{
    public class OrderValueChainAdminDto
    {
        public int OrderValueChainId { get; set; }
        public List<OrderValueChainActionAdminDto> ValueChainActions { get; set; }
        public ProductionStatus Status { get; set; }
        public DateTime RequestDate { get; set; }
    }
}