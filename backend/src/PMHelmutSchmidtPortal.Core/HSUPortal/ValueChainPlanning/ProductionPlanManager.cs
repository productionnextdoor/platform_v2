using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using Abp.Runtime.Security;
using Castle.Core.Logging;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUsers;
using PMHelmutSchmidtPortal.HSUPortal.Extensions;
using PMHelmutSchmidtPortal.HSUPortal.ProductionSteps;
using PMHelmutSchmidtPortal.HSUPortal.Products;
using PMHelmutSchmidtPortal.HSUPortal.Products.Details;
using PMHelmutSchmidtPortal.HSUPortal.Users;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ProductionPlan;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ValueChainPlanner;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning;

public class ProductionPlanManager : HSUDomainBaseService, IProductionPlanManager
{
    private new ILogger Logger { get; }

    private readonly IProductManager _productManager;
    private readonly IProductionDetailsRepository _productionDetailsRepository;
    private readonly IProducerInfoRepository _producerInfoRepository;
    private readonly IRepository<RatingType> _ratingTypeRepository;
    private readonly IProductionPlanRepository _productionPlanRepository;
    private readonly IProductProducerRepository _productProducerRepository;


    public ProductionPlanManager(
        IProductManager productManager,
        IProductionDetailsRepository productionDetailsRepository,
        IProducerInfoRepository producerInfoRepository,
        IRepository<RatingType> ratingTypeRepository,
        IProductionPlanRepository productionPlanRepository,
        IProductProducerRepository productProducerRepository)
    {
        _productManager = productManager;
        _productionDetailsRepository = productionDetailsRepository;
        _producerInfoRepository = producerInfoRepository;
        _ratingTypeRepository = ratingTypeRepository;
        _productionPlanRepository = productionPlanRepository;
        _productProducerRepository = productProducerRepository;
        Logger = NullLogger.Instance;
    }

    public async Task<PlanListOutputDto> GetPagedProductionPlans(PlanListInputDto input)
    {
        IQueryable<ProductionPlan> query = _productionPlanRepository.GetProductionPlansAllAssoc(input.ProductionDetailsId);

        int totalCount = await query.CountAsync();

        List<PlanRatingTypesDto> planRatingTypes = ObjectMapper.Map<List<PlanRatingTypesDto>>(await _ratingTypeRepository.GetAllListAsync());
        
        foreach (PlanRatingTypesDto ratingTypesDto in planRatingTypes)
        {
            ratingTypesDto.MaxRating = await query
                .Select(p => p.PlanRatings
                    .Where(pr => pr.RatingTypeId == ratingTypesDto.RatingTypeId)
                    .Select(pr => pr.Rating)) 
                .SelectMany(ratings => ratings) 
                .DefaultIfEmpty() 
                .MaxAsync(); 
        }
        
        List<ProductionPlan> productionPlans = await query
            .OrderBy(input.Sorting, input.SortRateTypeId)
            .PageBy(input.SkipCount, input.MaxResultCount)
            .ToListAsync();
        

        return new PlanListOutputDto
        {
            LastPlanCalculatedAt = await _productManager
                .GetProduct(input.ProductionDetailsId)
                .IncludeNonArchivedProductionDetails()
                .Select(p=> p.ProductionDetails.First().LastPlanCalculatedAt)
                .FirstOrDefaultAsync(),
            RatingTypes = planRatingTypes,
            Plans = new PagedResultDto<PlanListDto>
            {
                Items = ObjectMapper.Map<List<PlanListDto>>(productionPlans),
                TotalCount = totalCount
            }
        };
    }

    public async Task<VcpRequestContentDto> ProductToProductionPlanning(int productionDetailsId, int maxCost)
    {
        ProductionDetails productionDetails = await _productionDetailsRepository
            .GetAll()
            .Include(details => details.Product)
            .IncludeProductionStates()
            .IncludeProductionSteps()
            .SingleAsync(details => details.Id == productionDetailsId);

        productionDetails.Product.SetCodeForPlanner();

        List<int> producersInfoIds = productionDetails.ProductionSteps
            .Select(ps => ps.ProducerInfoId)
            .Distinct()
            .ToList();

        List<ProducerInfo> producersInfo = await _producerInfoRepository
            .GetProducerInfoWithTradesAndRatings()
            .Include(pi => pi.User)
            .ThenInclude(u => u.UserAddress)
            .Where(u => producersInfoIds.Contains(u.Id))
            .ToListAsync();

        return new VcpRequestContentDto
        {
            InputJsonData = new VcpDataOutputDto
            {
                OptimizeFor = "cost",
                Producer = ObjectMapper.Map<List<VcpProducerDto>>(producersInfo),
                States = ObjectMapper.Map<List<VcpProductionStateDto>>(productionDetails.ProductionStates),
                ProcessSteps = MapSteps(productionDetails, producersInfo)
            },
            MaxCost = maxCost,
            OutputParam = HttpUtility.UrlEncode(SimpleStringCipher.Instance.Encrypt($"productionDetailsId={productionDetails.Id}&validationCode={productionDetails.Product.CodeForPlanner}"))
        };
    }

    public async Task SaveProductProductionPlan(int productionDetailsId, string validationCode, VcpInputDataDto data)
    {
        try
        {

            ProductionDetails productionDetails = await _productionDetailsRepository
                .GetAll()
                .Include(details => details.Product)
                .Include(details => details.AssignedProducers)
                .IncludeProductionStates()
                .IncludeProductionSteps()
                .SingleAsync(details => details.Id == productionDetailsId);

            if (productionDetails.Product.CodeForPlanner != validationCode)
            {
                throw new Exception("Validation code is wrong");
            }

            await RemovePreviousProductPlans(productionDetails.Id);
            productionDetails.ProductionPlans = await CreateProductionPlans(data, productionDetails);
            productionDetails.Product.CodeForPlanner = null;
            productionDetails.LastPlanCalculatedAt = DateTime.Now;

            if (productionDetails.ProductionStates.Count > 0 && productionDetails.Product.State != ProductState.Live)
            {
                productionDetails.Product.State = ProductState.ProductionReady;
            }

            RemoveProducersWithoutSteps(productionDetails);
        }
        catch (Exception e)
        {
            Logger.Error($"""
                          Saving product plan failed,
                          Call Body: {data}
                          Error: {e}
                          """);
        }
    }

    public async Task SetActive(int productionPlanId, bool isActive)
    {
        ProductionPlan plan = await _productionPlanRepository
            .SingleAsync(pp => pp.Id == productionPlanId);
        
        plan.IsActive = isActive;
    }


    private async Task RemovePreviousProductPlans(int productionDetailsId)
    {
        _productionPlanRepository.RemovePlansByDetailsId(productionDetailsId);
        await CurrentUnitOfWork.SaveChangesAsync();
    }

    private async Task<List<ProductionPlan>> CreateProductionPlans(VcpInputDataDto data, ProductionDetails productionDetails)
    {
        List<ProductionPlan> productionPlans = new();
        List<RatingType> ratingTypes = await _ratingTypeRepository.GetAllListAsync();
        foreach (VcpPlanDto planDto in data.Plans)
        {
            List<ProductionPlanAction> actions = new();
            List<ProductionPlanRating> ratings = new();
            decimal totalRatingWeights = 0;

            foreach (VcpPlanActionsDto actionDto in planDto.Actions)
            {
                ProductionStep productionStep = productionDetails.ProductionSteps.Single(ps => ps.Id == actionDto.Id);
                List<int> preconditionIds = actionDto.Preconditions.Select(ps => ps.Id).ToList();
                ProductionState finalState = productionDetails.ProductionStates.Single(ps => ps.Id == actionDto.FinalStateId.Id);
                List<ProductionPlanActionPreconditionState> actionPreconditionStates = productionDetails.ProductionStates
                    .Where(ps => preconditionIds.Contains(ps.Id))
                    .Select(ps => new ProductionPlanActionPreconditionState { State = ps })
                    .ToList();

                decimal producerRatingWeight = (decimal) actionDto.Costs;
                totalRatingWeights += producerRatingWeight;

                foreach (KeyValuePair<string, decimal> valueChainParameter in actionDto.ProducerId.ValueChainParameters)
                {
                    RatingType ratingType = ratingTypes.SingleOrDefault(rt =>
                        string.Equals(rt.Name, valueChainParameter.Key, StringComparison.OrdinalIgnoreCase));
                    if (ratingType == null)
                    {
                        continue;
                    }

                    ProductionPlanRating productionPlanRating = ratings
                        .SingleOrDefault(r => r.RatingType == ratingType);

                    if (productionPlanRating == null)
                    {
                        ratings.Add(new ProductionPlanRating
                        {
                            RatingType = ratingType,
                            Rating = valueChainParameter.Value * producerRatingWeight
                        });
                        continue;
                    }

                    productionPlanRating.Rating += valueChainParameter.Value * producerRatingWeight;
                }

                long producerId = productionDetails.AssignedProducers.Single(p =>
                        p.AssignedProducerId == actionDto.ProducerId.Id && p.AssignmentStatus == ProducerAssignmentStatus.Accepted)
                    .AssignedProducerId;

                ProductionPlanAction planAction = new()
                {
                    ProductionStep = productionStep,
                    PreconditionsStates = actionPreconditionStates,
                    FinalState = finalState,
                    StartPoint = actionDto.StartingPoint,
                    EndPoint = actionDto.EndingPoint,
                    ProducerId = producerId,
                    ProcessingTimeInWeeks = actionDto.ProcessingTimeInWeeks,
                    WorkingTimeInHours = actionDto.WorkingTimeInHours
                };
                
                foreach (ProductionPlanActionPreconditionState productionPlanActionPreconditionState in actionPreconditionStates)
                {
                    productionPlanActionPreconditionState.Action = planAction;
                }

                actions.Add(planAction);
            }

            ratings = ratings.Select(rating =>
            {
                rating.Rating /= totalRatingWeights;
                return rating;
            }).ToList();


            ProductionPlan productionPlan = new()
            {
                LeadTime = (decimal)actions.Max(a => a.EndPoint),
                PlanValue = planDto.PlanValue,
                PlanActions = actions,
                PlanRatings = ratings,
                IsActive = true
            };

            productionPlans.Add(productionPlan);
        }

        return productionPlans;
    }


    private List<VcpProductionStepDto> MapSteps(ProductionDetails productionDetails, List<ProducerInfo> producersInfo)
    {
        List<ProductionState> workPieceFinalStates = productionDetails.ProductionStates
            .Where(ps => ps.StateType == ProductionStateType.WorkPieceFinal).ToList();

        List<VcpProductionStepDto> productionStepsDtos = new();

        foreach (ProductionStep productionStep in productionDetails.ProductionSteps)
        {
            ProductionStepMeasurementVariant defaultMeasurement = productionStep
                .StepMeasurementVariants
                .Single(smv => smv.ProductMeasurement.IsDefault);

            ProductionStepWorkPieceVariantCost standardVariantCost = defaultMeasurement.StepWorkPieceVariantCosts
                .Single(swpv => swpv.IsStandard);

            List<VcpStepPreconditionDto> stepPreconditions = new();

            if (productionStep.EndState.StateType == ProductionStateType.ProductFinal)
            {
                stepPreconditions = workPieceFinalStates
                    .Where(ps => ps.WorkPieceId != productionStep.StartState.WorkPieceId)
                    .Select(ps => new VcpStepPreconditionDto
                        {
                            Id = ps.Id, 
                            DeliveryTimeLatestInWeeks = defaultMeasurement.SupplyOtherCraftsInWeeks
                        }
                    ).ToList();
            }

            ProducerInfo stepProducerInfo = producersInfo.Single(pi => pi.UserId == productionStep.ProducerInfo.UserId);

            decimal stepCost = standardVariantCost.MaterialCost +
                               defaultMeasurement.AdditionalCost +
                               defaultMeasurement.TransportAndAssemblyCost +
                               standardVariantCost.WorkCost;

            productionStepsDtos.Add(new VcpProductionStepDto
            {
                Id = productionStep.Id,
                InitialStateId = productionStep.StartState.Id,
                FinalStateId = productionStep.EndState.Id,
                Costs = stepCost,
                ProducerId = productionStep.ProducerInfo.UserId,
                ProcessingTimeInWeeks = defaultMeasurement.OrderProcessingTime,
                WorkingTimeInHours = defaultMeasurement.WorkHours,
                Preconditions = stepPreconditions
            });
        }

        return productionStepsDtos;
    }

    private void RemoveProducersWithoutSteps(ProductionDetails productionDetails)
    {
        List<ProductProducer> producersWithoutSteps = productionDetails.AssignedProducers
            .Where(pp => productionDetails.ProductionSteps
                .All(step => step.ProducerInfo.UserId != pp.AssignedProducerId))
            .ToList();

        foreach (ProductProducer producer in producersWithoutSteps)
        {
            _productProducerRepository.Delete(producer);
        }
    }
}