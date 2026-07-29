using System;
using System.ComponentModel.DataAnnotations;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.GeneralInfoStep
{
    public class GeneralInfoOutputDto
    {
        public int ProductId { get; set; }
        
        [StringLength(200)]
        public string ProductName { get; set; }
        
        public int ProductNumber { get; set; }
        
        public DateTime CreationTime { get; set; }
        
        public float Height { get; set; }
        
        public float Width { get; set; }
        
        public float Depth { get; set; }
    }
}