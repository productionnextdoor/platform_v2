using System.Threading.Tasks;
using Abp.Domain.Services;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.GeneralInfoStep;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.MaterialGroupStep;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductDetailsOverview;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductFilesStep;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductVariantStep;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Details;

public interface IProductDetailsManager : IDomainService
{
    Task<ProductDetailsOverviewDto> GetProductDetailsOverview(int productId, User currentUser);
    
    Task<GeneralInfoOutputDto> GetProductGeneralInfo(Product product);

    Task<GeneralInfoOutputDto> CreateOrUpdateGeneralInfo(Product product, GeneralInfoInputDto input);

    Task<MaterialGroupStepOutput> GetProductMaterialsStage(Product product);

    Task<MaterialGroupStepOutput> CreateOrUpdateMaterialsStage(Product product, MaterialGroupStepInput input);

    Task<ProductVariantStepOutputDto> GetProductVariantsStep(Product product);

    Task<ProductVariantStepOutputDto> CreateOrUpdateProductVariantsStep(Product product, ProductVariantStepInputDto input);

    Task<ProductFilesStepOutput> GetProductFilesStep(Product product);

    Task<ProductFilesStepOutput> CreateOrUpdateProductFilesStep(Product product, ProductFilesStepInput input);

    Task<ProductListDto> ValidateAndFinalizeForValueChainPlanning(Product product);
}