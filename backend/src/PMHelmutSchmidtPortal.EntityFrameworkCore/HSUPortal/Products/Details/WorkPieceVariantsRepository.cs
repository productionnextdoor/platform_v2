using System.Linq;
using Abp.EntityFrameworkCore;
using PMHelmutSchmidtPortal.EntityFrameworkCore;
using PMHelmutSchmidtPortal.EntityFrameworkCore.Repositories;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Details;

public class WorkPieceVariantsRepository:PmHelmutSchmidtPortalRepositoryBase<WorkPieceVariant, int>, IWorkPieceVariantsRepository
{
    public WorkPieceVariantsRepository(IDbContextProvider<PMHelmutSchmidtPortalDbContext> dbContextProvider) : base(dbContextProvider)
    {
    }

    public IQueryable<WorkPieceVariant> GetWorkPieceVariants(int productId)
    {
        return GetAll().Where(wpv => wpv.WorkPiece.ProductId == productId);
    }
}