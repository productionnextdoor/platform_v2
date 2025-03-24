using System.Linq;
using Abp.Domain.Repositories;

namespace PMHelmutSchmidtPortal.HSUPortal.Products;

public interface IProductionDetailsRepository : IRepository<ProductionDetails, int>
{
    new IQueryable<ProductionDetails> Get(int productionDetailsId);

    IQueryable<ProductionDetails> GetByProduct(int productId);
}