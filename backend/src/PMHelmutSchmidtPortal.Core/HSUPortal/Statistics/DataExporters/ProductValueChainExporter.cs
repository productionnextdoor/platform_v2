using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using Abp.UI;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.HSUPortal.Products;
using PMHelmutSchmidtPortal.HSUPortal.Statistics.Dto;
using PMHelmutSchmidtPortal.HSUPortal.Users;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning;

namespace PMHelmutSchmidtPortal.HSUPortal.Statistics.DataExporters;

public class ProductValueChainExporter : AbstractStatisticsExporter
{
    private readonly IProductRepository _productRepository;
    private readonly IRepository<RatingType> _ratingTypeRepository;
    protected override string LocalisationPrefix => "Statistics.ProductValueChain";

    public ProductValueChainExporter(
        IProductRepository productRepository,
        IRepository<RatingType> ratingTypeRepository
    )
    {
        _productRepository = productRepository;
        _ratingTypeRepository = ratingTypeRepository;
    }
    
    public override async Task<List<Dictionary<string, object>>> GetData(StatisticsInputDto filter)
    {
        bool filterProduct = int.TryParse(filter.FilterVar, out int productNumber);
        List<RatingType> ratingTypes = _ratingTypeRepository.GetAll().ToList();

        List<Product> products = await _productRepository
            .GetAll()
            .Where(p => p.ProductionDetails.Any(pd => pd.ProductionDetailsType == ProductionDetailsType.Live && pd.ProductionPlans.Count > 0))
            .WhereIf(filterProduct, p => p.ProductNumber == productNumber)
            .WhereIf(filter.DateFrom.HasValue, p => p.CreationTime >= filter.DateFrom.Value)
            .WhereIf(filter.DateTo.HasValue, p => p.CreationTime <= filter.DateTo.Value)
            .Include(p => p.WorkPieces)
            .ThenInclude(wp => wp.MaterialGroup)
            .Include(p => p.ProductionDetails.Where(pd => pd.ProductionDetailsType == ProductionDetailsType.Live))
            .ThenInclude(pd => pd.AssignedProducers)
            .Include(p => p.ProductionDetails.Where(pd => pd.ProductionDetailsType == ProductionDetailsType.Live))
            .ThenInclude(pd => pd.ProductionPlans)
            .ThenInclude(pp => pp.PlanActions)
            .Include(p => p.ProductionDetails.Where(pd => pd.ProductionDetailsType == ProductionDetailsType.Live))
            .ThenInclude(pd => pd.ProductionPlans)
            .ThenInclude(pp => pp.PlanRatings)
            .ToListAsync();


        List<Dictionary<string, object>> items = new();

        foreach (Product product in products)
        {
            List<ProductionPlan> productionPlans = product.ProductionDetails.First().ProductionPlans.ToList();
            int valueChainsCount = productionPlans.Count;

            if (valueChainsCount == 0)
            {
                continue;
            }

            int materialGroupCount = product.WorkPieces.Select(wp => wp.MaterialGroup).Distinct().Count();

            double producersPerValueChainAvg = productionPlans
                .Average(pp => pp
                    .PlanActions.Select(pa => pa.ProducerId).Distinct().Count());
            int producersPerValueChainMin = productionPlans
                .Min(pp => pp
                    .PlanActions.Select(pa => pa.ProducerId).Distinct().Count());
            int producersPerValueChainMax = productionPlans
                .Max(pp => pp
                    .PlanActions.Select(pa => pa.ProducerId).Distinct().Count());


            Dictionary<string, object> item = new()
            {
                { L($"{LocalisationPrefix}.ProductNumber"), product.ProductNumber },
                { L($"{LocalisationPrefix}.ProductName"), product.Name },
                { L($"{LocalisationPrefix}.MaterialGroupsCount"), product.WorkPieces.Count },
                { L($"{LocalisationPrefix}.WorkTypeCount"), materialGroupCount },
                { L($"{LocalisationPrefix}.ProductProducersCount"), product.ProductionDetails.First().AssignedProducers.Count },
                { L($"{LocalisationPrefix}.ValueChainsCount"), valueChainsCount },
                { L($"{LocalisationPrefix}.ProducersPerValueChainAvg"), producersPerValueChainAvg },
                { L($"{LocalisationPrefix}.ProducersPerValueChainMin"), producersPerValueChainMin },
                { L($"{LocalisationPrefix}.ProducersPerValueChainMax"), producersPerValueChainMax },
                { L($"{LocalisationPrefix}.ValueChainValueAvg"), productionPlans.Average(pp => pp.PlanValue) },
                { L($"{LocalisationPrefix}.ValueChainValueMin"), productionPlans.Min(pp => pp.PlanValue) },
                { L($"{LocalisationPrefix}.ValueChainValueMax"), productionPlans.Max(pp => pp.PlanValue) },
                { L($"{LocalisationPrefix}.ValueChainDurationAvg"), productionPlans.Average(pp => pp.LeadTime) },
                { L($"{LocalisationPrefix}.ValueChainDurationMin"), productionPlans.Min(pp => pp.LeadTime) },
                { L($"{LocalisationPrefix}.ValueChainDurationMax"), productionPlans.Max(pp => pp.LeadTime) },
            };

            foreach (RatingType ratingType in ratingTypes)
            {
                List<ProductionPlanRating> ratings = productionPlans
                    .Select(pp => pp.PlanRatings.SingleOrDefault(pr => pr.RatingTypeId == ratingType.Id)).ToList();

                if (ratings.Contains(null))
                {
                    item.Add(L($"UserProfile.ProducerRatings.{ratingType.Name}") + " Avg", "");
                    item.Add(L($"UserProfile.ProducerRatings.{ratingType.Name}") + " Min", "");
                    item.Add(L($"UserProfile.ProducerRatings.{ratingType.Name}") + " Max", "");
                    continue;
                }

                item.Add(L($"UserProfile.ProducerRatings.{ratingType.Name}") + " Avg", ratings.Average(pr => pr.Rating));
                item.Add(L($"UserProfile.ProducerRatings.{ratingType.Name}") + " Min", ratings.Min(pr => pr.Rating));
                item.Add(L($"UserProfile.ProducerRatings.{ratingType.Name}") + " Max", ratings.Max(pr => pr.Rating));
            }

            items.Add(item);
        }

        if (items.Count == 0)
        {
            throw new UserFriendlyException(L("Error.Statistics.NoData"));
        }

        return items;
    }
}