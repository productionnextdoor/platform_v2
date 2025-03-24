namespace PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductFilesStep
{
    public class ProductFileDto
    {
        public int FileId { get; set; }
        public string FileName { get; set; }
        public int ProductId { get; set; }
        public ProductFileCategory FileCategory { get; set; }
    }
}