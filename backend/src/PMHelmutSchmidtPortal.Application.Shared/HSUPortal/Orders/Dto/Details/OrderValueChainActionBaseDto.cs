using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning;

namespace PMHelmutSchmidtPortal.HSUPortal.Orders.Dto.Details
{
    public class OrderValueChainActionBaseDto
    {
        public int OrderValueChainActionId { get; set; }
        public ValueChainActionStepDto ActionStepDto { get; set; }
        public ValueChainActionProducerDto ProducerDto { get; set; }
        public ActionStatus Status { get; set; }
    }
}