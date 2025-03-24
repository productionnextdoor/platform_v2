using System;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUsers;

namespace PMHelmutSchmidtPortal.HSUPortal.Products;

[Table("PmProductProducer")]
public class ProductProducer : FullAuditedEntity
{
    public ProductionDetails ProductionDetails { get; set; }
    
    public int ProductionDetailsId { get; set; }
    public User AssignedProducer { get; set; }
    public long AssignedProducerId { get; set; }
    public ProducerAssignmentStatus AssignmentStatus { get; set; }
}