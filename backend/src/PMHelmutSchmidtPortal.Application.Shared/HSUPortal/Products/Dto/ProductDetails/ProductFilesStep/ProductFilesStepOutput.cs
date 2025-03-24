using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductFilesStep
{
    public class ProductFilesStepOutput
    {
        public int ProductId { get; set; }
        
        public string SharepointLink { get; set; }
        
        [StringLength(2000)]
        public string ProductDescription { get; set; }
        
        public List<ProductFileDto> ProductFileDtos { get; set; }
        
    }
}