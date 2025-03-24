using System.Threading.Tasks;
using Abp.Domain.Services;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.GeneralInfoStep;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Details;

public interface IGeneralInfoManager: IDomainService
{
    GeneralInfoOutputDto GetProductGeneralInfo(Product product);

    Task<GeneralInfoOutputDto> CreateOrUpdateGeneralInfo(Product product, GeneralInfoInputDto input);

    Task<bool> ValidateGeneralInformation(int  productId);
    
}