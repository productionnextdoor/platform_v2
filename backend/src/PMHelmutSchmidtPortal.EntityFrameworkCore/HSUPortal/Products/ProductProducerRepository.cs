using System.Collections.Generic;
using System.Linq;
using Abp.EntityFrameworkCore;
using PMHelmutSchmidtPortal.EntityFrameworkCore;
using PMHelmutSchmidtPortal.EntityFrameworkCore.Repositories;

namespace PMHelmutSchmidtPortal.HSUPortal.Products;

public class ProductProducerRepository : PmHelmutSchmidtPortalRepositoryBase<ProductProducer, int>, IProductProducerRepository
{
    public ProductProducerRepository(IDbContextProvider<PMHelmutSchmidtPortalDbContext> dbContextProvider) : base(dbContextProvider)
    {
    }

    public void RemoveProductProducersByDetailsId(int productionDetailsId)
    {
        IEnumerable<ProductProducer> productProducers =
            GetAll()
                .Where(pp => pp.ProductionDetailsId == productionDetailsId)
                .AsEnumerable();
        
        GetDbContext().RemoveRange(productProducers);
    }
}