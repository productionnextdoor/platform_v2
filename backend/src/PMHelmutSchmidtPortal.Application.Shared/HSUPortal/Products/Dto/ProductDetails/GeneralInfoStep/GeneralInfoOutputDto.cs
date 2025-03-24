using System;
using System.ComponentModel.DataAnnotations;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.GeneralInfoStep
{
    public class GeneralInfoOutputDto: GeneralInfoInputDto
    {
        public int ProductNumber { get; set; }
        public DateTime CreationTime { get; set; }
    }
}