using System.Collections.Generic;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore.Query;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Details;

public interface IMaterialGroupRepository: IRepository<MaterialGroup, int>
{
    public IIncludableQueryable<MaterialGroup, ICollection<SurfaceFinish>> GetMaterialGroupsWithSurfaceFinishesQuery();
}