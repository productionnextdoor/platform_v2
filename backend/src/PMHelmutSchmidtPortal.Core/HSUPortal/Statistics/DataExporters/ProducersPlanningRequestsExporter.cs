using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Extensions;
using Abp.Linq.Extensions;
using Abp.UI;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.Authorization.Roles;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUsers;
using PMHelmutSchmidtPortal.HSUPortal.Products;
using PMHelmutSchmidtPortal.HSUPortal.Statistics.Dto;

namespace PMHelmutSchmidtPortal.HSUPortal.Statistics.DataExporters;

public class ProducersPlanningRequestsExporter : AbstractStatisticsExporter
{ 
    protected override string LocalisationPrefix => "Statistics.ProducerRequests";
    private readonly IProductProducerRepository _producerRequestsRepository;
    private readonly IUserRepository _userRepository;
    private readonly RoleManager _roleManager;

    public ProducersPlanningRequestsExporter(
        IProductProducerRepository producerRequestsRepository,
        IUserRepository userRepository,
        RoleManager roleManager
    )
    {
        _producerRequestsRepository = producerRequestsRepository;
        _userRepository = userRepository;
        _roleManager = roleManager;
    }
    public override async Task<List<Dictionary<string, object>>> GetData(StatisticsInputDto filter)
    {
        Role producersRole = await _roleManager.GetRoleByNameAsync(StaticRoleNames.Host.Producer);

        IList<User> producers = await _userRepository
                .GetAll()
                .Include(u => u.Roles)
                .Include(u => u.UserAddress)
                .Where(u => u.Roles.Any(ur => ur.RoleId == producersRole.Id))
                .WhereIf(!filter.FilterVar.IsNullOrWhiteSpace(), u => u.EmailAddress.Contains(filter.FilterVar))
                .ToListAsync();


        List<ProductProducer> producerRequestsList = await _producerRequestsRepository
            .GetAll()
            .Include(pp => pp.AssignedProducer)
            .Include(pp => pp.ProductionDetails.Product)
            .Where(pp => pp.ProductionDetails.ProductionDetailsType == ProductionDetailsType.Live)
            .WhereIf(!filter.FilterVar.IsNullOrWhiteSpace(), pp => pp.AssignedProducer.EmailAddress.Contains(filter.FilterVar))
            .WhereIf(filter.DateFrom.HasValue, pp => pp.CreationTime >= filter.DateFrom.Value)
            .WhereIf(filter.DateTo.HasValue, pp => pp.CreationTime <= filter.DateTo.Value)
            .ToListAsync();


        List<Dictionary<string, object>> items = new();

        foreach (User producer in producers)
        {
            List<ProductProducer> producerRequests = producerRequestsList.Where(pr => pr.AssignedProducer.Id == producer.Id).ToList();
            int producerRequestsCount = producerRequests.Count();
            int producerRequestsRejected = producerRequests.Count(pr => pr.AssignmentStatus == ProducerAssignmentStatus.Rejected);
            int producerRequestsAccepted = producerRequests.Count(pr => pr.AssignmentStatus == ProducerAssignmentStatus.Accepted);
            
            if (!producerRequests.Any())
            {
                items.Add(new Dictionary<string, object>()
                {
                    { L($"{LocalisationPrefix}.ProducerName"), producer.UserAddress.Name },
                    { L($"{LocalisationPrefix}.ProducerEmail"), producer.EmailAddress },
                    { L($"{LocalisationPrefix}.TotalRequests"), producerRequestsCount },
                    { L($"{LocalisationPrefix}.AcceptedRequests"), producerRequestsAccepted },
                    { L($"{LocalisationPrefix}.RejectedRequests"), producerRequestsRejected},
                    { L($"{LocalisationPrefix}.ProductName"), ""},
                    { L($"{LocalisationPrefix}.ProductNumber"), "" },
                    { L($"{LocalisationPrefix}.RequestDate"), "" },
                    { L($"{LocalisationPrefix}.RequestStatus"), "" },
                });
                continue;
            }

            items.AddRange(producerRequests.Select(producerRequest => new Dictionary<string, object>()
            {
                { L($"{LocalisationPrefix}.ProducerName"), producer.UserAddress.Name },
                { L($"{LocalisationPrefix}.ProducerEmail"), producer.EmailAddress },
                { L($"{LocalisationPrefix}.TotalRequests"), producerRequestsCount },
                { L($"{LocalisationPrefix}.AcceptedRequests"), producerRequestsAccepted },
                { L($"{LocalisationPrefix}.RejectedRequests"), producerRequestsRejected },
                { L($"{LocalisationPrefix}.ProductName"), producerRequest.ProductionDetails.Product.Name },
                { L($"{LocalisationPrefix}.ProductNumber"), producerRequest.ProductionDetails.Product.ProductNumber },
                { L($"{LocalisationPrefix}.RequestDate"), producerRequest.CreationTime.ToString("yyyy-MM-dd HH:mm:ss") },
                { L($"{LocalisationPrefix}.RequestStatus"), producerRequest.AssignmentStatus.ToString() },
            }));
        }

        if (items.Count == 0)
        {
            throw new UserFriendlyException(L("Error.Statistics.NoData"));
        }

        return items;
    }
}