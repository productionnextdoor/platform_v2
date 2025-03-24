using System.Collections.Generic;
using PMHelmutSchmidtPortal.HSUPortal.ShopOrders;

namespace PMHelmutSchmidtPortal.HSUPortal.Orders.Dto.Details
{
    public class AdminOrderDetailsOutput : OrderDetailsBaseOutput
    {
        public string ProductName { get; set; }
        public OrderStatus OrderStatus { get; set; }
        public List<OrderValueChainAdminDto> ValueChains { get; set; }
    }
}