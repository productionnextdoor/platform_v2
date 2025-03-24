using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.IdentityFramework;
using Abp.UI;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.Authorization.Roles;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUsers;
using PMHelmutSchmidtPortal.HSUPortal.Products;
using PMHelmutSchmidtPortal.HSUPortal.ShopOrders;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning;

namespace PMHelmutSchmidtPortal.HSUPortal.Users;

public class UserProfileManager : HSUDomainBaseService, IUserProfileManager
{
    private readonly IRepository<UserAddress> _addressRepository;
    private readonly IProducerInfoRepository _producerInfoRepository;
    private readonly UserManagerExtended _userManager;
    private readonly IProductRepository _productRepository;
    private readonly IOrderRepository _orderRepository;

    public UserProfileManager(
        IRepository<UserAddress> addressRepository,
        IProducerInfoRepository producerInfoRepository,
        UserManagerExtended userManager,
        IProductRepository productRepository,
        IOrderRepository orderRepository
    )
    {
        _addressRepository = addressRepository;
        _producerInfoRepository = producerInfoRepository;
        _userManager = userManager;
        _productRepository = productRepository;
        _orderRepository = orderRepository;
    }


    public async Task<User> UpdateUserBaseProfile(ProfileBase input, User user)
    {
        string[] splitName = input.ContactPersonFullName.Split(' ', 2);

        user.Name = splitName[0];
        user.Surname = splitName.Length > 1 ? splitName[1] : "";
        user.EmailAddress = input.Email.Trim();
        user.PhoneNumber = input.PhoneNumber;

        IdentityResult identityResult = await _userManager.UpdateAsync(user);
        identityResult.CheckErrors();
        return user;
    }

    public async Task<UserAddress> GetDevelopersAddress(long developerId)
    {
        return await _addressRepository.GetAll().SingleOrDefaultAsync(ua => ua.UserId == developerId);
    }

    public async Task<FullDeveloperProfileOutput> GetFullDeveloperProfile(long developerId)
    {
        FullDeveloperProfileOutput developerDto = ObjectMapper.Map<FullDeveloperProfileOutput>(await GetDevelopersAddress(developerId));
        if (developerDto != null)
        {
            SetDeveloperProductCountData(developerId, developerDto);
        }

        return developerDto;
    }
  
    public async Task<UserAddress> UpdateDevelopersProfile(long developerId, DeveloperProfile input)
    {
        return await UpdateDeveloperAddress(developerId, input);
    }

    public async Task<FullDeveloperProfileOutput> UpdateFullDevelopersProfile(User developer, FullDeveloperProfileInput input)
    {
        UserAddress address = await UpdateDeveloperAddress(developer.Id, input, input.CompanyName, input.Note);
        FullDeveloperProfileOutput developerDto = ObjectMapper.Map(address, ObjectMapper.Map<FullDeveloperProfileOutput>(developer));

        SetDeveloperProductCountData(developer.Id, developerDto);

        return developerDto;
    }

    public async Task<ProducerProfileOutput> GetProducerProfile(long producerId)
    {
        UserAddress address = await _addressRepository.GetAll().SingleOrDefaultAsync(ua => ua.UserId == producerId);
        ProducerInfo producerInfo = await _producerInfoRepository
            .GetProducerInfoWithTradesAndRatings()
            .SingleOrDefaultAsync(pi => pi.UserId == producerId);

        return ObjectMapper.Map(address, ObjectMapper.Map<ProducerProfileOutput>(producerInfo));
    }

    public async Task<FullProducerProfileOutput> GetFullProducerProfile(long producerId)
    {
        UserAddress address = await _addressRepository.GetAll().SingleOrDefaultAsync(ua => ua.UserId == producerId);
        ProducerInfo producerInfo = await _producerInfoRepository
            .GetProducerInfoWithTradesAndRatings()
            .SingleOrDefaultAsync(pi => pi.UserId == producerId);

        FullProducerProfileOutput profileDto = ObjectMapper.Map(address, ObjectMapper.Map<FullProducerProfileOutput>(producerInfo));
        await SetProducerProductCout(producerId, profileDto);
        return profileDto;
    }

    

    public async Task<FullProducerProfileOutput> UpdateProducersProfileWithRating(long producerId, FullProducerProfileInput input)
    {
        UserAddress address = await UpdateProducerAddress(producerId, input, input.Note);
        ProducerInfo producerInfo = await UpdateProducerInfo(producerId, input, input.Trade.TradeTypeId, input.ProducerRatings);

        FullProducerProfileOutput profileDto = ObjectMapper.Map<FullProducerProfileOutput>(producerInfo);
        await SetProducerProductCout(producerId, profileDto);
        return ObjectMapper.Map(address, profileDto);
    }

    public async Task<ProducerProfileOutput> UpdateProducersProfile(long producerId, ProducerProfile input)
    {
        UserAddress address = await UpdateProducerAddress(producerId, input);
        ProducerInfo producerInfo = await UpdateProducerInfo(producerId, input);

        return ObjectMapper.Map(address, ObjectMapper.Map<ProducerProfileOutput>(producerInfo));
    }
    
    public async Task<UserAddress> UpdateProducerAddress(long producerId, IProducerAddress userAddress, string adminNote = null)
    {
        UserAddress address = await _addressRepository.GetAll()
            .SingleOrDefaultAsync(ua => ua.UserId == producerId) ?? new UserAddress()
        {
            UserId = producerId
        };
        
        address = ObjectMapper.Map(userAddress,address);
        if (adminNote != null)
        {
            address.AdminNote = adminNote;
        }

        await _addressRepository.InsertOrUpdateAndGetIdAsync(address);

        return address;
    }

    public async Task<UserAddress> UpdateDeveloperAddress(long producerId, IDeveloperAddress userAddress, string companyName = "", string adminNote = null)
    {
        UserAddress address = await _addressRepository.GetAll()
            .SingleOrDefaultAsync(ua => ua.UserId == producerId) ?? new UserAddress()
        {
            UserId = producerId
        };
        
        address = ObjectMapper.Map(userAddress,address);
        
        if (!companyName.IsNullOrEmpty())
        {
            address.Name = companyName;
        }

        if (adminNote != null)
        {
            address.AdminNote = adminNote;
        }
        
        await _addressRepository.InsertOrUpdateAndGetIdAsync(address);
        return address;
    }

    public async Task<ProducerInfo> UpdateProducerInfo(long producerId, IProducerInfo producerInfoInput, int? tradeId = null, ICollection<ProducerRatingDto> producerRatings = null)
    {
        ProducerInfo producerInfo = await _producerInfoRepository
            .GetProducerInfoWithTradesAndRatings()
            .SingleOrDefaultAsync(pi => pi.UserId == producerId) ?? new ProducerInfo()
        {
            UserId = producerId,
        };
        producerInfo.NumberOfEmployees = producerInfoInput.NumberOfEmployees;
        producerInfo.Rate = producerInfoInput.Rate;

        if (tradeId.HasValue)
        {
            producerInfo.TradeTypeId = tradeId.Value;
        }

        if (producerRatings != null)
        {
            producerInfo.ProducerRatings.ToList().ForEach(pr =>
            {
                ProducerRatingDto dto = producerRatings.SingleOrDefault(dto => dto.RatingId == pr.Id);

                if (dto != null)
                {
                    pr.Rating = (int)dto.Rating;
                }
            });
        }

        await _producerInfoRepository.InsertOrUpdateAndGetIdAsync(producerInfo);
        
        //reload updated trade type
        await CurrentUnitOfWork.SaveChangesAsync();
        producerInfo = await _producerInfoRepository.GetProducerInfoWithTradesAndRatings()
            .SingleOrDefaultAsync(pi => pi.UserId == producerId);

        return producerInfo;
    }

    public async Task DeleteInvitedUser(long userId)
    {
        User invitedUser = await _userManager.GetUserByIdAsync(userId);

        if (invitedUser.Status != UserStatus.Invited)
        {
            throw new UserFriendlyException(L("Error.User.Delete.Title"), L("Error.User.Delete.Text"));
        }

        if (await _userManager.IsInRoleAsync(invitedUser, StaticRoleNames.Host.Producer))
        {
            UserAddress userAddress = await _addressRepository.SingleAsync(ua => ua.UserId == invitedUser.Id);
            
            //Anonymize
            userAddress.Name = PMHelmutSchmidtPortalConsts.AnonymityUserProfileString;
            await _addressRepository.UpdateAsync(userAddress);
            await _addressRepository.DeleteAsync(userAddress);
            
            ProducerInfo producerInfo = await _producerInfoRepository.SingleAsync(pi => pi.UserId == invitedUser.Id);
            await _producerInfoRepository.DeleteAsync(producerInfo);
        }
        
         
        //Anonymize
        string anonUserName = $"{PMHelmutSchmidtPortalConsts.AnonymityUserProfileString}_{Guid.NewGuid().ToString().AsSpan(0, 8)}";
        invitedUser.Surname = PMHelmutSchmidtPortalConsts.AnonymityUserProfileString;
        invitedUser.Name = PMHelmutSchmidtPortalConsts.AnonymityUserProfileString;
        invitedUser.EmailAddress = $"{anonUserName}@{PMHelmutSchmidtPortalConsts.AnonymityUserProfileString}.com";
        invitedUser.UserName = anonUserName ;
        invitedUser.InviteCode = null;
        await _userManager.UpdateAsync(invitedUser);

        await _userManager.DeleteAsync(invitedUser);
    }
    
    private void SetDeveloperProductCountData(long developerId, FullDeveloperProfileOutput developerDto)
    {
        List<ProductState> productStatuses = _productRepository
            .GetAll()
            .Where(p => p.AssignedDeveloperId == developerId)
            .Select(p => p.State)
            .ToList();
        developerDto.ProductDesigns = productStatuses.Count;
        developerDto.ProductsInShop = productStatuses.Count(ps => ps == ProductState.Live);
    }
    
    private async Task SetProducerProductCout(long producerId, FullProducerProfileOutput profileDto)
    {
        profileDto.ProductsInvolved = await _productRepository.GetProducerProductCount(producerId);
        profileDto.CurrentOrders = _orderRepository
            .GetAll()
            .Count(order => order.OrderProductionPlans
                .Any(plan => plan.OrderProductionPlanActions
                    .Any(action => action.PlanAction.ProducerId == producerId)));
        profileDto.ProductsProduced = _orderRepository
            .GetAll()
            .Count(order => order.Status == OrderStatus.Completed && order.OrderProductionPlans
                .Any(plan => plan.OrderProductionPlanActions
                    .Any(action => action.PlanAction.ProducerId == producerId && action.ActionStatus == ActionStatus.Completed)));
        
    }
}