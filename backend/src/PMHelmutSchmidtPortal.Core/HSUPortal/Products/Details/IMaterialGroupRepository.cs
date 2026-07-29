using System.Linq;
using Abp.Domain.Repositories;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Details;

public interface IMaterialGroupRepository: IRepository<MaterialGroup, int>
{
    public IQueryable<MaterialGroup> GetMaterialGroupsWithSpecificationsQuery();
}