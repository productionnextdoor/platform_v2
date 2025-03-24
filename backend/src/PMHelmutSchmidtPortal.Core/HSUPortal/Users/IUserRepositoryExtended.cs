using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto;

namespace PMHelmutSchmidtPortal.HSUPortal.Users;

public interface IUserRepositoryExtended : IUserRepository
{
    Task<PagedResultDto<ProductProducerListDto>> GetProductProducers(ProductProducersInputDto input, int productionDetailsId);

    Task<IQueryable<User>> GetDevelopersFiltered(DeveloperOverviewInput input, int roleId);
    Task<PagedResultDto<ProducerOverviewOutput>> GetAllProducers(ProducerOverviewInput input);
}