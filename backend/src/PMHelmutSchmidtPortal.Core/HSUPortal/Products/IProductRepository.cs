using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using PMHelmutSchmidtPortal.Authorization.Users;
using System.Threading.Tasks;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUsers;

namespace PMHelmutSchmidtPortal.HSUPortal.Products;

public interface IProductRepository: IRepository<Product, int> {
    IQueryable<Product> GetAllFiltered(string filter, ProductState? productState);
    IQueryable<Product> GetProduct(int id);
    Task<Product> GetProductForCreateOrUpdate(int? id);
    IQueryable<DeveloperProductCount> GetProductsPerDevelopersCount(IReadOnlyCollection<User> developers);
    IQueryable<Product> GetProductsForDeveloper(long developerId);
    Task<int> GetProducerProductCount(long producerId);
}