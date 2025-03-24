using System.Threading.Tasks;
using Abp.Domain.Services;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductVariantStep;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Details;

public interface IProductVariantManager: IDomainService
{
     Task<ProductVariantStepOutputDto> GetProductVariantsStep(Product product);

     Task<ProductVariantStepOutputDto> CreateOrUpdateProductVariantsStep(Product product, ProductVariantStepInputDto input);
}