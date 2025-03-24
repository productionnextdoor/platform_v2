using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto;

namespace PMHelmutSchmidtPortal.HSUPortal.ExtendedUser
{
    public interface IUserExtendedAppService : IApplicationService
    {
        Task<AdminProfileDto> GetCurrentAdminProfile();

        Task<AdminProfileDto> UpdateCurrentAdminProfile(AdminProfileDto input);
        
        Task<List<DeveloperListDto>> GetAllDevelopers();

        Task<PagedResultDto<DeveloperOverviewOutput>> GetDevelopersFiltered(DeveloperOverviewInput input);
        
        Task<FullDeveloperProfileOutput> GetDevelopersProfile(long developerId);

        Task<FullDeveloperProfileOutput> UpdateDeveloperProfile(FullDeveloperProfileInput input);

        Task<DeveloperProfileOutput> GetCurrentDevelopersProfile();

        Task<DeveloperProfileOutput> UpdateCurrentDevelopersProfile(DeveloperProfile input);
        
        Task<PagedResultDto<ProducerOverviewOutput>> GetProducersFiltered(ProducerOverviewInput input);
        
        Task<ProductProducerOutput> GetProductProducers(ProductProducersInputDto input);

        Task<ProducerProfileForEditOutput> GetProducerProfile(long producerId);

        Task<ProducerProfileForEditOutput> UpdateProducerProfile(FullProducerProfileInput input);

        Task<ProducerProfileOutput> GetCurrentProducerProfile();

        Task<ProducerProfileOutput> UpdateCurrentProducerProfile(ProducerProfile input);

        Task DeleteInvitedUser(long userId);
    }
}