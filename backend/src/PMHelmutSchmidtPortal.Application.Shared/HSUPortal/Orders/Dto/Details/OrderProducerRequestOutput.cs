using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductVariantStep;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning;

namespace PMHelmutSchmidtPortal.HSUPortal.Orders.Dto.Details
{
    public class OrderProducerRequestOutput
    {
        public int ProductionStepId { get; set; }
        public string StartStateName { get; set; }
        public string FinalStateName { get; set; }
        public ActionStatus Status { get; set; }
        public MeasurementDto Measurement { get; set; }
        public string Material { get; set; }
        public decimal DeliveryWindowInWeeks { get; set; }
        public decimal ProcessingTimeInWeeks { get; set; }
        public decimal WorkHours { get; set; }
        public float WorkStart { get; set; }
        public float WorkEnd { get; set; }
        public decimal WorkIncomeMin { get; set; }
        public decimal WorkIncomeMax { get; set; }
        public decimal MaterialAndTransportationsIncomeMin { get; set; }
        public decimal MaterialAndTransportationsIncomeMax { get; set; }
        public decimal WorkCalculated { get; set; }
        public decimal MaterialAndTransportationsCalculated { get; set; }
    }
}
