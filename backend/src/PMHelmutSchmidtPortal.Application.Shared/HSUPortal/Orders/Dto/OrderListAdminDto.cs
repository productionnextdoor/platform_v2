using System;
using PMHelmutSchmidtPortal.HSUPortal.ShopOrders;

namespace PMHelmutSchmidtPortal.HSUPortal.Orders.Dto
{
    public class OrderListAdminDto:OrderListDto
    {
        public OrderStatus Status { get; set; }
    }
}