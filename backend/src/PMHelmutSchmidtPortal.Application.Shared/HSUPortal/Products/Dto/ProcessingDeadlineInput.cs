using System;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Dto
{
    public class ProcessingDeadlineInput
    {
        public int ProductId { get; set; }
        public int ProductionDetailsId { get; set; }
        public DateTime ProcessingDeadLine { get; set; }
    }
}