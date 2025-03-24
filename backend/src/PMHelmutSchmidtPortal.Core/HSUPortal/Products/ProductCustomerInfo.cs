using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using PMHelmutSchmidtPortal.HSUPortal.ShopOrders;

namespace PMHelmutSchmidtPortal.HSUPortal.Products;

[Table("PmProductCustomerInfo")]
public class ProductCustomerInfo: FullAuditedEntity
{
    public int ProductId { get; set; }
    public Product Product { get; set; }
    public CustomerInfo CustomerInfo { get; set; }
    public int? CustomerInfoId { get; set; }
}