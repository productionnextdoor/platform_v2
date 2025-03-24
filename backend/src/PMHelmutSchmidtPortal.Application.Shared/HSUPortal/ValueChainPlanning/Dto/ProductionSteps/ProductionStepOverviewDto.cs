namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ProductionSteps
{
    public class ProductionStepOverviewDto : ProductionStepListDto
    {
        public decimal OrderProcessingTime { get; set; }
        public decimal WorkHours { get; set; }
        public decimal WorkCost { get; set; }
        public decimal MaterialAndTransportCost { get; set; }
        
    }
}