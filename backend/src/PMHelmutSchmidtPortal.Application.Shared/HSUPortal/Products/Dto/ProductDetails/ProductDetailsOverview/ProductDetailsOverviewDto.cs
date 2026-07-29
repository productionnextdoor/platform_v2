using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductFilesStep;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductVariantStep;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductDetailsOverview
{
    public class ProductDetailsOverviewDto
    {
        public int ProductId { get; set; }
        
        [StringLength(200)]
        public string ProductName { get; set; }
        
        
        public int ProductNumber { get; set; }
        
        [StringLength(2000)]
        public string Description { get; set; }
        
        public ProductState ProductState { get; set; }
        
        public int? PreviewImageId { get; set; }
        
        public DateTime CreatedAt { get; set; }
        
        public DateTime UpdatedAt { get; set; }
        
        public DeveloperListDto Developer { get; set; }
        
        public MeasurementDto DefaultMeasurement { get; set; }
        
        public List<WorkPieceOverview> WorkPieces { get; set; }
        
        public List<MeasurementDto> Measurements { get; set; }
        
        public List<WorkPieceVariantDto> WorkPieceVariants { get; set; }
        
        public string SharePointLink { get; set; }
        
        public List<ProductFileDto> Files { get; set; }
        
        public int ProductionDetailsLiveId { get; set; }
        
        public int? ProductionDetailsEditId { get; set; }
        
    }
}