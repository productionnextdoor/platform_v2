using System.Collections.Generic;
using System.Linq;
using Abp.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.EntityFrameworkCore;
using PMHelmutSchmidtPortal.EntityFrameworkCore.Repositories;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Details;

public class WorkPieceRepository : PmHelmutSchmidtPortalRepositoryBase<WorkPiece, int>, IWorkPieceRepository
{
    public WorkPieceRepository(IDbContextProvider<PMHelmutSchmidtPortalDbContext> dbContextProvider)
        : base(dbContextProvider)
    {
    }

    public IQueryable<WorkPiece> GetProductWorkpieces(int productId)
    {
        return GetAll()
            .Where(wp => wp.ProductId == productId);
    }
    
    public IQueryable<WorkPiece> GetProductWorkpiecesWithProductionStates(int productId)
    {
        return GetProductWorkpieces(productId).Include(wp => wp.ProductionStates);
    }
    
    public IQueryable<WorkPiece> GetProductWorkpiecesWithProductionStatesAndVariants(int productId)
    {
        return GetProductWorkpiecesWithProductionStates(productId)
            .Include(wp =>wp.WorkPieceVariants);
    }

    public IQueryable<WorkPiece> GetProductWorkpiecesWithMaterials(int productId)
    {
        return GetProductWorkpiecesWithProductionStates(productId).Include(wp => wp.MaterialGroup);
    }
    
    public void RemoveWorkPiecesByProduct(int productId)
    {
        List<WorkPiece> workPiecesList = GetAll()
            .Where(wp => wp.ProductId == productId)
            .Include(wp => wp.WorkPieceVariants)
            .ToList();

        foreach (WorkPiece workPiece in workPiecesList)
        {
            GetDbContext().RemoveRange(workPiece.WorkPieceVariants);
        }
        
        GetDbContext().RemoveRange(workPiecesList);
    }
}