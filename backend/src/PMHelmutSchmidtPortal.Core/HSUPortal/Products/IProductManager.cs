using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Domain.Services;
using Microsoft.EntityFrameworkCore.Query;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUsers;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto;

namespace PMHelmutSchmidtPortal.HSUPortal.Products;

public interface IProductManager : IDomainService
{
    public Task<PagedResultDto<ProductListDto>> GetProducts(ProductInputDto input, long currentUserId, CancellationToken cancellationToken);

    public IIncludableQueryable<Product, User> GetProduct(int id);
    
    public Task<IQueryable<Product>> GetProductForUser(int productId, User currentUser);
    
    public Task<IQueryable<Product>> GetProductForProductionSteps(int productId, User currentUser);

    public Task<ProductListDto> CreateOrUpdateBaseProduct(CreateOrUpdateBaseProductInput input, User developer);
    
    Task UpdateProcessingDeadline(ProcessingDeadlineInput input);
    
    Task AssignProducersToProduct(ProductProducersRequestDto input);

    void CheckProductExists(Product product, int productId);
    
    Task<ProducerAssignmentStatus> AcceptOrRejectProduction(ProducersAcceptOrRejectInput input, User user);

    Task<ProducerAssignmentStatus> GetProducersAssignmentStatus(int productId, long currentProducerId);

    Task<List<ProducerProductInvolvementDto>> GetProducerProductInvolvements(long producerId);

    Task<List<DeveloperProductInvolvementDto>> GetDeveloperProductInvolvements(long developerId);
}