namespace PMHelmutSchmidtPortal.HSUPortal.Orders.Dto.Details
{
    public class OrderDetailsBaseOutput
    {
        public int OrderId { get; set; }
        
        public OrderedProductDto OrderedProduct { get; set; }
        
        public CustomerInfoDto CustomerInfo { get; set; }
    }
}