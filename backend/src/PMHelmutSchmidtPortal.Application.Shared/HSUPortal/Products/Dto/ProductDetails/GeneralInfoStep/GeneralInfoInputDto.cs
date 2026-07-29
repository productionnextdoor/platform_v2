using System.ComponentModel.DataAnnotations;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.GeneralInfoStep
{
    public class GeneralInfoInputDto
    {
        [Required]
        public int ProductId { get; set; }
        
        [Required, StringLength(200)]
        public string ProductName { get; set; }
        
        [Required]
        public float Height { get; set; }
        
        [Required]
        public float Width { get; set; }
        
        [Required]
        public float Depth { get; set; }
    }
}