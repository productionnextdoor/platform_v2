using System;
using System.Collections.Generic;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Dto
{
    public class ProductProducersRequestDto
    {
        public int ProductId { get; set; }
        
        public int ProductionDetailsId { get; set; }
        public List<long> ProducersId { get; set;}
        public DateTime ProcessingDeadLine { get; set; }
    }
}