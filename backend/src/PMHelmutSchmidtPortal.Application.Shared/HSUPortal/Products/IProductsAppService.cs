using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUsers;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto;

namespace PMHelmutSchmidtPortal.HSUPortal.Products
{
    public interface IProductsAppService : IApplicationService
    {
        Task<PagedResultDto<ProductListDto>> GetProducts(ProductInputDto input);
        Task<ProductListDto> GetBaseProduct(int productId);
        Task<ProductListDto> CreateOrUpdateBaseProduct(CreateOrUpdateBaseProductInput baseProductInput);
        Task UpdateProcessingDeadline(ProcessingDeadlineInput input);
        Task RequestProducerForProduct(ProductProducersRequestDto input);
        Task<ProducerAssignmentStatusDto> GetAssignmentStatusForCurrentProducer(int productionDetailsId);
        Task<ProducerAssignmentStatus> AcceptOrRejectProductionRequest(ProducersAcceptOrRejectInput input);
        Task<int> EnableEditMode(int productId);
        Task CancelEditMode(int productId);
        Task<List<ProducerProductInvolvementDto>> GetProducerProductInvolvements(long producerId);
        Task<List<DeveloperProductInvolvementDto>> GetDeveloperProductInvolvements(long developerId);
        Task DeleteProduct(int productId);
    }
}
