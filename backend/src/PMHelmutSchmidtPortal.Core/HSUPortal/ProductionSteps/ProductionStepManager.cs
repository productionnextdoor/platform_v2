using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.UI;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.Extensions;
using PMHelmutSchmidtPortal.HSUPortal.Extensions;
using PMHelmutSchmidtPortal.HSUPortal.Products;
using PMHelmutSchmidtPortal.HSUPortal.Products.Details;
using PMHelmutSchmidtPortal.HSUPortal.Users;
using PMHelmutSchmidtPortal.HSUPortal.Utilities;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ProductionSteps;

namespace PMHelmutSchmidtPortal.HSUPortal.ProductionSteps;

public class ProductionStepManager : HSUDomainBaseService, IProductionStepManager
{
    private readonly IProductionStepRepository _productionStepRepository;
    private readonly IProductionStateRepository _productionStateRepository;
    private readonly IProducerInfoRepository _producerInfoRepository;
    private readonly IMeasurementPositionManager _measurementPositionManager;
    private readonly IRepository<ProductionStepMeasurementVariant> _stepMeasurementVariantRepository;
    private readonly IProductManager _productManager;
    private readonly IProductProducerRepository _productProducerRepository;

    public ProductionStepManager(
        IProductionStepRepository productionStepRepository,
        IProductionStateRepository productionStateRepository,
        IProducerInfoRepository producerInfoRepository,
        IMeasurementPositionManager measurementPositionManager,
        IRepository<ProductionStepMeasurementVariant> stepMeasurementVariantRepository,
        IProductManager productManager,
        IProductProducerRepository productProducerRepository
    )
    {
        _productionStepRepository = productionStepRepository;
        _productionStateRepository = productionStateRepository;
        _producerInfoRepository = producerInfoRepository;
        _measurementPositionManager = measurementPositionManager;
        _stepMeasurementVariantRepository = stepMeasurementVariantRepository;
        _productManager = productManager;
        _productProducerRepository = productProducerRepository;
    }

    public async Task<ProductionStep> GetProductionStep(ProductionStepBaseDto input, long producerId)
    {
        
        IIncludableQueryable<ProductionStep, ICollection<ProductionStepWorkPieceVariantCost>> productQuery = _productionStepRepository
            .GetAll()
            .IncludeStates()
            .IncludeMeasurementsAndCosts();

        if (input.StepId != 0)
        {
            return await productQuery
                .SingleOrDefaultAsync(ps => ps.Id == input.StepId);
        }

        List<ProductionState> productionStates = await _productionStateRepository
            .GetAll()
            .Where(state => state.ProductionDetailsId == input.ProductionDetailsId)
            .ToListAsync();
        
        ProductionState startState = productionStates.First(ps => ps.Id == input.StartStateId);
        ProductionState endState = productionStates.First(ps => ps.Id == input.EndStateId);

        if (!IsStepPossible(startState.Id, endState.Id, startState.WorkPieceId, productionStates))
        {
            throw new UserFriendlyException("Impossible step", "Selected production states are not connected");
        }

        return await productQuery
            .SingleOrDefaultAsync(ps =>
                ps.ProductionDetailsId == input.ProductionDetailsId &&
                ps.StartState == startState &&
                ps.EndState == endState &&
                ps.ProducerInfo.UserId == producerId
            ) ?? new ProductionStep
        {
            ProductionDetailsId = input.ProductionDetailsId,
            ProducerInfo = await _producerInfoRepository.SingleAsync(pi => pi.UserId == producerId),
            StartState = startState,
            EndState = endState,
            StepMeasurementVariants = new List<ProductionStepMeasurementVariant>()
        };
    }

    public IQueryable<ProductionStep> GetProductionStep(int productionStepId)
    {
        return _productionStepRepository
            .GetAll()
            .Where(ps => ps.Id == productionStepId);
    }

    public async Task<ProductionStep> CreateOrUpdateProductionStep(ProductionStepCreateOrUpdateDto input, Product product, long producerId)
    {
        ProducerInfo producerInfo = await _producerInfoRepository.SingleAsync(pi => pi.UserId == producerId);
        ProductionStep productionStep = await GetProductionStep(input, producerId);

        try
        {
            // Validate that standard measurement + standard material combination exists
            ProductMeasurement standardMeasurement = product.ProductMeasurements.FirstOrDefault(pm => pm.IsDefault);
            if (standardMeasurement == null)
            {
                throw new UserFriendlyException("Standard measurement missing", "Product must have a default measurement");
            }

            StepMeasurementVariantsDto standardMeasurementVariant = input.StepMeasurementVariants
                .FirstOrDefault(smv => smv.MeasurementId == standardMeasurement.Id);
            
            if (standardMeasurementVariant == null)
            {
                throw new UserFriendlyException("Standard measurement variant missing", "Request must include the standard measurement variant");
            }

            WorkPieceVariantCostDto standardWorkPieceCost = standardMeasurementVariant.WorkPieceVariantsCost
                .FirstOrDefault(wpvc => wpvc.IsStandard);
            
            if (standardWorkPieceCost == null || standardWorkPieceCost.MaterialCost <= 0)
            {
                throw new UserFriendlyException("Standard material missing", "Standard measurement must have a standard material variant");
            }
            
            CreateOrUpdateStepInformation(input.StepMeasurementVariants, product, productionStep, producerInfo);

            await _productionStepRepository.InsertOrUpdateAndGetIdAsync(productionStep);

            return productionStep;
        }
        catch (Exception e)
        {
            throw e.ToUserFriendlyException(StatusCodes.Status500InternalServerError);
        }
    }

    public IQueryable<ProductionStep> GetProductProductionSteps(ProductionStepListInputDto input)
    {
        return _productionStepRepository
            .GetAllByProductionDetailsId(input.ProductionDetailsId)
            .IncludeStates()
            .IncludeProducerInfo()
            .Include(ps => ps.ProductionDetails.Product.ProductMeasurements)
            .IncludeMeasurementsAndCosts()
            .OrderBy(input.Sorting);
    }

    public async Task DeleteProductionStep(ProductionStep productionStep)
    {
        await _productionStepRepository.DeleteAsync(productionStep);

        bool hasRemainingSteps = await _productionStepRepository
            .GetAllByProductionDetailsId(productionStep.ProductionDetailsId)
            .AnyAsync(step => step.Id != productionStep.Id && step.ProducerInfo.UserId == productionStep.ProducerInfo.UserId);

        if (!hasRemainingSteps)
        {
            _productProducerRepository.RemoveProductProducer(productionStep.ProductionDetailsId, productionStep.ProducerInfo.UserId);
        }
    }

    public async Task RecalculateStepsData(User currentUser)
    {
        List<IGrouping<int, (long producerId, int ProductId, ProductionStepCreateOrUpdateDto step)>> stepGroups = _productionStepRepository
            .GetAll()
            .Select(step => new
            {
                ProducerId = step.ProducerInfo.UserId,
                step.ProductionDetails.ProductId,
                Step = new ProductionStepCreateOrUpdateDto
                {
                    ProductionDetailsId = step.ProductionDetailsId,
                    StepId = step.Id,
                    StartStateId = step.StartStateId ?? 0,
                    EndStateId = step.EndStateId ?? 0,
                    StepMeasurementVariants = step
                        .StepMeasurementVariants
                        .Select(smv => new StepMeasurementVariantsDto
                        {
                            StepMeasurementVariantsId = smv.Id,
                            MeasurementId = smv.ProductMeasurementId,
                            OrderProcessingTime = smv.OrderProcessingTime,
                            WorkHours = smv.WorkHours,
                            SupplyOtherCraftsInWeeks = smv.SupplyOtherCraftsInWeeks,
                            TransportAndAssemblyCost = smv.TransportAndAssemblyCost,
                            AdditionalCosts = smv.AdditionalCost,
                            WorkPieceVariantsCost = smv.StepWorkPieceVariantCosts
                                .Select(swpvc => new WorkPieceVariantCostDto
                                {
                                    WorkPieceVariantCostId = swpvc.Id,
                                    WorkPieceId = swpvc.WorkPieceId,
                                    WorkPieceVariantId = swpvc.VariantId,
                                    IsStandard = swpvc.IsStandard,
                                    MaterialCost = swpvc.MaterialCost,
                                    WorkCost = swpvc.WorkCost,
                                    CanProduce = swpvc.CanProduce
                                }).ToList()
                        }).ToList()
                }
            })
            .AsEnumerable()
            .Select(item => (item.ProducerId, item.ProductId, item.Step ))
            .GroupBy(step => step.ProductId)
            .ToList();

        foreach (IGrouping<int, (long producerId, int productId,ProductionStepCreateOrUpdateDto step)> steps in stepGroups)
        {
            Product product = await (await _productManager.GetProductForProductionSteps(steps.Key, currentUser))
                .SingleAsync();

            foreach ((long producerId, int productId,ProductionStepCreateOrUpdateDto step) producerStep in steps)
            {
                await CreateOrUpdateProductionStep(producerStep.step, product, producerStep.producerId);
            }
        }
    }


    private static void CreateOrUpdateStepInformation(IEnumerable<StepMeasurementVariantsDto> stepMeasurementVariants, Product product, ProductionStep productionStep, ProducerInfo producerInfo)
    {
        foreach (StepMeasurementVariantsDto stepMeasurementVariantDto in stepMeasurementVariants)
        {
            ProductionStepMeasurementVariant stepMeasurementVariant;
            
            if (stepMeasurementVariantDto.StepMeasurementVariantsId > 0)
            {
                stepMeasurementVariant = UpdateProductionStepMeasurementVariant(productionStep, stepMeasurementVariantDto);
            }
            else
            {
                stepMeasurementVariant = CreateProductionStepMeasurementVariant(product, productionStep, stepMeasurementVariantDto);
                productionStep.StepMeasurementVariants.Add(stepMeasurementVariant);
            }
            foreach (WorkPieceVariantCostDto workPieceVariantCostDto in stepMeasurementVariantDto.WorkPieceVariantsCost)
            {
                if (workPieceVariantCostDto.WorkPieceVariantCostId > 0)
                {
                    UpdateStepWorkPieceVariantCost(stepMeasurementVariant, workPieceVariantCostDto);
                }
                else
                {
                    ProductionStepWorkPieceVariantCost newCost = CreateStepWorkPieceVariantCost(product, producerInfo, workPieceVariantCostDto);
                    stepMeasurementVariant.StepWorkPieceVariantCosts.Add(newCost);
                }
            }
        }
    }



    private static bool IsStepPossible(int startStateId, int endStateId, int? workPieceId, List<ProductionState> productionStates)
    {
        HashSet<int> visitedStates = new();
        while (true)
        {
            //to prevent infinite loops
            if (!visitedStates.Add(startStateId))
            {
                return false;
            }

            ProductionState startState = productionStates.First(ps => ps.Id == startStateId);

            if (startState.Id == endStateId)
            {
                return true;
            }

            if (startState.NextStateId == null || (startState.WorkPieceId != null && startState.WorkPieceId != workPieceId))
            {
                return false;
            }

            startStateId = startState.NextStateId.Value;
        }
    }

    private static ProductionStepMeasurementVariant CreateProductionStepMeasurementVariant(
        Product product,
        ProductionStep productionStep,
        StepMeasurementVariantsDto stepMeasurementVariantDto)
    {
        ProductMeasurement measurements = product
            .ProductMeasurements
            .Single(pm => pm.Id == stepMeasurementVariantDto.MeasurementId);

        ProductionStepMeasurementVariant stepMeasurementVariant = new()
        {
            ProductionStep = productionStep,
            ProductMeasurement = measurements,
            OrderProcessingTime = stepMeasurementVariantDto.OrderProcessingTime,
            WorkHours = stepMeasurementVariantDto.WorkHours,
            SupplyOtherCraftsInWeeks = stepMeasurementVariantDto.SupplyOtherCraftsInWeeks,
            TransportAndAssemblyCost = stepMeasurementVariantDto.TransportAndAssemblyCost,
            AdditionalCost = stepMeasurementVariantDto.AdditionalCosts,
            StepWorkPieceVariantCosts = new List<ProductionStepWorkPieceVariantCost>()
        };

        return stepMeasurementVariant;
    }

    private static ProductionStepMeasurementVariant UpdateProductionStepMeasurementVariant(
        ProductionStep productionStep,
        StepMeasurementVariantsDto stepMeasurementVariantDto)
    {
        ProductionStepMeasurementVariant stepMeasurementVariant = productionStep
            .StepMeasurementVariants
            .Single(sm => sm.Id == stepMeasurementVariantDto.StepMeasurementVariantsId);

        stepMeasurementVariant.OrderProcessingTime = stepMeasurementVariantDto.OrderProcessingTime;
        stepMeasurementVariant.WorkHours = stepMeasurementVariantDto.WorkHours;
        stepMeasurementVariant.SupplyOtherCraftsInWeeks = stepMeasurementVariantDto.SupplyOtherCraftsInWeeks;
        stepMeasurementVariant.TransportAndAssemblyCost = stepMeasurementVariantDto.TransportAndAssemblyCost;
        stepMeasurementVariant.AdditionalCost = stepMeasurementVariantDto.AdditionalCosts;

        return stepMeasurementVariant;
    }

    private static ProductionStepWorkPieceVariantCost CreateStepWorkPieceVariantCost(
        Product product,
        ProducerInfo producerInfo,
        WorkPieceVariantCostDto workPieceVariantCostDto)
    {
        WorkPiece workPiece = product
            .WorkPieces
            .Single(wp => wp.Id == workPieceVariantCostDto.WorkPieceId);

        WorkPieceVariant workPieceVariant = workPiece.WorkPieceVariants
            .SingleOrDefault(wpv => wpv.Id == workPieceVariantCostDto.WorkPieceVariantId);

        ProductionStepWorkPieceVariantCost stepWorkPieceVariantCost = new()
        {
            ProductionDetails = product.ProductionDetails.First(),
            ProducerInfo = producerInfo,
            WorkPiece = workPiece,
            Variant = workPieceVariant,
            IsStandard = workPieceVariantCostDto.IsStandard,
            MaterialCost = workPieceVariantCostDto.MaterialCost,
            WorkCost = workPieceVariantCostDto.WorkCost,
            CanProduce = workPieceVariantCostDto.CanProduce
        };

        return stepWorkPieceVariantCost;
    }

    private static ProductionStepWorkPieceVariantCost UpdateStepWorkPieceVariantCost(
        ProductionStepMeasurementVariant stepMeasurementVariant,
        WorkPieceVariantCostDto workPieceVariantCostDto)
    {
        ProductionStepWorkPieceVariantCost workPieceVariantCost = stepMeasurementVariant
            .StepWorkPieceVariantCosts
            .Single(swpv => swpv.Id == workPieceVariantCostDto.WorkPieceVariantCostId);

        workPieceVariantCost.CanProduce = workPieceVariantCostDto.CanProduce;
        workPieceVariantCost.MaterialCost = workPieceVariantCostDto.MaterialCost;
        workPieceVariantCost.WorkCost = workPieceVariantCostDto.WorkCost;

        return workPieceVariantCost;
    }
}