using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Threading;
using Abp.UI;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.Authorization;
using PMHelmutSchmidtPortal.Authorization.Roles;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto;
using PMHelmutSchmidtPortal.HSUPortal.Extensions;
using PMHelmutSchmidtPortal.HSUPortal.Products;
using PMHelmutSchmidtPortal.HSUPortal.Users;

namespace PMHelmutSchmidtPortal.HSUPortal.ExtendedUser
{
    [AbpAuthorize]
    public class UserExtendedAppService : HsuBaseAppService, IUserExtendedAppService
    {
        private readonly UserManagerExtended _userManager;
        private readonly IUserProfileManager _userProfileManager;
        private readonly IRepository<TradeType> _tradeRepository;
        private readonly IProductionDetailsRepository _productionDetailsRepository;
        private readonly ICancellationTokenProvider _cancellationTokenProvider;

        public UserExtendedAppService(
            UserManagerExtended userManager,
            IUserProfileManager userProfileManager,
            IRepository<TradeType> tradeRepository,
            IProductionDetailsRepository productionDetailsRepository,
            ICancellationTokenProvider cancellationTokenProvider
        )
        {
            _userManager = userManager;
            _userProfileManager = userProfileManager;
            _tradeRepository = tradeRepository;
            _productionDetailsRepository = productionDetailsRepository;
            _cancellationTokenProvider = cancellationTokenProvider;
        }

        public async Task<AdminProfileDto> GetCurrentAdminProfile()
        {
            return ObjectMapper.Map<AdminProfileDto>(await GetUser(new List<string>{StaticRoleNames.Host.PlatformAdmin, StaticRoleNames.Host.Admin}));
        }

        public async Task<AdminProfileDto> UpdateCurrentAdminProfile(AdminProfileDto input)
        {
            User admin = await  GetUser(new List<string>{StaticRoleNames.Host.PlatformAdmin, StaticRoleNames.Host.Admin});

            string[] splitName = input.FullName.Split(' ', 2);
            admin.Name = splitName[0];
            admin.Surname = splitName.Length > 1 ? splitName[1] : "";
            admin.EmailAddress = input.EmailAddress.Trim();
            await _userManager.UpdateAsync(admin);

            return ObjectMapper.Map<AdminProfileDto>(admin);
        }

        [AbpAuthorize(AppPermissions.Hsu_ExtendedUser_GetDevelopers)]
        public async Task<List<DeveloperListDto>> GetAllDevelopers()
        {
            return ObjectMapper.Map<List<DeveloperListDto>>(await _userManager.GetAllDeveloperUsersList());
        }

        [AbpAuthorize(AppPermissions.Hsu_ExtendedUser_GetDevelopers)]
        public Task<PagedResultDto<DeveloperOverviewOutput>> GetDevelopersFiltered(DeveloperOverviewInput input)
        {
            return _userManager.GetAllDevelopersFiltered(input, _cancellationTokenProvider.Token);
        }

        [AbpAuthorize(AppPermissions.Hsu_ExtendedUser_Profiles_Developer_Get)]
        public async Task<FullDeveloperProfileOutput> GetDevelopersProfile(long developerId)
        {
            User developer = await GetUser(new List<string>{StaticRoleNames.Host.Developer}, developerId);
            FullDeveloperProfileOutput profileDto = await _userProfileManager.GetFullDeveloperProfile(developer.Id);

            return ObjectMapper.Map(developer, profileDto);
        }

        [AbpAuthorize(AppPermissions.Hsu_ExtendedUser_Profiles_Developer_Update)]
        public async Task<FullDeveloperProfileOutput> UpdateDeveloperProfile(FullDeveloperProfileInput input)
        {
            User developer = await _userProfileManager.UpdateUserBaseProfile(input, await GetUser(new List<string>{StaticRoleNames.Host.Developer}, input.UserId));
            developer.IsActive = input.IsActive;
            return await _userProfileManager.UpdateFullDevelopersProfile(developer, input);
        }

        public async Task<DeveloperProfileOutput> GetCurrentDevelopersProfile()
        {
            User developer = await GetUser(new List<string>{StaticRoleNames.Host.Developer});
            UserAddress userAddress = await _userProfileManager.GetDevelopersAddress(developer.Id);
            return ObjectMapper.Map(userAddress, ObjectMapper.Map<DeveloperProfileOutput>(developer));
        }

        public async Task<DeveloperProfileOutput> UpdateCurrentDevelopersProfile(DeveloperProfile input)
        {
            User developer = await _userProfileManager.UpdateUserBaseProfile(input, await GetUser(new List<string>{StaticRoleNames.Host.Developer}));
            UserAddress userAddress = await _userProfileManager.UpdateDevelopersProfile(developer.Id, input);

            await CurrentUnitOfWork.SaveChangesAsync();
            return ObjectMapper.Map(userAddress, ObjectMapper.Map<DeveloperProfileOutput>(developer));
        }

        [AbpAuthorize(AppPermissions.Hsu_ExtendedUser_GetProducers)]
        public Task<PagedResultDto<ProducerOverviewOutput>> GetProducersFiltered(ProducerOverviewInput input)
        {
            return _userManager.GetAllProducersFiltered(input, _cancellationTokenProvider.Token);
        }

        [AbpAuthorize(AppPermissions.Hsu_ExtendedUser_GetProductProducers)]
        public async Task<ProductProducerOutput> GetProductProducers(ProductProducersInputDto input)
        {
            ProductionDetails productionDetails = await _productionDetailsRepository
                .GetAll()
                .Where(details => details.Id == input.ProductionDetailsId && details.ProductId == input.ProductId)
                .SingleAsync();

            return new ProductProducerOutput
            {
                ProcessingDeadline = productionDetails.ProcessingDeadline,
                Producers = await _userManager.GetFilteredProductProducersList(input, productionDetails.Id)
            };
        }

        [AbpAuthorize(AppPermissions.Hsu_ExtendedUser_Profiles_Producer_Get)]
        public async Task<ProducerProfileForEditOutput> GetProducerProfile(long producerId)
        {
            User producer = await GetUser(new List<string>{StaticRoleNames.Host.Producer}, producerId);

            return new ProducerProfileForEditOutput()
            {
                ProducerProfile = ObjectMapper.Map(producer, await _userProfileManager.GetFullProducerProfile(producerId)),
                TradeTypes = ObjectMapper.Map<List<TradeTypeDto>>(await _tradeRepository.GetAll().ToListAsync())
            };
        }

        [AbpAuthorize(AppPermissions.Hsu_ExtendedUser_Profiles_Producer_Update)]
        public async Task<ProducerProfileForEditOutput> UpdateProducerProfile(FullProducerProfileInput input)
        {
            User producer = await _userProfileManager.UpdateUserBaseProfile(input, await GetUser(new List<string>{StaticRoleNames.Host.Producer}, input.UserId));

            producer.IsActive = input.Rate != 0 && input.IsActive;

            FullProducerProfileOutput producerProfile = await _userProfileManager.UpdateProducersProfileWithRating(producer.Id, input);

            return new ProducerProfileForEditOutput
            {
                ProducerProfile = ObjectMapper.Map(producer, producerProfile),
                TradeTypes = ObjectMapper.Map<List<TradeTypeDto>>(await _tradeRepository.GetAll().ToListAsync())
            };
        }

        public async Task<ProducerProfileOutput> GetCurrentProducerProfile()
        {
            User producer = await GetUser(new List<string> { StaticRoleNames.Host.Producer});

            return ObjectMapper.Map(producer, await _userProfileManager.GetProducerProfile(producer.Id));
        }

        public async Task<ProducerProfileOutput> UpdateCurrentProducerProfile(ProducerProfile input)
        {
            User producer = await _userProfileManager.UpdateUserBaseProfile(input, await GetUser(new List<string>{StaticRoleNames.Host.Producer}));
            ProducerProfileOutput producerProfile = await _userProfileManager.UpdateProducersProfile(producer.Id, input);

            await CurrentUnitOfWork.SaveChangesAsync();

            return ObjectMapper.Map(producer, producerProfile);
        }

        [AbpAuthorize(AppPermissions.Hsu_ExtendedUser_DeleteInvitedUser)]
        public async Task DeleteInvitedUser(long userId)
        {
            await _userProfileManager.DeleteInvitedUser(userId);
        }

        private async Task<User> GetUser(List<string> roleNames, long? userId = null)
        {
            User currentUser = userId == null ? await GetCurrentUserAsync() : await _userManager.GetUserByIdAsync(userId.Value);
            bool isInRole = false;
            foreach (string roleName in roleNames)
            {
                if (!await _userManager.IsInRoleAsync(currentUser, roleName)) continue;
                isInRole = true;
                break;
            }

            if (!isInRole)
            {
                throw new UserFriendlyException(
                    L("Error.User.NotARoleName.Title", L($"RoleName.{roleNames[0]}")),
                    L($"Error.User.NotARoleName.Text", L($"RoleName.{roleNames[0]}")));
            }

            return currentUser;
        }
    }
}