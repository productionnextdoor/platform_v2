namespace PMHelmutSchmidtPortal.HSUPortal.Orders.Dto.Details
{
    public class AcceptOrRejectActionInputDto
    {
        public int OrderId { get; set; }
        public int ProductionStepId { get; set; }
        public bool Accept { get; set; }
    }
}