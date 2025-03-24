using System.Threading.Tasks;
using Abp.Domain.Services;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.MaterialGroupStep;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Details;

public interface IMaterialGroupsStepManager : IDomainService
{
    Task<MaterialGroupStepOutput> GetProductMaterialsStage(Product product);

    Task<MaterialGroupStepOutput> CreateOrUpdateMaterialsStage(Product product, MaterialGroupStepInput input);

    Task<bool> IsWorkPiecesExist(int productId);
}