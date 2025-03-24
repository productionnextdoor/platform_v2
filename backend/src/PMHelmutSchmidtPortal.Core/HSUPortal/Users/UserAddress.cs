using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using PMHelmutSchmidtPortal.Authorization.Users;

namespace PMHelmutSchmidtPortal.HSUPortal.Users;

[Table("PmUserAddress")]
public class UserAddress : FullAuditedEntity
{
    public User User { get; set; }
    
    public long UserId { get; set; }
    
    [StringLength(200)]
    public string Name { get; set; }
    
    [StringLength(200)]
    public string Street { get; set; }
    
    [StringLength(20)]
    public string ZipCode { get; set; }
    
    [StringLength(100)]
    public string City { get; set; }
    
    [StringLength(100)]
    public string Region { get; set; }
    
    [StringLength(100)]
    public string Country { get; set; }
    
    [StringLength(2000)]
    public string AdminNote { get; set; }
}