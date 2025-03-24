using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using PMHelmutSchmidtPortal.HSUPortal.ProductVariants;
using PMHelmutSchmidtPortal.HSUPortal.Users;

namespace PMHelmutSchmidtPortal.HSUPortal.ShopOrders;

[Table("PmShopOrder")]
public class ShopOrder: FullAuditedEntity
{
    [StringLength(200)]
    public string ShopUuid { get; set; }
    
    [StringLength(200)]
    public string OrderNumber { get; set; }
    public ProductVariant ProductVariant { get; set; }
    public int ProductVariantId { get; set; }
    public RatingType ValueChainParameter { get; set; }
    public int ValueChainParameterId { get; set; }
    public CustomerInfo CustomerInfo { get; set; }
    public DateTime OrderDate { get; set; }
    public OrderStatus Status { get; set; }
    public ICollection<OrderProductionPlan> OrderProductionPlans { get; set; }
    public ICollection<OrderDeliveryDocument> OrderDeliveryDocuments { get; set; }
    
}
