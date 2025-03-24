using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.EntityFrameworkCore;
using PMHelmutSchmidtPortal.EntityFrameworkCore.Repositories;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Details;

public class ProductionStateRepository : PmHelmutSchmidtPortalRepositoryBase<ProductionState, int>, IProductionStateRepository
{
    public ProductionStateRepository(IDbContextProvider<PMHelmutSchmidtPortalDbContext> dbContextProvider)
        : base(dbContextProvider)
    {
    }

    public IQueryable<string> GetStateNames(string filter = "")
    {
        return GetAll()
            .Where(ps => ps.Description.Contains(filter))
            .Select(ps => ps.Description);
    }
    
    public IQueryable<ProductionState> GetFinalProductState(int productId)
    {
        return GetAll()
            .Where(ps => ps.ProductionDetails.ProductId == productId && ps.StateType == ProductionStateType.ProductFinal);
    }

    public async Task<ProductionState> GetOrCreateFinalProductionStateForProduct(int productProductionDetailsId)
    {
        return await GetAll().SingleOrDefaultAsync(ps =>
                   ps.ProductionDetailsId == productProductionDetailsId && ps.StateType == ProductionStateType.ProductFinal
               ) ??
               new ProductionState
               {
                   NextState = null,
                   WorkPiece = null,
                   ProductionDetailsId = productProductionDetailsId,
                   StateType = ProductionStateType.ProductFinal
               };
    }

    public async Task<ProductionState> GetOrCreateProductionStateForWorkPiece(WorkPiece workPiece, ProductionState nextState, ProductionStateType productionStateType)
    {
        return await GetAll()
            .SingleOrDefaultAsync(ps => ps.WorkPiece == workPiece && ps.StateType == productionStateType
            ) ?? new ProductionState()
        {
            NextState = nextState,
            StateType = productionStateType,
            ProductionDetailsId = nextState.ProductionDetailsId,
            WorkPiece = workPiece
        };
    }

    public void RemoveStatesByProductionDetailsId(int productionDetailsId)
    {
        IEnumerable<ProductionState> states =
            GetAll()
                .Where(state => state.ProductionDetailsId == productionDetailsId)
                .AsEnumerable();

        GetDbContext().RemoveRange(states);
    }
}