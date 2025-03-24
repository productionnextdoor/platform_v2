using System;
using System.Linq;
using PMHelmutSchmidtPortal.Authorization.Roles;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.EntityFrameworkCore;

namespace PMHelmutSchmidtPortal.Migrations.Seed.HSU.InitialCreators;

public class InitialPlatformDeveloperUserCreator
{
    private readonly PMHelmutSchmidtPortalDbContext _context;

    public InitialPlatformDeveloperUserCreator(PMHelmutSchmidtPortalDbContext context)
    {
        _context = context;
    }

    public void Create()
    {
        CreatePlatformDeveloperUsers();
    }

    private void CreatePlatformDeveloperUsers()
    {
        Role platformDeveloperRoleForHost = _context.Roles.FirstOrDefault(r => r.Name == StaticRoleNames.Host.Developer);
        if (platformDeveloperRoleForHost == null)
        {
            Console.WriteLine("No developer role found");
            return;
        }

        //Default developer
        User defaultDeveloper = UserCreator.CreateUser(
            _context,
            UserConsts.DefaultPlatformDeveloperUserName,
            UserConsts.DefaultPlatformDeveloperUserName,
            UserConsts.DefaultPlatformDeveloperUserName,
            UserConsts.DefaultPlatformDeveloperEmail,
            Faker.Phone.Number(),
            UserConsts.DefaultPlatformPassword,
            platformDeveloperRoleForHost.Id
        );

        UserCreator.CreateDevelopersProfile(_context, defaultDeveloper);

        for (int i = 1; i < 25; i++)
        {
            string developerUserName = $"pm_developer_{i}";
            User developer = UserCreator.CreateUser(
                _context,
                developerUserName,
                Faker.Name.First(),
                Faker.Name.Last(),
                Faker.Internet.Email(),
                Faker.Phone.Number(),
                UserConsts.DefaultPlatformPassword,
                platformDeveloperRoleForHost.Id, 
                i<20 
            );

            UserCreator.CreateDevelopersProfile(_context, developer);
        }
    }
}