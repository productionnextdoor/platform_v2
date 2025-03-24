namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ProductionSteps
{
    public class WorkPieceVariantCostDto
    {
        public int WorkPieceVariantCostId { get; set; }
        public int WorkPieceId { get; set; }
        public int? WorkPieceVariantId { get; set; }
        public bool IsStandard { get; set; }
        public decimal MaterialCost { get; set; }
        public bool CanProduce { get; set; }
    }
}