using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Threading;
using Abp.UI;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.Authorization;
using PMHelmutSchmidtPortal.Authorization.Roles;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.HSUPortal.Products;
using PMHelmutSchmidtPortal.HSUPortal.Products.Details;
using PMHelmutSchmidtPortal.HSUPortal.Users;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ProductionState;
using PMHelmutSchmidtPortal.HSUPortal.ProductionSteps;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning;

public class ProductionStateAppService : HsuBaseAppService, IProductionStateAppService
{
    private readonly IProductionStateRepository _productionStateRepository;
    private readonly IProductionStepRepository _productionStepRepository;
    private readonly ICancellationTokenProvider _cancellationTokenProvider;
    private readonly IProductionDetailsManager _productionDetailsManager;
    private readonly UserManagerExtended _userManager;

    public ProductionStateAppService(
        IProductionStateRepository productionStateRepository,
        IProductionStepRepository productionStepRepository,
        ICancellationTokenProvider cancellationTokenProvider,
        IProductionDetailsManager productionDetailsManager,
        UserManagerExtended userManager)
    {
        _productionStateRepository = productionStateRepository;
        _productionStepRepository = productionStepRepository;
        _cancellationTokenProvider = cancellationTokenProvider;
        _productionDetailsManager = productionDetailsManager;
        _userManager = userManager;
    }

    [AbpAuthorize(AppPermissions.Hsu_ValueChainPlanning_States_Create, AppPermissions.Hsu_ValueChainPlanning_States_Update)]
    public async Task<StateLockStatusDto> GetStateLockStatus(StateLockStatusInput input)
    {
        User currentUser = await GetCurrentUserAsync();
        await ValidateProductionDetails(input.ProductionDetailsId, currentUser);
        
        ProductionState productionState = await GetPreviousState(input);

        if (!productionState.LockTime.HasValue ||
            DateTime.Compare(productionState.LockTime.Value, DateTime.Now) < 0)
        {
            productionState.LockedByUserId = currentUser.Id;
            productionState.LockTime = DateTime.Now.AddMinutes(PMHelmutSchmidtPortalConsts.ProductionStateLockDuration);
        }

        if (productionState.LockTime == null || productionState.LockedByUserId == 0)
        {
            throw new UserFriendlyException(StatusCodes.Status500InternalServerError, L("Error.GeneralError"));
        }

        return new StateLockStatusDto
        {
            IsUnlocked = productionState.LockedByUserId == currentUser.Id,
            CanDelete = CanBeDeleted(productionState),
            StateLockTime = productionState.LockTime.Value
        };
    }


    [AbpAuthorize(AppPermissions.Hsu_ValueChainPlanning_States_Create, AppPermissions.Hsu_ValueChainPlanning_States_Update)]
    public async Task<StateLockStatusDto> ResetStateLockStatus(StateLockStatusInput input)
    {
        User currentUser = await GetCurrentUserAsync();
        await ValidateProductionDetails(input.ProductionDetailsId,currentUser);
        
        ProductionState productionState = await GetPreviousState(input);

        if (productionState.LockedByUserId != currentUser.Id ||
            !productionState.LockTime.HasValue ||
            DateTime.Compare(productionState.LockTime.Value, DateTime.Now) <= 0)
        {
            throw new UserFriendlyException(L("Error.ValueChainPlanning.States.Reset.Title"), L("Error.ValueChainPlanning.States.Reset.Text"));
        }

        productionState.LockTime = DateTime.Now.AddMinutes(PMHelmutSchmidtPortalConsts.ProductionStateLockDuration);
        return new StateLockStatusDto
        {
            IsUnlocked = true,
            CanDelete = CanBeDeleted(productionState),
            StateLockTime = productionState.LockTime.Value
        };
    }

    [AbpAuthorize(AppPermissions.Hsu_ValueChainPlanning_States_Create, AppPermissions.Hsu_ValueChainPlanning_States_Update)]
    public async Task CancelStateLock(StateLockStatusInput input)
    {
        User currentUser = await GetCurrentUserAsync();
        await ValidateProductionDetails(input.ProductionDetailsId,currentUser);
        
        ProductionState productionState = await GetPreviousState(input);
        if (productionState.LockedByUserId == currentUser.Id)
        {
            productionState.LockedByUserId = null;
            productionState.LockTime = null;
        }
    }

    [AbpAuthorize(AppPermissions.Hsu_ValueChainPlanning_States_Create)]
    public async Task CreateNewState(ProductionStateCreateInput input)
    {
        User currentUser = await GetCurrentUserAsync();
        await ValidateProductionDetails(input.ProductionDetailsId,currentUser);
        
        ProductionState productionState = await GetPreviousState(input);

        if (productionState.LockedByUserId != currentUser.Id &&
            productionState.LockTime.HasValue &&
            DateTime.Compare(productionState.LockTime.Value, DateTime.Now) > 0)
        {
            throw new UserFriendlyException(L("Error.ValueChainPlanning.States.Locked.Title"), L("Error.ValueChainPlanning.States.Locked.Text"));
        }

        int newProductionStateId = await _productionStateRepository.InsertAndGetIdAsync(new ProductionState
        {
            Description = input.Description,
            NextStateId = productionState.NextStateId,
            WorkPieceId = productionState.WorkPieceId,
            ProductionDetailsId = productionState.ProductionDetailsId,
            StateType = ProductionStateType.WorkPieceIntermediate
        });

        productionState.NextStateId = newProductionStateId;
        productionState.LockedByUser = null;
        productionState.LockTime = null;
    }

    [AbpAuthorize(AppPermissions.Hsu_ValueChainPlanning_States_Update)]
    public async Task EditState(DeleteOrEditStateInput input)
    {
        ProductionState productionState = await GetState(input.ProductionDetailsId, input.StateId);
        productionState.Description = input.Description;
        productionState.LockedByUser = null;
        productionState.LockTime = null;
    }

    [AbpAuthorize(AppPermissions.Hsu_ValueChainPlanning_States_Delete)]
    public async Task DeleteState(DeleteOrEditStateInput input)
    {
        ProductionState productionState = await GetState(input.ProductionDetailsId, input.StateId);

        if (!CanBeDeleted(productionState))
        {
            throw new UserFriendlyException(L("Error.ValueChainPlanning.States.CantDelete.Title"),
                L("Error.ValueChainPlanning.States.CantDelete.Text"));
        }

        ProductionState previousState = _productionStateRepository
            .GetAll()
            .Single(ps => ps.NextStateId == productionState.Id);

        previousState.NextStateId = productionState.NextStateId;
        productionState.NextStateId = null;
        
        await CurrentUnitOfWork.SaveChangesAsync();

        await _productionStateRepository.DeleteAsync(productionState);
    }

    [AbpAuthorize(AppPermissions.Hsu_ValueChainPlanning_States_Create, AppPermissions.Hsu_ValueChainPlanning_States_Update)]
    public async Task<List<string>> GetStateNames(string filter)
    {
        return await _productionStateRepository
            .GetStateNames(filter)
            .ToListAsync(_cancellationTokenProvider.Token);
    }

    private async Task<ProductionState> GetState(int productionDetailsId, int stateId)
    {
        ProductionState productionState = await _productionStateRepository
            .GetAll()
            .SingleAsync(ps => ps.Id == stateId && ps.ProductionDetailsId == productionDetailsId);

        if (productionState.StateType is ProductionStateType.ProductFinal or ProductionStateType.WorkPieceFinal)
        {
            throw new UserFriendlyException(L("Error.ValueChainPlanning.States.CantAdd.Title"), L("Error.ValueChainPlanning.States.CantAdd.Text"));
        }

        return productionState;
    }

    private async Task<ProductionState> GetPreviousState(StateLockStatusInput input)
    {
        ProductionState productionState = await GetState(input.ProductionDetailsId, input.PreviousStateId);

        if (productionState.NextStateId != input.NextStateId)
        {
            throw new UserFriendlyException(L("Error.ValueChainPlanning.States.Changed.Title"), L("Error.ValueChainPlanning.States.Changed.Text"));
        }

        return productionState;
    }

    private bool CanBeDeleted(ProductionState productionState)
    {
        if (productionState.StateType != ProductionStateType.WorkPieceIntermediate)
        {
            return false;
        }
        
        return  _productionStepRepository
            .GetAll()
            .Include(ps => ps.StartState)
            .Include(ps => ps.EndState)
            .All(ps => ps.StartState != productionState && ps.EndState != productionState);
        
    }

    private async Task ValidateProductionDetails(int productionDetailsId, User currentUser)
    {
        ProductionDetails productionDetails = await (await _productionDetailsManager
            .GetForUser(productionDetailsId, currentUser))
            .Include(details => details.Product)
            .SingleOrDefaultAsync();

        if (productionDetails.Product.State == ProductState.Live && productionDetails.ProductionDetailsType != ProductionDetailsType.Edit )
        {
            throw new UserFriendlyException("Can't edit live product");
        }
        
        if (await _userManager.IsInRoleAsync(currentUser, StaticRoleNames.Host.PlatformAdmin) || 
            await _userManager.IsInRoleAsync(currentUser, StaticRoleNames.Host.Admin))
        {
            return;
        }
        
        if (productionDetails.ProcessingDeadline <= DateTime.Today)
        {
            throw new UserFriendlyException(
                L("Error.ValueChainPlanning.WrongDate.Title"),
                L("Error.ValueChainPlanning.WrongDate.Text"));
        }
    }
}