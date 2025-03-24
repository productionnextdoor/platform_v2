namespace PMHelmutSchmidtPortal.HSUPortal.ShopImportExport.Products
{
    public class PriceDto
    {
        public string CurrencyId { get; set; }
        public decimal Gross { get; set; }
        public decimal Net { get; set; }
        public bool Linked { get; set; } 
    }
}