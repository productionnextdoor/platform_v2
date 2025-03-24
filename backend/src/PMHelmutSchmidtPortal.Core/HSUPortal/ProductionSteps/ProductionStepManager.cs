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

    public ProductionStepManager(
        IProductionStepRepository productionStepRepository,
        IProductionStateRepository productionStateRepository,
        IProducerInfoRepository producerInfoRepository,
        IMeasurementPositionManager measurementPositionManager,
        IRepository<ProductionStepMeasurementVariant> stepMeasurementVariantRepository,
        IProductManager productManager
    )
    {
        _productionStepRepository = productionStepRepository;
        _productionStateRepository = productionStateRepository;
        _producerInfoRepository = producerInfoRepository;
        _measurementPositionManager = measurementPositionManager;
        _stepMeasurementVariantRepository = stepMeasurementVariantRepository;
        _productManager = productManager;
    }

    public async Task<ProductionStep> GetProductionStep(ProductionStepBaseDto input, long producerId)
    {
        
        IIncludableQueryable<ProductionStep, ICollection<ProductionStepWorkPieceVariantCost>> productQuery = _productionStepRepository
            .GetAll()
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
            if (productionStep.Id == 0)
            {
                CreateStepInformation(
                    input.StepMeasurementVariants.Concat(await GetInBetweenStepInformation(product.Id, input.StepMeasurementVariants)),
                    product,
                    productionStep,
                    producerInfo);
            }
            else
            {
                List<StepMeasurementVariantsDto> inBetweenStepInformation = (await GetInBetweenStepInformationForUpdate(product.Id, productionStep.Id, input.StepMeasurementVariants)).ToList();
                UpdateStepInformation(
                    input.StepMeasurementVariants.Concat(inBetweenStepInformation.Where(smv => smv.StepMeasurementVariantsId > 0)),
                    productionStep);

                // Create all inbetween StepInformation which weren't created during step initialisation. This is just to prevent data garbage after merging this ticket (old steps/products won't have those step information).
                // In production this should never happen
                CreateStepInformation(
                    inBetweenStepInformation.Where(smv => smv.StepMeasurementVariantsId < 1),
                    product,
                    productionStep,
                    producerInfo);
            }

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

            List<int> baseMeasurementIds = product.ProductMeasurements
                .Where(pm =>
                    pm.Position == product.ProductMeasurements.Max(prodm => prodm.Position) ||
                    pm.Position == product.ProductMeasurements.Min(prodm => prodm.Position) ||
                    pm.IsDefault)
                .Select(pm => pm.Id)
                .ToList();

            foreach ((long producerId, int productId,ProductionStepCreateOrUpdateDto step) producerStep in steps)
            {
                List<StepMeasurementVariantsDto> stepBaseMeasurements = producerStep.step.StepMeasurementVariants
                    .Where(measurement => baseMeasurementIds.Contains(measurement.MeasurementId))
                    .ToList();

                producerStep.step.StepMeasurementVariants = stepBaseMeasurements;
                await CreateOrUpdateProductionStep(producerStep.step, product, producerStep.producerId);
            }
        }
    }

    private async Task<IEnumerable<StepMeasurementVariantsDto>> GetInBetweenStepInformationForUpdate(int productId, int productionStepId, List<StepMeasurementVariantsDto> baseStepInformation)
    {
        List<StepMeasurementVariantsDto> inBetweenStepInformation = (await GetInBetweenStepInformation(productId, baseStepInformation)).ToList();
        List<ProductionStepMeasurementVariant> existingStepInformation = await _stepMeasurementVariantRepository
            .GetAll()
            .Include(smv => smv.StepWorkPieceVariantCosts)
            .Where(smv => smv.ProductionStepId == productionStepId)
            .ToListAsync();

        foreach (StepMeasurementVariantsDto stepMeasurementVariantsDto in inBetweenStepInformation)
        {
            ProductionStepMeasurementVariant existingVariant = existingStepInformation
                .SingleOrDefault(smv => smv.ProductMeasurementId == stepMeasurementVariantsDto.MeasurementId);

            if (existingVariant is null) continue;

            stepMeasurementVariantsDto.StepMeasurementVariantsId = existingVariant.Id;
            foreach (WorkPieceVariantCostDto workPieceVariantCostDto in stepMeasurementVariantsDto.WorkPieceVariantsCost)
            {
                workPieceVariantCostDto.WorkPieceVariantCostId = existingVariant.StepWorkPieceVariantCosts
                    .Single(swpv =>
                        swpv.WorkPieceId == workPieceVariantCostDto.WorkPieceId &&
                        swpv.VariantId == workPieceVariantCostDto.WorkPieceVariantId)
                    .Id;
            }
        }

        return inBetweenStepInformation;
    }

    private async Task<IEnumerable<StepMeasurementVariantsDto>> GetInBetweenStepInformation(int productId, List<StepMeasurementVariantsDto> baseStepInformation)
    {
        List<ProductMeasurement> productMeasurements = (await _measurementPositionManager
            .GetProductMeasurements(productId))
            .OrderBy(pm => pm.Position)
            .ToList();

        // Normalizing the positions. If in developer wizard measurements where added or deleted multiple times
        // and have never been sorted in step 5, there will be gaps in position enumerations. That can affect our
        // calculations that's why normalization is needed to eliminate those gaps.   
        int i = 1;
        foreach (ProductMeasurement productMeasurement in productMeasurements)
        {
            productMeasurement.Position = i++;
        }

        await CurrentUnitOfWork.SaveChangesAsync();
        
        ProductMeasurement maxMeasurement = productMeasurements
            .Single(pm =>
                pm.Position == productMeasurements.Max(prm => prm.Position));
        ProductMeasurement minMeasurement = productMeasurements
            .Single(pm =>
                pm.Position == productMeasurements.Min(prm => prm.Position));
        ProductMeasurement defaultMeasurement = productMeasurements.Single(pm => pm.IsDefault);

        List<ProductMeasurement> noneBaseProductMeasurements = productMeasurements
            .Where(pm =>
                pm.Position != maxMeasurement.Position &&
                pm.Position != minMeasurement.Position &&
                !pm.IsDefault)
            .ToList();

        return noneBaseProductMeasurements.Select(pm =>
        {
            ProductMeasurement lowerMeasurementBound = pm.Position >= minMeasurement.Position && pm.Position <= defaultMeasurement.Position
                ? minMeasurement
                : defaultMeasurement;

            ProductMeasurement upperMeasurementBound = pm.Position > defaultMeasurement.Position && pm.Position <= maxMeasurement.Position
                ? maxMeasurement
                : defaultMeasurement;

            StepMeasurementVariantsDto lowerStepInformationBound = pm.Position >= minMeasurement.Position && pm.Position <= defaultMeasurement.Position
                ? baseStepInformation.Single(bsi => bsi.MeasurementId == minMeasurement.Id)
                : baseStepInformation.Single(bsi => bsi.MeasurementId == defaultMeasurement.Id);

            StepMeasurementVariantsDto upperStepInformationBound = pm.Position > defaultMeasurement.Position && pm.Position <= maxMeasurement.Position
                ? baseStepInformation.Single(bsi => bsi.MeasurementId == maxMeasurement.Id)
                : baseStepInformation.Single(bsi => bsi.MeasurementId == defaultMeasurement.Id);

            return InterpolateStepMeasurementVariants(
                pm,
                lowerMeasurementBound,
                upperMeasurementBound,
                lowerStepInformationBound,
                upperStepInformationBound);
        });
    }

    private StepMeasurementVariantsDto InterpolateStepMeasurementVariants(
        ProductMeasurement productMeasurement,
        ProductMeasurement lowerMeasurementBound,
        ProductMeasurement upperMeasurementBound,
        StepMeasurementVariantsDto lowerStepInformationBound,
        StepMeasurementVariantsDto upperStepInformationBound
    ) => new()
    {
        MeasurementId = productMeasurement.Id,
        OrderProcessingTime = MathUtilities.LinearCostInterpolation(
            lowerMeasurementBound.Position,
            upperMeasurementBound.Position,
            lowerStepInformationBound.OrderProcessingTime,
            upperStepInformationBound.OrderProcessingTime,
            productMeasurement.Position),
        WorkHours = MathUtilities.LinearCostInterpolation(
            lowerMeasurementBound.Position,
            upperMeasurementBound.Position,
            lowerStepInformationBound.WorkHours,
            upperStepInformationBound.WorkHours,
            productMeasurement.Position),
        TransportAndAssemblyCost = MathUtilities.LinearCostInterpolation(
            lowerMeasurementBound.Position,
            upperMeasurementBound.Position,
            lowerStepInformationBound.TransportAndAssemblyCost,
            upperStepInformationBound.TransportAndAssemblyCost,
            productMeasurement.Position),
        AdditionalCosts = MathUtilities.LinearCostInterpolation(
            lowerMeasurementBound.Position,
            upperMeasurementBound.Position,
            lowerStepInformationBound.AdditionalCosts,
            upperStepInformationBound.AdditionalCosts,
            productMeasurement.Position),

        WorkPieceVariantsCost = lowerStepInformationBound.WorkPieceVariantsCost.Select((lwpv, index) =>
                InterpolateWorkPieceVariantCostDto(
                    lwpv,
                    upperStepInformationBound.WorkPieceVariantsCost[index],
                    lowerMeasurementBound,
                    upperMeasurementBound,
                    productMeasurement))
            .ToList()
    };

    private WorkPieceVariantCostDto InterpolateWorkPieceVariantCostDto(
        WorkPieceVariantCostDto lowerVariantBound,
        WorkPieceVariantCostDto upperVariantBound,
        ProductMeasurement lowerMeasurementBound,
        ProductMeasurement upperMeasurementBound,
        ProductMeasurement productMeasurement
    ) => new()
    {
        CanProduce = lowerVariantBound.CanProduce && upperVariantBound.CanProduce,
        IsStandard = lowerVariantBound.IsStandard && upperVariantBound.IsStandard,
        MaterialCost = MathUtilities.LinearCostInterpolation(
            lowerMeasurementBound.Position,
            upperMeasurementBound.Position,
            lowerVariantBound.MaterialCost, upperVariantBound.MaterialCost,
            productMeasurement.Position),
        WorkPieceId = lowerVariantBound.WorkPieceId,
        WorkPieceVariantCostId = 0,
        WorkPieceVariantId = lowerVariantBound.WorkPieceVariantId
    };

    private static void CreateStepInformation(IEnumerable<StepMeasurementVariantsDto> stepMeasurementVariants, Product product, ProductionStep productionStep, ProducerInfo producerInfo)
    {
        foreach (StepMeasurementVariantsDto stepMeasurementVariantDto in stepMeasurementVariants)
        {
            ProductionStepMeasurementVariant stepMeasurementVariant =
                CreateProductionStepMeasurementVariant(product, productionStep, stepMeasurementVariantDto);

            foreach (ProductionStepWorkPieceVariantCost stepWorkPieceVariantCost in stepMeasurementVariantDto
                         .WorkPieceVariantsCost
                         .Select(workPieceVariantCostDto =>
                             CreateStepWorkPieceVariantCost(product, producerInfo, workPieceVariantCostDto)))
            {
                stepMeasurementVariant.StepWorkPieceVariantCosts.Add(stepWorkPieceVariantCost);
            }

            productionStep.StepMeasurementVariants.Add(stepMeasurementVariant);
        }
    }

    private static void UpdateStepInformation(IEnumerable<StepMeasurementVariantsDto> stepMeasurementVariants, ProductionStep productionStep)
    {
        foreach (StepMeasurementVariantsDto stepMeasurementVariantDto in stepMeasurementVariants)
        {
            ProductionStepMeasurementVariant stepMeasurementVariant =
                UpdateProductionStepMeasurementVariant(productionStep, stepMeasurementVariantDto);

            foreach (ProductionStepWorkPieceVariantCost stepWorkPieceVariantCost in stepMeasurementVariantDto
                         .WorkPieceVariantsCost
                         .Select(workPieceVariantCostDto =>
                             UpdateStepWorkPieceVariantCost(stepMeasurementVariant, workPieceVariantCostDto)))
            {
                stepMeasurementVariant.StepWorkPieceVariantCosts.Add(stepWorkPieceVariantCost);
            }

            productionStep.StepMeasurementVariants.Add(stepMeasurementVariant);
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

        return workPieceVariantCost;
    }
}