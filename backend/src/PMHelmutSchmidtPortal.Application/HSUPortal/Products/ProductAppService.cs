using System;
using System.Linq;
using System.Threading.Tasks;
using Abp;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Threading;
using Abp.UI;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.Authorization;
using PMHelmutSchmidtPortal.Authorization.Roles;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUsers;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto;

namespace PMHelmutSchmidtPortal.HSUPortal.Products;

public class ProductAppService : HsuBaseAppService, IProductsAppService
{
    private readonly IProductManager _productManager;
    private readonly ICancellationTokenProvider _cancellationTokenProvider;
    private readonly UserManager _userManager;
    private readonly IProductEditModeManager _editModeManager;
    private readonly IProductionDetailsRepository _productionDetailsRepository;

    public ProductAppService(
        IProductManager productManager,
        ICancellationTokenProvider cancellationTokenProvider,
        UserManager userManager,
        IProductEditModeManager editModeManager,
        IProductionDetailsRepository productionDetailsRepository
    ) {
        _productManager = productManager;
        _cancellationTokenProvider = cancellationTokenProvider;
        _userManager = userManager;
        _editModeManager = editModeManager;
        _productionDetailsRepository = productionDetailsRepository;
    }

    [AbpAuthorize(
        AppPermissions.Hsu_Product_Overview_Developer,
        AppPermissions.Hsu_Product_Overview_Admin,
        AppPermissions.Hsu_Product_Overview_Producer
        )]
    public async Task<PagedResultDto<ProductListDto>> GetProducts(ProductInputDto input)
    {
        User currentUser = await GetCurrentUserAsync();
        
        return await CheckAndThrowIfCanceled(
            () => _productManager.GetProducts(input, currentUser.Id, _cancellationTokenProvider.Token)
        );
    }
    
    [AbpAuthorize(AppPermissions.Hsu_Product_Base_Get)]
    public async Task<ProductListDto> GetBaseProduct(int productId)
    {
        Product product = await _productManager.GetProduct(productId).SingleOrDefaultAsync();
        if (product== null)
        {
            throw new UserFriendlyException(
                L("Error.Product.ProductNotFound.Title"), 
                L("Error.Product.ProductNotFound.Text", productId));
        }
        return ObjectMapper.Map<ProductListDto>(product);
    }

    [AbpAuthorize(AppPermissions.Hsu_Product_Base_CreateOrUpdate)]
    public async Task<ProductListDto> CreateOrUpdateBaseProduct(CreateOrUpdateBaseProductInput baseProductInput)
    {
        try
        {
            User developer = await _userManager.GetUserByIdAsync(baseProductInput.DeveloperId);
            
            if (!developer.IsActive || !await _userManager.IsInRoleAsync(developer, StaticRoleNames.Host.Developer))
            {
                throw new UserFriendlyException(
                    L("Error.Product.NoDeveloperSelected.Title"), 
                    L("Error.Product.NoDeveloperSelected.Text"));
            }
            return  await _productManager.CreateOrUpdateBaseProduct(baseProductInput, developer);
        }
        catch (AbpException e)
        {
            throw new UserFriendlyException(L("Error.GeneralError") , e.Message);
        }
    }

    [AbpAuthorize(AppPermissions.Hsu_Product_Base_UpdateProcessingDeadline)]
    public async Task UpdateProcessingDeadline(ProcessingDeadlineInput input)
    {
        ValidateProcessingDeadline(input.ProcessingDeadLine);
        
        await _productManager.UpdateProcessingDeadline(input);
    }


    [AbpAuthorize(AppPermissions.Hsu_Product_Base_AssignProducer)]
    public async Task RequestProducerForProduct(ProductProducersRequestDto input)
    {
        ValidateProcessingDeadline(input.ProcessingDeadLine);
        await _productManager.AssignProducersToProduct(input);
    }

    [AbpAuthorize(AppPermissions.Hsu_Product_Base_GetProductAssigmentStatus)]
    public async Task<ProducerAssignmentStatusDto> GetAssignmentStatusForCurrentProducer(int productionDetailsId)
    {
        User currentProducer = await GetCurrentUserAsync();
        if (!(await _userManager.IsInRoleAsync(currentProducer, StaticRoleNames.Host.Producer)))
        {
            throw new UserFriendlyException(
                L("Error.User.NotARoleName.Title", L($"RoleName.{StaticRoleNames.Host.Producer}")),
                L($"Error.User.NotARoleName.Text", L($"RoleName.{StaticRoleNames.Host.Producer}")));
        }

        ProductionDetails productionDetails = await _productionDetailsRepository
            .GetAll()
            .Where(details => details.Id == productionDetailsId)
            .Where(details => details.AssignedProducers.Any(producer => producer.AssignedProducerId == currentProducer.Id))
            .Include(details => details.AssignedProducers)
            .SingleAsync();
        
        return new ProducerAssignmentStatusDto
        {
            AssignmentStatus = productionDetails.AssignedProducers.Single(ap =>ap.AssignedProducerId == currentProducer.Id).AssignmentStatus,
            Deadline = productionDetails.ProcessingDeadline
        };
    }

    [AbpAuthorize(AppPermissions.Hsu_Product_Base_AcceptOrRejectProductionRequest)]
    public async Task<ProducerAssignmentStatus> AcceptOrRejectProductionRequest(ProducersAcceptOrRejectInput input)
    {
        return await _productManager.AcceptOrRejectProduction(input, await GetCurrentUserAsync());
    }

    [AbpAuthorize(AppPermissions.Hsu_Product_Base_EditMode)]
    public async Task<int> EnableEditMode(int productId)
    {
        return await _editModeManager.EnableEditMode(productId);
    }
    
    [AbpAuthorize(AppPermissions.Hsu_Product_Base_EditMode)]
    public async Task CancelEditMode(int productId)
    {
        await _editModeManager.CancelEditMode(productId);
    }
    
    [AbpAuthorize(AppPermissions.Hsu_Product_Base_EditMode)]
    public async Task FinalizeEditMode(int productId)
    {
        await _editModeManager.FinalizeEditMode(productId);
    }
    

    private void ValidateProcessingDeadline(DateTime processingDeadLine)
    {
        if (processingDeadLine <= DateTime.Today)
        {
            throw new UserFriendlyException(
                L("Error.ProcessingDeadLine.WrongDate"), 
                L("Error.ProcessingDeadLine.WrongDate"));
        }
    }
}