using System.Collections.Generic;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductVariantStep;

namespace PMHelmutSchmidtPortal.HSUPortal.Orders.Dto.Details
{
    public class OrderedProductDto
    {
        public string OrderNumber { get; set; }
        public MeasurementDto Measurement { get; set; }
        public List<OrderMaterialDto> Materials { get; set;}
        public decimal ProductionCost { get; set; }
        public decimal PlatformShare { get; set; }
        public decimal DeveloperShare { get; set; }
        public List<PayoutDto> Payouts { get; set;}
        public List<DeliveryDocumentsDto> Documents { get; set; }
    }
}
