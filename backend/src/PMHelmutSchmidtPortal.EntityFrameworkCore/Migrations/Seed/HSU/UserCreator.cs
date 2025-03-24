using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Authorization.Users;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.EntityFrameworkCore;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUsers;
using PMHelmutSchmidtPortal.HSUPortal.Users;

namespace PMHelmutSchmidtPortal.Migrations.Seed.HSU;

public static class UserCreator
{
    public static User CreateUser(PMHelmutSchmidtPortalDbContext context, string userName, string name, string surname, string emailAddress, string phoneNumber,string password, int roleId, bool isActive = true)
    {
        User user = context.Users.IgnoreQueryFilters().FirstOrDefault(u => u.TenantId == null && u.UserName == userName);

        if (user != null)
        {
            return user;
        }

        User newUser = new User
        {
            TenantId = null,
            UserName = userName,
            Name = name,
            Surname = surname,
            EmailAddress = emailAddress,
            PhoneNumber = phoneNumber,
            IsEmailConfirmed = true,
            ShouldChangePasswordOnNextLogin = false,
            IsActive = isActive,
            Password = password
        };

        newUser.SetNormalizedNames();

        user = context.Users.Add(newUser).Entity;
        context.SaveChanges();

        //Assign role to user
        context.UserRoles.Add(new UserRole(null, user.Id, roleId));
        context.SaveChanges();

        //Add user account
        context.UserAccounts.Add(new UserAccount
        {
            TenantId = null,
            UserId = user.Id,
            UserName = user.UserName,
            EmailAddress = user.EmailAddress
        });
        context.SaveChanges();
        return user;
    }

    public static void CreateDevelopersProfile(PMHelmutSchmidtPortalDbContext context, User developer)
    {
        CreateUserAddress(
            context,
            developer,
            Faker.Company.Name(),
            Faker.Address.CaProvince(),
            "Deutschland"
        );
    }

    public static void CreateProducersProfile(PMHelmutSchmidtPortalDbContext context, User producer)
    {
        CreateUserAddress(
            context,
            producer,
            Faker.Company.Name()
        );

        CreateProducersInfo(context, producer);
    }

    public static void CreateUserAddress(PMHelmutSchmidtPortalDbContext context, User user, string name, string region = null, string country = null)
    {
        if (context.UserAddresses.IgnoreQueryFilters().FirstOrDefault(ua => ua.UserId == user.Id) != null)
        {
            return;
        }
        
        context.UserAddresses.Add(
            new UserAddress()
            {
                User = user,
                Name = name,
                Street = Faker.Address.StreetAddress(),
                ZipCode = Faker.Address.ZipCode(),
                City = Faker.Address.City(),
                Region = region,
                Country = country
            }
        );
        context.SaveChanges();
    }

    public static void CreateProducersInfo(PMHelmutSchmidtPortalDbContext context, User producer)
    {
        if (context.ProducerInfos.IgnoreQueryFilters().FirstOrDefault(pi => pi.UserId == producer.Id) != null)
        {
            return;
        }

        Random rand = new();
        int skipper = rand.Next(0, context.WorkTypes.Count());
        TradeType tradeType = context.WorkTypes.OrderBy(wt => wt.Id).Skip(skipper).Take(1).ToList()[0];
        List<ProducerRating> productRatings = new()
        {
            new ProducerRating()
            {
                RatingType = context.RatingTypes.FirstOrDefault(rt => rt.Name == StaticProducerProfileProperties.ProducerRatings.Sustainability),
                Rating = rand.Next(0, 5)
            },
            new ProducerRating()
            {
                RatingType = context.RatingTypes.FirstOrDefault(rt => rt.Name == StaticProducerProfileProperties.ProducerRatings.FamilyFriendly),
                Rating = rand.Next(0, 5)
            },
            new ProducerRating()
            {
                RatingType = context.RatingTypes.FirstOrDefault(rt => rt.Name == StaticProducerProfileProperties.ProducerRatings.SocialCommitment),
                Rating = rand.Next(0, 5)
            }
        };

        context.ProducerInfos.Add(new ProducerInfo()
        {
            User = producer,
            TradeType = tradeType,
            NumberOfEmployees = 10,
            Rate = 99.99m,
            ProducerRatings = productRatings
        });

        context.SaveChanges();
    }
}