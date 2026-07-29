using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.BackgroundJobs;
using Abp.Linq.Extensions;
using Abp.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using PMHelmutSchmidtPortal.Authorization;
using PMHelmutSchmidtPortal.Authorization.Roles;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUsers;
using PMHelmutSchmidtPortal.HSUPortal.Extensions;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto;
using PMHelmutSchmidtPortal.HSUPortal.Products.Jobs;
using PMHelmutSchmidtPortal.HSUPortal.Users;

namespace PMHelmutSchmidtPortal.HSUPortal.Products;

public class ProductManager : HSUDomainBaseService, IProductManager
{
    private readonly IProductRepository _productRepository;
    private readonly PermissionChecker _permissionChecker;
    private readonly IProductEmailer _productEmailer;
    private readonly IBackgroundJobManager _backgroundJobManager;
    private readonly UserManagerExtended _userManager;
    private readonly IProductProducerRepository _productProducerRepository;
    private readonly IProductionDetailsRepository _productionDetailsRepository;

    public ProductManager(
        IProductRepository productRepository,
        PermissionChecker permissionChecker,
        IProductEmailer productEmailer,
        IBackgroundJobManager backgroundJobManager,
        UserManagerExtended userManager,
        IProductProducerRepository productProducerRepository,
        IProductionDetailsRepository productionDetailsRepository
    )
    {
        _productRepository = productRepository;
        _permissionChecker = permissionChecker;
        _productEmailer = productEmailer;
        _backgroundJobManager = backgroundJobManager;
        _userManager = userManager;
        _productProducerRepository = productProducerRepository;
        _productionDetailsRepository = productionDetailsRepository;
    }

    public async Task<PagedResultDto<ProductListDto>> GetProducts(ProductInputDto input, long currentUserId, CancellationToken cancellationToken)
    {
        IQueryable<Product> query = _productRepository.GetAllFiltered(input.Filter, input.State);

        query = FilterByPermission(query, currentUserId);
        int totalCount = await query.CountAsync(cancellationToken);

        List<Product> products = await query.OrderBy(input.Sorting).PageBy(input)
            .ToListAsync(cancellationToken);

        return new PagedResultDto<ProductListDto>(totalCount, ObjectMapper.Map<List<ProductListDto>>(products));
    }

    public IIncludableQueryable<Product, User> GetProduct(int id)
    {
        return _productRepository.GetProduct(id).IncludeDeveloper();
    }

    public async Task<IQueryable<Product>> GetProductForUser(int productId, User currentUser)
    {
        IQueryable<Product> query = GetProduct(productId);
        
        if (await _userManager.IsInRoleAsync(currentUser, StaticRoleNames.Host.Developer))
        {
            query = query.GetForCurrentDeveloper(currentUser.Id);
        }

        if (await _userManager.IsInRoleAsync(currentUser, StaticRoleNames.Host.Producer))
        {
            query = query.GetForCurrentProducer(currentUser.Id);
        }

        return query;
    }

    public async Task<IQueryable<Product>> GetProductForProductionSteps(int productId, User currentUser)
    {
        return (await GetProductForUser(productId, currentUser))
            .IncludeProductMeasurements()
            .IncludeWorkPiecesWithConnections();
    }

    public async Task<ProductListDto> CreateOrUpdateBaseProduct(CreateOrUpdateBaseProductInput input, User developer)
    {
        Product product = await _productRepository.GetProductForCreateOrUpdate(input.ProductId);

        product.Name = input.Name;
        product.DescriptionForDev = input.DescriptionForDev;
        product.State = input.State ?? ProductState.Draft;
        product.AssignedDeveloper = developer;

        await _productRepository.InsertOrUpdateAndGetIdAsync(product);
        await CurrentUnitOfWork.SaveChangesAsync();

        if (product.State == ProductState.InProcessDeveloper)
        {
            await _productEmailer.SendNewProductNotificationToDeveloper(developer, product);
        }

        return ObjectMapper.Map<ProductListDto>(product);
    }

    public async Task UpdateProcessingDeadline(ProcessingDeadlineInput input)
    {

        ProductionDetails productionDetails = await _productionDetailsRepository
            .GetAll()
            .Where(details => details.Id == input.ProductionDetailsId && details.ProductId == input.ProductId)
            .Include(details => details.Product)
            .Include(details => details.AssignedProducers)
            .ThenInclude(producer => producer.AssignedProducer.UserAddress)
            .SingleAsync();
        
        CheckProductExists(productionDetails.Product, input.ProductId);
        
        if (productionDetails.ProcessingDeadline == input.ProcessingDeadLine)
        {
            return;
        }

        productionDetails.ProcessingDeadline = input.ProcessingDeadLine;
   
        await _backgroundJobManager.EnqueueAsync<SendDeadlineChangeJob, ProductProducersEmailArgs>(
            new ProductProducersEmailArgs
            {
                Producers = ObjectMapper.Map<List<ProfileBase>>(productionDetails.AssignedProducers
                    .Where(pp => pp.AssignmentStatus != ProducerAssignmentStatus.Rejected)
                    .Select(pp => pp.AssignedProducer)),
                Product = ObjectMapper.Map<ProductListDto>(productionDetails.Product)
            });
    }

    public async Task AssignProducersToProduct(ProductProducersRequestDto input)
    {
        ProductionDetails productionDetails = await _productionDetailsRepository
            .GetAll()
            .Where(details => details.Id == input.ProductionDetailsId && details.ProductId == input.ProductId)
            .Include(details => details.Product)
            .ThenInclude(product => product.AssignedDeveloper)
            .Include(details => details.AssignedProducers)
            .SingleAsync();
        
        CheckProductExists(productionDetails.Product, input.ProductId);

        List<User> producers = await _userManager.GetProducersByIds(input.ProducersId).ToListAsync();

        List<ProductProducer> producersToAssign = producers
            .Select(producer => productionDetails.AssignedProducers
                .SingleOrDefault(pp => pp.AssignedProducerId == producer.Id) ?? new ProductProducer { AssignedProducer = producer })
            .Where(productProducer => productProducer.Id == 0 || productProducer.AssignmentStatus == ProducerAssignmentStatus.Rejected)
            .ToList();

        foreach (ProductProducer productProducer in producersToAssign)
        {
            productProducer.AssignmentStatus = ProducerAssignmentStatus.Requested;

            if (productProducer.Id == 0)
            {
                productionDetails.AssignedProducers.Add(productProducer);
            }
        }

        if (productionDetails.ProductionDetailsType != ProductionDetailsType.Edit)
        {
            productionDetails.Product.State = ProductState.InProcessProducer;
        }
        
        await CurrentUnitOfWork.SaveChangesAsync();

        await _backgroundJobManager.EnqueueAsync<SendProductProducerRequestJob, ProductProducersEmailArgs>(
            new ProductProducersEmailArgs
            {
                Producers = ObjectMapper.Map<List<ProfileBase>>(producersToAssign.Select(pp => pp.AssignedProducer)),
                Product = ObjectMapper.Map<ProductListDto>(productionDetails.Product)
            });
    }

    public void CheckProductExists(Product product, int productId)
    {
        if (product == null)
        {
            throw new UserFriendlyException(
                L("Error.Product.ProductNotFound.Title"),
                L("Error.Product.ProductNotFound.Text", productId));
        }
    }

    public async Task<ProducerAssignmentStatus> AcceptOrRejectProduction(ProducersAcceptOrRejectInput input, User user)
    {
           ProductProducer productProducer = await GetProductProducer(input.ProductionDetailsId, user.Id);
            
           if (productProducer.AssignmentStatus != ProducerAssignmentStatus.Requested)
           {
               return productProducer.AssignmentStatus;
           }

           if (input.AssignmentAccepted)
           {
               productProducer.AssignmentStatus = ProducerAssignmentStatus.Accepted;
               return productProducer.AssignmentStatus;
           }

           await _productProducerRepository.DeleteAsync(productProducer);
           return ProducerAssignmentStatus.Rejected;
    }

    public async Task<ProducerAssignmentStatus> GetProducersAssignmentStatus(int productionDetailsId, long currentProducerId)
    {
        return (await GetProductProducer(productionDetailsId, currentProducerId)).AssignmentStatus;
    }

    private IQueryable<Product> FilterByPermission(IQueryable<Product> query, long userId)
    {
        if (_permissionChecker.IsGranted(userId, AppPermissions.Hsu_Product_Overview_Admin))
        {
            return query;
        }

        if (_permissionChecker.IsGranted(userId, AppPermissions.Hsu_Product_Overview_Producer))
        {
            return query.GetForCurrentProducer(userId);
        }

        if (_permissionChecker.IsGranted(userId, AppPermissions.Hsu_Product_Overview_Developer))
        {
            return query.Where(
                item => item.AssignedDeveloper.Id == userId && item.State != ProductState.Draft);
        }

        //If role check failed show only created by the current user
        return query.Where(item => item.CreatorUserId == userId);
    }

    public async Task<List<ProducerProductInvolvementDto>> GetProducerProductInvolvements(long producerId)
    {
        return await _productRepository.GetAll()
            .GetForCurrentProducer(producerId)
            .SelectMany(p => p.ProductionDetails
                .Where(pd => pd.ProductionDetailsType != ProductionDetailsType.Archived)
                .SelectMany(pd => pd.AssignedProducers)
                .Where(pp => pp.AssignedProducerId == producerId && pp.AssignmentStatus != ProducerAssignmentStatus.Rejected)
                .Select(pp => new ProducerProductInvolvementDto
                {
                    ProductNumber = p.ProductNumber,
                    ProductName = p.Name
                })
            ).ToListAsync();
    }

    public async Task<List<DeveloperProductInvolvementDto>> GetDeveloperProductInvolvements(long developerId)
    {
        return await _productRepository.GetProductsForDeveloper(developerId)
            .Select(p => new DeveloperProductInvolvementDto
            {
                ProductNumber = p.ProductNumber,
                ProductName = p.Name
            }).ToListAsync();
    }

    private async Task<ProductProducer> GetProductProducer(int productionDetailsId, long producerId)
    {
        try
        {
            return await _productProducerRepository
                .GetAll()
                .SingleAsync(pp => pp.ProductionDetailsId == productionDetailsId && pp.AssignedProducerId == producerId);
        }
        catch (Exception e)
        {
            throw new UserFriendlyException(
                L("Error.Product.NoProducerAssigned.Title"),
                L("Error.Product.NoProducerAssigned.Text"));
        }
    }
}