namespace PMHelmutSchmidtPortal.HSUPortal.Orders.Dto.Details
{
    public class OrderValueChainActionAdminDto : OrderValueChainActionBaseDto
    {
        public int ProductionStepId { get; set; }
        public float ProcessingTimeInWeeks { get; set; }
    }
}