using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using JetBrains.Annotations;
using PMHelmutSchmidtPortal.HSUPortal.Products;

namespace PMHelmutSchmidtPortal.HSUPortal.ShopOrders;

[Table("PmCustomerInfo")]
public class CustomerInfo: FullAuditedEntity
{
    public ShopOrder ShopOrder { get; set; }
    
    public int? ShopOrderId { get; set; }
    
    [StringLength(200)]
    public string Name { get; set; }
    
    [StringLength(200)]
    public string PhoneNumber { get; set; }
    
    [StringLength(200)]
    public string EmailAddress { get; set; }
    
    [StringLength(200)]
    public string Street { get; set; }
    
    [StringLength(200)]
    public string Zip { get; set; }
    
    [StringLength(200)]
    public string City { get; set; }
    
    public ProductCustomerInfo ProductCustomerInfo { get; set; }
    
    public int? ProductCustomerInfoId { get; set; }
}