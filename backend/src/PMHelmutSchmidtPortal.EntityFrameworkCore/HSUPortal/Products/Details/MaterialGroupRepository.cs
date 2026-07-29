using System.Linq;
using Abp.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.EntityFrameworkCore;
using PMHelmutSchmidtPortal.EntityFrameworkCore.Repositories;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Details;

public class MaterialGroupRepository : PmHelmutSchmidtPortalRepositoryBase<MaterialGroup, int>, IMaterialGroupRepository
{
    public MaterialGroupRepository(IDbContextProvider<PMHelmutSchmidtPortalDbContext> dbContextProvider)
        : base(dbContextProvider)
    {
    }

    public IQueryable<MaterialGroup> GetMaterialGroupsWithSpecificationsQuery()
    {
        return GetAll()
            .Include(m => m.Specifications)
                .ThenInclude(s => s.SpecificationGroup)
            .Include(m => m.SpecificationGroups)
                .ThenInclude(sg => sg.Specifications);
    }
}