using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Threading.Tasks;
using Abp.Authorization.Users;
using Abp.Domain.Repositories;
using Abp.IdentityFramework;
using Abp.UI;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.Authorization.Roles;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUsers;

namespace PMHelmutSchmidtPortal.HSUPortal.Users;

public class RegistrationManager : HSUDomainBaseService, IRegistrationManager
{
    private readonly UserManagerExtended _userManager;
    private readonly IPasswordHasher<User> _passwordHasher;
    private readonly RoleManager _roleManager;
    private readonly IRegistrationEmailer _registrationEmailer;
    private readonly IUserProfileManager _profileManager;
    private readonly IRepository<UserAddress> _addressRepository;
    private readonly IProducerInfoRepository _producerInfoRepository;
    private readonly IRepository<TradeType> _tradeRepository;
    private readonly IRepository<RatingType> _ratingRepository;

    public RegistrationManager(
        UserManagerExtended userManager,
        IPasswordHasher<User> passwordHasher,
        RoleManager roleManager,
        IRegistrationEmailer registrationEmailer,
        IUserProfileManager profileManager,
        IRepository<UserAddress> addressRepository,
        IProducerInfoRepository producerInfoRepository,
        IRepository<TradeType> tradeRepository,
        IRepository<RatingType> ratingRepository)
    {
        _userManager = userManager;
        _passwordHasher = passwordHasher;
        _roleManager = roleManager;
        _registrationEmailer = registrationEmailer;
        _profileManager = profileManager;
        _addressRepository = addressRepository;
        _producerInfoRepository = producerInfoRepository;
        _tradeRepository = tradeRepository;
        _ratingRepository = ratingRepository;
    }

    public async Task SendDeveloperInvitation(DeveloperInviteDto input)
    {
        User developer = await CreateBaseUser(input, StaticRoleNames.Host.Developer);

        //Send invitation email
        developer.SetInviteCode();
        await _registrationEmailer.SendInvitation(developer, StaticRoleNames.Host.Developer);
    }

    public async Task RegisterDeveloper(DevelopersRegistrationInput input, User developer, int? tenantId = null)
    {
        await RegisterBaseUser(input, developer, input.Password, tenantId);
        await _profileManager.UpdateDeveloperAddress(developer.Id, input, input.CompanyName);
        developer.Status = UserStatus.Active;
        //remove the invite code to not be able to use it anymore
        developer.InviteCode = null;
    }

    public async Task SendProducerInvitation(ProducerInviteDto input)
    {
        User producer = await CreateBaseUser(input, StaticRoleNames.Host.Producer);

        await _addressRepository.InsertOrUpdateAndGetIdAsync(new UserAddress
        {
            UserId = producer.Id,
            Name = input.CompanyName
        });

        TradeType tradeType = await _tradeRepository.GetAsync(input.TradeType.TradeTypeId);

        if (tradeType == null)
        {
            throw new UserFriendlyException(L("Error.User.Invite.WrongTrade.Title"), L("Error.User.Invite.WrongTrade.Text"));
        }

        await _producerInfoRepository.InsertOrUpdateAndGetIdAsync(new ProducerInfo
        {
            UserId = producer.Id,
            TradeType = tradeType
        });

        //Send invitation email
        producer.SetInviteCode();
        await _registrationEmailer.SendInvitation(producer, StaticRoleNames.Host.Producer);
    }

    public async Task<ProducerRegistrationOutput> GetProducerForRegistration(User producer)
    {
        UserAddress address = await _addressRepository.GetAll().SingleOrDefaultAsync(ua => ua.UserId == producer.Id);
        ProducerInfo producerInfo = await _producerInfoRepository
            .GetProducerInfoWithTradesAndRatings()
            .SingleOrDefaultAsync(pi => pi.UserId == producer.Id);

        ProducerRegistrationOutput producerRegistrationOutput = ObjectMapper.Map<ProducerRegistrationOutput>(producer);
        producerRegistrationOutput = ObjectMapper.Map(address, producerRegistrationOutput);

        return ObjectMapper.Map(producerInfo, producerRegistrationOutput);
    }

    public async Task RegisterProducer(ProducerRegistrationInput input, User producer, int? tenantId)
    {
        await RegisterBaseUser(input, producer, input.Password, tenantId);
        await _profileManager.UpdateProducerAddress(producer.Id, input, input.CompanyName);
        ProducerInfo producerInfo = await _profileManager.UpdateProducerInfo(producer.Id, input);

        List<RatingType> ratings = await _ratingRepository.GetAll().ToListAsync();

        ratings.ForEach(rating =>
        {
            producerInfo.ProducerRatings.Add(
                new ProducerRating
                {
                    RatingType = rating
                });
        });

        producer.Status = UserStatus.Active;
        //remove the invite code to not be able to use it anymore
        producer.InviteCode = null;
    }

    private static string GetUniqueUserName(string userName)
    {
        return string.Concat(userName
            , "_"
            , Guid.NewGuid().ToString().AsSpan(0, 4));
    }

    private async Task<User> CreateBaseUser(IBaseUserInvite input, string userRole)
    {
        string[] splitName = input.FullName.Split(' ', 2);
        string[] splitEmail = input.Email.Split('@', 2);

        User developer = new User
        {
            Name = splitName[0],
            Surname = splitName.Length > 1 ? splitName[1] : "",
            EmailAddress = input.Email,
            UserName = GetUniqueUserName(splitEmail[0]),
            Status = UserStatus.Invited
        };

        string randomPassword = await _userManager.CreateRandomPassword();
        developer.Password = _passwordHasher.HashPassword(developer, randomPassword);

        //Assign role
        developer.Roles = new Collection<UserRole>();
        Role role = await _roleManager.GetRoleByNameAsync(userRole);
        developer.Roles.Add(new UserRole(null, developer.Id, role.Id));
        IdentityResult identityResult = await _userManager.CreateAsync(developer);
        identityResult.CheckErrors();
        await CurrentUnitOfWork.SaveChangesAsync(); //To get new user's Id.

        return developer;
    }

    private async Task RegisterBaseUser(ProfileBase input, User developer, string password, int? tenantId)
    {
        await _userManager.InitializeOptionsAsync(tenantId);
        IdentityResult identityResult = await _userManager.ChangePasswordAsync(developer, password);
        identityResult.CheckErrors();
        await _profileManager.UpdateUserBaseProfile(input, developer);
    }
}