using System.Collections.Generic;

namespace PMHelmutSchmidtPortal.HSUPortal.Orders.Dto
{
    public class OrderInfoEmailArgs
    {
        public string ProductName { get; set; }
        public int OrderId { get; set; }
        public List<EmailContactsArgs> EmailContacts { get; set; }
    }
}