using System.ComponentModel.DataAnnotations;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductFilesStep
{
    public class ProductFilesStepInput
    {
        [Required]
        public int ProductId { get; set; }
        
        [StringLength(1000)]
        public string SharepointLink { get; set; }
        
        [Required, StringLength(2000)]
        public string ProductDescription { get; set; }
    }
}