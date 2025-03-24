using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Authorization;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.Authorization;
using PMHelmutSchmidtPortal.Authorization.Roles;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.HSUPortal.Extensions;
using PMHelmutSchmidtPortal.HSUPortal.Products;
using PMHelmutSchmidtPortal.HSUPortal.Users;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ProductionState;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ProductionSteps;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning
{
    public class ProductGraphAppService : HsuBaseAppService, IProductGraphAppService
    {
        private readonly IProductionDetailsRepository _productionDetailsRepository;
        private readonly UserManagerExtended _userManager;

        public ProductGraphAppService(IProductionDetailsRepository productionDetailsRepository, UserManagerExtended userManager)
        {
            _productionDetailsRepository = productionDetailsRepository;
            _userManager = userManager;
        }

        [AbpAuthorize(AppPermissions.Hsu_ValueChainPlanning_GetProductGraphData)]
        public async Task<ProductGraphDataDto> GetProductGraphData(int productionDetailsId)
        {
            IQueryable<ProductionDetails> query = _productionDetailsRepository
                .Get(productionDetailsId);

            User currentUser = await GetCurrentUserAsync(); 
            if (await _userManager.IsInRoleAsync(currentUser, StaticRoleNames.Host.Producer))
            {
                query = query.Where(details => details.AssignedProducers.Any(producer => producer.AssignedProducerId == currentUser.Id));
            }
            
            ProductionDetails productionDetails = await query
                .IncludeProductionStates()
                .IncludeProductionSteps()
                .SingleAsync();
                

            return new ProductGraphDataDto
            {
                ProductId = productionDetails.ProductId,
                ProductStates = ObjectMapper.Map<List<ProductionStateDto>>(productionDetails.ProductionStates),
                ProductSteps = ObjectMapper.Map<List<ProductionStepDto>>(productionDetails.ProductionSteps)
            };
        }
       
    }
}