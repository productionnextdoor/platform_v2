using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Authorization.Users;
using Abp.Configuration;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Abp.Linq.Extensions;
using Abp.Localization;
using Abp.Organizations;
using Abp.Runtime.Caching;
using Abp.ObjectMapping;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PMHelmutSchmidtPortal.Authorization.Roles;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUsers;
using PMHelmutSchmidtPortal.HSUPortal.Products;

namespace PMHelmutSchmidtPortal.HSUPortal.Users;

public class UserManagerExtended : UserManager
{
    private readonly RoleManager _roleManager;
    private readonly IUserRepositoryExtended _userRepository;
    private readonly IObjectMapper _objectMapper;
    private readonly IProductRepository _productRepository;

    public UserManagerExtended(
        UserStore userStore,
        IOptions<IdentityOptions> optionsAccessor,
        IPasswordHasher<User> passwordHasher,
        IEnumerable<IUserValidator<User>> userValidators,
        IEnumerable<IPasswordValidator<User>> passwordValidators,
        ILookupNormalizer keyNormalizer,
        IdentityErrorDescriber errors,
        IServiceProvider services,
        ILogger<UserManager> logger,
        RoleManager roleManager,
        IPermissionManager permissionManager,
        IUnitOfWorkManager unitOfWorkManager,
        ICacheManager cacheManager,
        IRepository<OrganizationUnit, long> organizationUnitRepository,
        IRepository<UserOrganizationUnit, long> userOrganizationUnitRepository,
        IOrganizationUnitSettings organizationUnitSettings,
        ISettingManager settingManager,
        ILocalizationManager localizationManager,
        IRepository<RecentPassword, Guid> recentPasswords,
        IRepository<UserLogin, long> userLoginRepository,
        IUserRepositoryExtended userRepository,
        IObjectMapper objectMapper,
        IProductRepository productRepository
        )
        : base(
            userStore,
            optionsAccessor,
            passwordHasher,
            userValidators,
            passwordValidators,
            keyNormalizer,
            errors,
            services,
            logger,
            roleManager,
            permissionManager,
            unitOfWorkManager,
            cacheManager,
            organizationUnitRepository,
            userOrganizationUnitRepository,
            organizationUnitSettings,
            settingManager,
            localizationManager,
            recentPasswords,
            userLoginRepository)
    {
        _roleManager = roleManager;
        _userRepository = userRepository;
        _objectMapper = objectMapper;
        _productRepository = productRepository;
    }

    public async Task<List<User>> GetAllDeveloperUsersList()
    {
        return (await GetUsersInRoleAsync(StaticRoleNames.Host.Developer))
            .Where(d => d.IsActive)
            .OrderBy(d => d.Name)
            .ThenBy(d => d.Surname)
            .ToList();
    }

    public async Task<PagedResultDto<DeveloperOverviewOutput>> GetAllDevelopersFiltered(DeveloperOverviewInput input, CancellationToken token)
    {
        Role developerRole = await _roleManager.GetRoleByNameAsync(StaticRoleNames.Host.Developer);
        IQueryable<User> query = await _userRepository.GetDevelopersFiltered(input, developerRole.Id);
        
        int totalDevelopers = await query.CountAsync(token);

        IReadOnlyCollection<User> developers = await query
            .OrderBy(input.Sorting)
            .PageBy(input)
            .ToListAsync(token);

        List<DeveloperProductCount> countDevelopersProduct = await _productRepository
            .GetProductsPerDevelopersCount(developers)
            .ToListAsync(token);

        List<DeveloperOverviewOutput> developersOverview = _objectMapper.Map<List<DeveloperOverviewOutput>>(developers);
        
        developersOverview.ForEach(dto =>
            dto.NumberOfProducts = countDevelopersProduct.SingleOrDefault(cp => cp.DeveloperId == dto.UserId)?.ProductCount ?? 0);

        return new PagedResultDto<DeveloperOverviewOutput>(totalDevelopers, developersOverview);
    }

    public async Task<PagedResultDto<ProductProducerListDto>> GetFilteredProductProducersList(ProductProducersInputDto input, int productionDetailsId)
    {
        return await _userRepository.GetProductProducers(input,productionDetailsId);
    }

    public async Task<PagedResultDto<ProducerOverviewOutput>> GetAllProducersFiltered(ProducerOverviewInput input, CancellationToken token)
    {
        return await _userRepository.GetAllProducers(input);
    }

    public IQueryable<User> GetProducersByIds(List<long> producersIds)
    {
        Role producerRole =  _roleManager.GetRoleByName(StaticRoleNames.Host.Producer);

        return _userRepository
            .GetAll()
            .Include(u => u.Roles)
            .Where(u => producersIds.Contains(u.Id) && u.Roles.Any(r => r.RoleId == producerRole.Id));

    }
    
    public IQueryable<User> GetAllPlatformAdmins()
    {
        Role adminRole =  _roleManager.GetRoleByName(StaticRoleNames.Host.PlatformAdmin);

        return _userRepository
            .GetAll()
            .Include(u => u.Roles)
            .Where(u => u.Roles.Any(r => r.RoleId == adminRole.Id));
    }
}