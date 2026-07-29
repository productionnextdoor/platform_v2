using System;
using PMHelmutSchmidtPortal.HSUPortal.ShopOrders;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning;

namespace PMHelmutSchmidtPortal.HSUPortal.Orders.Dto
{
    public class OrderListProducerDto:OrderListDto
    {
        public ActionStatus Status { get; set; }
    }
}