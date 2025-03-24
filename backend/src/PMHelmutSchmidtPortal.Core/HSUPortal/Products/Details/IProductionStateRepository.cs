using System.Linq;
using System.Threading.Tasks;
using Abp.Domain.Repositories;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Details;

public interface IProductionStateRepository: IRepository<ProductionState, int>
{
    IQueryable<string> GetStateNames(string filter);
    IQueryable<ProductionState> GetFinalProductState(int productId);
    Task<ProductionState> GetOrCreateFinalProductionStateForProduct(int productProductionDetailsId);
    Task<ProductionState> GetOrCreateProductionStateForWorkPiece(WorkPiece workPiece, ProductionState nextState, ProductionStateType productionStateType);
    void RemoveStatesByProductionDetailsId(int productionDetailsId);
}