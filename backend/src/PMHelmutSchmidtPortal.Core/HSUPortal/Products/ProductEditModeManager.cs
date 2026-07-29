using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using Abp.UI;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.HSUPortal.Extensions;
using PMHelmutSchmidtPortal.HSUPortal.ProductCosts;
using PMHelmutSchmidtPortal.HSUPortal.ProductionSteps;
using PMHelmutSchmidtPortal.HSUPortal.Products.Details;
using PMHelmutSchmidtPortal.HSUPortal.ShopImportExport;

namespace PMHelmutSchmidtPortal.HSUPortal.Products;

public class ProductEditModeManager : HSUDomainBaseService, IProductEditModeManager
{
    private readonly IProductRepository _productRepository;
    private readonly IProductionDetailsRepository _productionDetailsRepository;
    private readonly IProductProducerRepository _productProducerRepository;
    private readonly IProductionStateRepository _productionStateRepository;
    private readonly IProductionStepRepository _productionStepRepository;
    private readonly IProductCostManager _productCostManager;
    private readonly IProductExportManager _productExportManager;

    public ProductEditModeManager(
        IProductRepository productRepository,
        IProductionDetailsRepository productionDetailsRepository,
        IProductProducerRepository productProducerRepository,
        IProductionStateRepository productionStateRepository,
        IProductionStepRepository productionStepRepository,
        IProductCostManager productCostManager,
        IProductExportManager productExportManager)
    {
        _productRepository = productRepository;
        _productionDetailsRepository = productionDetailsRepository;
        _productProducerRepository = productProducerRepository;
        _productionStateRepository = productionStateRepository;
        _productionStepRepository = productionStepRepository;
        _productCostManager = productCostManager;
        _productExportManager = productExportManager;
    }

    public async Task<int> EnableEditMode(int productId)
    {
        ProductState productState = await _productRepository.GetProduct(productId)
            .Select(product => product.State)
            .SingleOrDefaultAsync();

        if (productState != ProductState.Live)
        {
            throw new UserFriendlyException("Edit mode can be enabled only on live products");
        }

        ProductionDetails productionDetailsEdit = new()
        {
            ProductId = productId,
            ProductionDetailsType = ProductionDetailsType.Edit
        };

        int productionDetailsLiveId = await _productionDetailsRepository
            .GetByProduct(productId)
            .FilterByStatus( ProductionDetailsType.Live)
            .Select(details => details.Id)
            .SingleAsync();

        productionDetailsEdit.AssignedProducers = await CloneAssignedProducers(productionDetailsLiveId);

        List<(int liveStepId, ProductionState clonedState)> productionStates = CloneProductionStates(productionDetailsLiveId);

        productionDetailsEdit.ProductionStates = productionStates.Select(state => state.clonedState).ToList();

        await _productionDetailsRepository.InsertAndGetIdAsync(productionDetailsEdit);
        await CurrentUnitOfWork.SaveChangesAsync();
        
        productionDetailsEdit.ProductionSteps = CloneProductionSteps(productionDetailsLiveId, productionDetailsEdit.Id,productionStates);

        return productionDetailsEdit.Id;
    }

    public async Task CancelEditMode(int productId)
    {
        ProductionDetails productionDetailsEdit = await _productionDetailsRepository
            .GetByProduct(productId)
            .FilterByStatus(ProductionDetailsType.Edit)
            .SingleOrDefaultAsync();

        if (productionDetailsEdit == null)
        {
            throw new UserFriendlyException("Product not in edit mode");
        }
        
        _productionStateRepository.RemoveStatesByProductionDetailsId(productionDetailsEdit.Id);
        _productionStepRepository.RemoveStepsByProductionDetailsId(productionDetailsEdit.Id);
        _productProducerRepository.RemoveProductProducersByDetailsId(productionDetailsEdit.Id);
        await _productionDetailsRepository.DeleteAsync(productionDetailsEdit);
        
    }

    public async Task FinalizeEditMode(int productId)
    {
        List<ProductionDetails> productionDetails = await _productionDetailsRepository
            .GetByProduct(productId)
            .Where(details => details.ProductionDetailsType != ProductionDetailsType.Archived)
            .Include(details => details.ProductionPlans)
            .ToListAsync();

        ProductionDetails editProductionDetails = productionDetails.Single(details => details.ProductionDetailsType == ProductionDetailsType.Edit);

        if (editProductionDetails.ProductionPlans.Count == 0)
        {
            throw new UserFriendlyException("Can't publish a product without value chains");
        }
        
        ProductionDetails liveProductionDetails = productionDetails.Single(details => details.ProductionDetailsType == ProductionDetailsType.Live);

        liveProductionDetails.ProductionDetailsType = ProductionDetailsType.Archived;
        editProductionDetails.ProductionDetailsType = ProductionDetailsType.Live;
        await CurrentUnitOfWork.SaveChangesAsync();
        await _productCostManager.CalculateProductVariantCost(editProductionDetails.ProductId);
        await _productExportManager.UpdateProductInShop(editProductionDetails.ProductId);
    }

    private Task<List<ProductProducer>> CloneAssignedProducers(int productionDetailsId)
    {
        return _productProducerRepository
            .GetAll()
            .Where(producer => producer.ProductionDetailsId == productionDetailsId)
            .Select(producer => new ProductProducer
            {
                AssignedProducerId = producer.AssignedProducerId,
                AssignmentStatus = producer.AssignmentStatus
            })
            .ToListAsync();
    }

    private List<(int liveStepId, ProductionState clonedState)> CloneProductionStates(int productionDetailsLiveId)
    {
        List<ProductionState> liveStates = _productionStateRepository
            .GetAll()
            .Where(state => state.ProductionDetailsId == productionDetailsLiveId)
            .ToList();

        List<(int liveStateId, ProductionState clonedState)> states = liveStates
            .Select(state => (
                liveStateId: state.Id,
                clonedState: new ProductionState
                {
                    Description = state.Description,
                    WorkPieceId = state.WorkPieceId,
                    StateType = state.StateType,
                    LockedByUserId = state.LockedByUserId,
                    LockTime = state.LockTime
                }
            ))
            .ToList();

        states.ForEach(state =>
        {
            int? nextLiveState = liveStates
                .Single(liveState => liveState.Id == state.liveStateId)
                .NextStateId;

            state.clonedState.NextState = nextLiveState.HasValue
                ? states
                    .Single(clonedState => clonedState.liveStateId == nextLiveState.Value).clonedState
                : null;
        });

        return states;
    }


    private List<ProductionStep> CloneProductionSteps(
        int productionDetailsLiveId,
        int productionDetailsEditId,
        List<(int liveStepId, ProductionState editStep)> productionStates)
    {
        return _productionStepRepository
            .GetAll()
            .Where(step => step.ProductionDetailsId == productionDetailsLiveId)
            .Select(step => new
            {
                step.StartStateId,
                step.EndStateId,
                ProducionStep = new ProductionStep
                {
                    ProducerInfoId = step.ProducerInfoId,
                    StartStateId = step.StartStateId,
                    EndStateId = step.EndStateId,
                    StepMeasurementVariants = step
                        .StepMeasurementVariants
                        .Select(smv => new ProductionStepMeasurementVariant
                        {
                            ProductMeasurementId = smv.ProductMeasurementId,
                            OrderProcessingTime = smv.OrderProcessingTime,
                            WorkHours = smv.WorkHours,
                            SupplyOtherCraftsInWeeks = smv.SupplyOtherCraftsInWeeks,
                            TransportAndAssemblyCost = smv.TransportAndAssemblyCost,
                            AdditionalCost = smv.AdditionalCost,
                            StepWorkPieceVariantCosts = smv
                                .StepWorkPieceVariantCosts
                                .Select(swpv => new ProductionStepWorkPieceVariantCost
                                {
                                    WorkPieceId = swpv.WorkPieceId,
                                    VariantId = swpv.VariantId,
                                    IsStandard = swpv.IsStandard,
                                    MaterialCost = swpv.MaterialCost,
                                    CanProduce = swpv.CanProduce,
                                    ProducerInfoId = swpv.ProducerInfoId,
                                    ProductionDetailsId = productionDetailsEditId
                                })
                                .ToList()
                        })
                        .ToList()
                }
            })
            .AsEnumerable()
            .Select(editState =>
            {
                editState.ProducionStep.StartState = productionStates
                    .Single(state => state.liveStepId == editState.StartStateId.Value).editStep;
                editState.ProducionStep.EndState =  productionStates
                    .Single(state => state.liveStepId == editState.EndStateId.Value).editStep;
                return editState.ProducionStep;
            })
            .ToList();
    }
}