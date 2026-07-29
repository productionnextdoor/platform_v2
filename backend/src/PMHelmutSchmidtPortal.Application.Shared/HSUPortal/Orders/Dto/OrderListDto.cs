using System;
using PMHelmutSchmidtPortal.HSUPortal.ShopOrders;

namespace PMHelmutSchmidtPortal.HSUPortal.Orders.Dto
{
    public class OrderListDto
    {
        public int OrderId { get; set; }
        public int OrderNumber { get; set; }
        public int ProductNumber { get; set; }
        public string ProductName { get; set; }
        public DateTime OrderDate { get; set; }
    }
}