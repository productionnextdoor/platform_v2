using System.Threading.Tasks;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto;

namespace PMHelmutSchmidtPortal.HSUPortal.ExtendedUser;

public interface IUserRevenueManager
{
    Task<DeveloperRevenueDto> GetDeveloperRevenueInfo(long userId, int productId);
}