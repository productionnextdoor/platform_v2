using Abp.Domain.Repositories;

namespace PMHelmutSchmidtPortal.HSUPortal.Products;

public interface IProductProducerRepository:IRepository<ProductProducer, int>
{
    void RemoveProductProducersByDetailsId(int productionDetailsId);
}