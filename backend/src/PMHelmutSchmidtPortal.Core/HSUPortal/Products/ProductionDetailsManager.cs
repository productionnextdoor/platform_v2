using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using PMHelmutSchmidtPortal.Authorization.Roles;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.HSUPortal.Users;

namespace PMHelmutSchmidtPortal.HSUPortal.Products;

public class ProductionDetailsManager: HSUDomainBaseService, IProductionDetailsManager
{
    private readonly IProductionDetailsRepository _detailsRepository;
    private readonly UserManagerExtended _userManager;

    public ProductionDetailsManager(IProductionDetailsRepository detailsRepository, UserManagerExtended userManager)
    {
        _detailsRepository = detailsRepository;
        _userManager = userManager;
    }


    public async Task<IQueryable<ProductionDetails>> GetForUser(int productionDetailsId, User currentUser)
    {
        IQueryable<ProductionDetails> query = _detailsRepository.Get(productionDetailsId);

        if (await _userManager.IsInRoleAsync(currentUser, StaticRoleNames.Host.Producer))
        {
            query = query.Where(details => details.AssignedProducers
                .Any(producer => producer.AssignedProducerId == currentUser.Id));
        }

        return query;
    }
}