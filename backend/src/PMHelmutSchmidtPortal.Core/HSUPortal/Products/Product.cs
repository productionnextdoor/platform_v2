using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using Abp.Extensions;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.HSUPortal.Products.Details;

namespace PMHelmutSchmidtPortal.HSUPortal.Products;

[Table("PmProducts")]
public class Product : FullAuditedEntity
{
    public int ProductNumber { get; set; }
    
    [StringLength(200)]
    public string Name { get; set; }
    
    [StringLength(2000)]
    public string DescriptionForDev { get; set; }
    
    [StringLength(2000)]
    public string DescriptionFromDev { get; set; }
    
    [StringLength(1000)]
    public string SharePointLink { get; set; }
    
    public long AssignedDeveloperId { get; set; }
    
    public User AssignedDeveloper { get; set; }
    
    public ProductState State { get; set; }
    
    public ICollection<ProductMeasurement> ProductMeasurements {get; set;}
    
    public ICollection<WorkPiece> WorkPieces {get; set;}
    
    public ICollection<ProductFile> ProductFiles {get; set;}
    
    public ICollection<ProductionDetails> ProductionDetails { get; set; }
    
    [StringLength(100)]
    public string CodeForPlanner { get; set; }
    
    public void SetCodeForPlanner()
    {
        CodeForPlanner = Guid.NewGuid().ToString("N").Truncate(10).ToUpperInvariant();
    }
}