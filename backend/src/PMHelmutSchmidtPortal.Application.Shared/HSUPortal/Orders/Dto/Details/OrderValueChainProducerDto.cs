using System.Collections.Generic;

namespace PMHelmutSchmidtPortal.HSUPortal.Orders.Dto.Details
{
    public class OrderValueChainProducerDto
    {
        public int OrderValueChainId { get; set; }
        public List<OrderValueChainActionProducerDto> ValueChainActions { get; set; }
    }
}