using System.Linq;
using Abp.Domain.Repositories;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Details;

public interface IWorkPieceVariantsRepository:IRepository<WorkPieceVariant, int>
{
    IQueryable<WorkPieceVariant> GetWorkPieceVariants(int productId);
}