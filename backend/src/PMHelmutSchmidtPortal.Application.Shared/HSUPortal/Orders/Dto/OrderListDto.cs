using System;

namespace PMHelmutSchmidtPortal.HSUPortal.Orders.Dto
{
    public class OrderListDto
    {
        public int OrderId { get; set; }
        public string OrderNumber { get; set; }
        public int ProductNumber { get; set; }
        public string ProductName { get; set; }
        public DateTime OrderDate { get; set; }
    }
}