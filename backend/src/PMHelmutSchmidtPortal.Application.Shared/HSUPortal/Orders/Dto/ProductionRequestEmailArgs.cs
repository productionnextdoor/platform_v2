using System.Collections.Generic;

namespace PMHelmutSchmidtPortal.HSUPortal.Orders.Dto
{
    public class ProductionRequestEmailArgs
    {
        public string ProductName { get; set; }
        public int OrderId { get; set; }
        public List<EmailContactsArgs> ProducersEmailContacts { get; set; }
    }
}