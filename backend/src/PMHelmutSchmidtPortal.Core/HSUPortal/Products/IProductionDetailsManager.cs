using System.Linq;
using System.Threading.Tasks;
using Abp.Domain.Services;
using PMHelmutSchmidtPortal.Authorization.Users;

namespace PMHelmutSchmidtPortal.HSUPortal.Products;

public interface IProductionDetailsManager: IDomainService
{
    IQueryable<ProductionDetails> GetActiveForProduct(int productId);
    Task<IQueryable<ProductionDetails>> GetForUser(int productionDetailsId, User currentUser);
}