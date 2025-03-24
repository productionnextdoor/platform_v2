using System.Collections.Generic;
using Abp.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using PMHelmutSchmidtPortal.EntityFrameworkCore;
using PMHelmutSchmidtPortal.EntityFrameworkCore.Repositories;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Details;

public class MaterialGroupRepository : PmHelmutSchmidtPortalRepositoryBase<MaterialGroup, int>, IMaterialGroupRepository
{
    public MaterialGroupRepository(IDbContextProvider<PMHelmutSchmidtPortalDbContext> dbContextProvider)
        : base(dbContextProvider)
    {
    }
    
    public IIncludableQueryable<MaterialGroup, ICollection<SurfaceFinish>> GetMaterialGroupsWithSurfaceFinishesQuery()
    {
        return GetAll().Include(m => m.SurfaceFinishes);
    }
}