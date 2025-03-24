using System.Threading.Tasks;
using Abp.Authorization;
using PMHelmutSchmidtPortal.Authorization;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto;

namespace PMHelmutSchmidtPortal.HSUPortal.ExtendedUser;

public class UserRevenueAppService: HsuBaseAppService, IUserRevenueAppService
{
    private readonly IUserRevenueManager _userRevenueManager;
    
    public UserRevenueAppService(IUserRevenueManager userRevenueManager)
    {
        _userRevenueManager = userRevenueManager;
    }
    
    [AbpAuthorize(AppPermissions.Hsu_Product_Details_Developer_ProductRevenueInfo)]
    public async Task<DeveloperRevenueDto> GetDeveloperRevenueInfo(int productId)
    {
        User currentUser = await GetCurrentUserAsync();
        return await _userRevenueManager.GetDeveloperRevenueInfo(currentUser.Id, productId);
    }
}