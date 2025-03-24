using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using PMHelmutSchmidtPortal.Authorization.Users;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Details;

[Table("PmProductionState")]
public class ProductionState : FullAuditedEntity
{
    [StringLength(200)] public string Description { get; set; }
    public ProductionState NextState { get; set; }
    public int? NextStateId { get; set; }
    public WorkPiece WorkPiece { get; set; }
    public int? WorkPieceId { get; set; }
    public ProductionDetails ProductionDetails { get; set; }
    public int ProductionDetailsId { get; set; }
    public ProductionStateType StateType { get; set; }
    public User LockedByUser { get; set; }
    public long? LockedByUserId { get; set; }
    public DateTime? LockTime { get; set; }
}