using System.Linq;
using Abp.Domain.Repositories;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Details;

public interface IWorkPieceRepository:IRepository<WorkPiece, int>
{
    IQueryable<WorkPiece> GetProductWorkpieces(int productId);

    IQueryable<WorkPiece> GetProductWorkpiecesWithProductionStates(int productId);

    IQueryable<WorkPiece> GetProductWorkpiecesWithProductionStatesAndVariants(int productId);

    IQueryable<WorkPiece> GetProductWorkpiecesWithMaterials(int productId);
    
    void RemoveWorkPiecesByProduct(int productId);
}