using System.Threading.Tasks;
using Abp.Application.Services;
using PMHelmutSchmidtPortal.Sessions.Dto;

namespace PMHelmutSchmidtPortal.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();

        Task<UpdateUserSignInTokenOutput> UpdateUserSignInToken();
    }
}
