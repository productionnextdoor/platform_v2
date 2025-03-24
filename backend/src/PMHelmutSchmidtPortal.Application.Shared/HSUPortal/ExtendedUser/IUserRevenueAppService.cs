using System.Threading.Tasks;
using Abp.Application.Services;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto;

namespace PMHelmutSchmidtPortal.HSUPortal.ExtendedUser
{
    public interface IUserRevenueAppService: IApplicationService
    {
        Task<DeveloperRevenueDto> GetDeveloperRevenueInfo(int productId);
    }
}