namespace PMHelmutSchmidtPortal.HSUPortal.Orders.Dto.Details
{
    public class OrderValueChainActionProducerDto : OrderValueChainActionBaseDto
    {
        public long ProducerId { get; set; }
        public float ProcessingFrom { get; set; }
        public float ProcessingTo { get; set; }
        
        public bool IsFinal { get; set; }
    }
}
