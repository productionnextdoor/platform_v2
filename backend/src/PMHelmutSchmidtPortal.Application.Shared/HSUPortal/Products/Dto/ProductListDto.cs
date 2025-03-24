using System;
using Abp.Application.Services.Dto;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Dto
{
    public class ProductListDto : AuditedEntityDto
    {
        public int ProductNumber { get; set; }
        public string Name { get; set; }
        public string DescriptionForDev { get; set; }
        public DeveloperListDto Developer { get; set; }
        public ProductState State { get; set; }
        public DateTime? ProcessingDeadline { get; set; }
    }
}