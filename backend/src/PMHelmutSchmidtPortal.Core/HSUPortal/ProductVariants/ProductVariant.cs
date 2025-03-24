using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using PMHelmutSchmidtPortal.HSUPortal.ProductCosts;
using PMHelmutSchmidtPortal.HSUPortal.Products;
using PMHelmutSchmidtPortal.HSUPortal.Products.Details;

namespace PMHelmutSchmidtPortal.HSUPortal.ProductVariants;

[Table("PmProductVariant")]
public class ProductVariant: FullAuditedEntity
{
    public Product Product { get; set; }
    public int ProductId { get; set; }
    
    public ProductionDetails ProductionDetails { get; set; }
    
    public int ProductionDetailsId { get; set; }
    
    public ProductMeasurement ProductMeasurement { get; set; }
    public int ProductMeasurementId { get; set; }
    public ICollection<ProductOption> ProductOptions { get; set; }
    public decimal WorkCost { get; set; }
    public decimal AdditonalCost { get; set; }
    public decimal TransportAndAssemblyCost { get; set; }
    public decimal MaterialCost { get; set; }
    public decimal Cost { get; set; }
    public decimal Price { get; set; }
    public TaxesAndRoyalties Tax { get; set; }
    public int TaxId { get; set; }
    public TaxesAndRoyalties DeveloperRoyalty { get; set; }
    public int DeveloperRoyaltyId { get; set; }
    public TaxesAndRoyalties PlatformRoyalty { get; set; }
    public int PlatformRoyaltyId { get; set; }
    
    public ICollection<VariantProductionPlanActionCost> VariantActionCost { get; set; }
}