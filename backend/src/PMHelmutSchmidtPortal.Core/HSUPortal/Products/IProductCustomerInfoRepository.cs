using System.Linq;
using Abp.Domain.Repositories;

namespace PMHelmutSchmidtPortal.HSUPortal.Products;

public interface IProductCustomerInfoRepository: IRepository<ProductCustomerInfo, int>
{
    IQueryable<ProductCustomerInfo> GetByProductId(int id);
}