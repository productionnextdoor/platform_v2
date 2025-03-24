using System.Threading.Tasks;
using Abp.Application.Services;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.GeneralInfoStep;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.MaterialGroupStep;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductMeasurementStep;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductDetailsOverview;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductFilesStep;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductVariantStep;

namespace PMHelmutSchmidtPortal.HSUPortal.Products
{
    public interface IProductDetailsAppService : IApplicationService
    {
        Task<ProductDetailsOverviewDto> GetProductDetailsOverview(int productId);

        Task<WizardStepType> GetWizardStep(int productId);
        
        Task<ProductDetailsOverviewDto> GetProductDetailsOverviewByOrderId(int orderId);
        
        Task<GeneralInfoOutputDto> GetProductGeneralInfo(int id);
        
        Task<GeneralInfoOutputDto> CreateOrUpdateGeneralInfo(GeneralInfoInputDto productInput);

        Task<MaterialGroupStepOutput> GetProductMaterialGroups(int productId);

        Task<MaterialGroupStepOutput> CreateOrUpdateProductMaterialsGroups(MaterialGroupStepInput input);

        Task<ProductVariantStepOutputDto> GetProductVariants(int productId);

        Task<ProductVariantStepOutputDto> CreateOrUpdateProductVariants(ProductVariantStepInputDto input);

        Task<ProductMeasurementStepOutput> GetProductMeasurements(int productId);

        Task<ProductMeasurementStepOutput> SaveProductMeasurementPositions(ProductMeasurementStepInput input);

        Task<ProductFilesStepOutput> GetProductFilesInformation(int productId);

        Task<ProductFilesStepOutput> CreateOrUpdateProductFilesInformation(ProductFilesStepInput input);

        Task<ProductListDto> FinalizeForValueChainPlanning(int productId);
    }
}
