using System.ComponentModel.DataAnnotations;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.DeliveryAddressStep
{
    public class DeliveryAddressInputDto
    {
        [Required]
        public int ProductId { get; set; }
        
        [Required, StringLength(200)]
        public string Name { get; set; }
    
        [StringLength(200)]
        public string PhoneNumber { get; set; }
    
        [Required, StringLength(200)]
        public string EmailAddress { get; set; }
    
        [Required, StringLength(200)]
        public string Street { get; set; }
    
        [Required, StringLength(200)]
        public string Zip { get; set; }
    
        [Required, StringLength(200)]
        public string City { get; set; }
    }
}