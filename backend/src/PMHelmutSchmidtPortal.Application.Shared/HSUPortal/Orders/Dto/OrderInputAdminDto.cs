using System.ComponentModel.DataAnnotations;
using PMHelmutSchmidtPortal.HSUPortal.ShopOrders;

namespace PMHelmutSchmidtPortal.HSUPortal.Orders.Dto
{
    public class OrderInputAdminDto:OrderInputDto
    {
        [EnumDataType(typeof(OrderStatus))] 
        public OrderStatus? Status { get; set; }
    }
}