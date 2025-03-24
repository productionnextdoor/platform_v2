using System.Collections.Generic;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ProductionSteps
{
    public class StepMeasurementVariantsDto
    {
        public int StepMeasurementVariantsId { get; set; }
        public int MeasurementId { get; set; }
        public decimal OrderProcessingTime { get; set; }
        public decimal WorkHours { get; set; }
        public int SupplyOtherCraftsInWeeks { get; set; }
        public decimal TransportAndAssemblyCost { get; set; }
        public decimal AdditionalCosts { get; set; }
        public List<WorkPieceVariantCostDto> WorkPieceVariantsCost { get; set; }
    }
}