using System;
using System.Collections.Generic;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Dto
{
    public class ProductProducersEmailArgs
    {
        public ProductListDto Product { get; set; }
        public ICollection<ProfileBase> Producers { get; set; }
    }
}