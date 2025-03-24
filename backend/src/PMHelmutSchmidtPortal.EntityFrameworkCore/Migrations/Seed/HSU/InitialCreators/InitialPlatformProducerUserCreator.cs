using System;
using System.Linq;
using PMHelmutSchmidtPortal.Authorization.Roles;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.EntityFrameworkCore;

namespace PMHelmutSchmidtPortal.Migrations.Seed.HSU.InitialCreators;

public class InitialPlatformProducerUserCreator
{
    private readonly PMHelmutSchmidtPortalDbContext _context;

    public InitialPlatformProducerUserCreator(PMHelmutSchmidtPortalDbContext context)
    {
        _context = context;
    }

    public void Create()
    {
        CreatePlatformProducerUsers();
    }

    private void CreatePlatformProducerUsers()
    {
        Role platformProducerRoleForHost = _context.Roles.FirstOrDefault(r => r.Name == StaticRoleNames.Host.Producer);
        if (platformProducerRoleForHost == null)
        {
            Console.WriteLine("No producer role found");
            return;
        }

        //Default producer
        User defaultProducer = UserCreator.CreateUser(
            _context,
            UserConsts.DefaultPlatformProducerUserName,
            UserConsts.DefaultPlatformProducerUserName,
            UserConsts.DefaultPlatformProducerUserName,
            UserConsts.DefaultPlatformProducerEmail,
            Faker.Phone.Number(),
            UserConsts.DefaultPlatformPassword,
            platformProducerRoleForHost.Id
        );
        UserCreator.CreateProducersProfile(_context, defaultProducer);

        for (int i = 1; i < 25; i++)
        {
            string producerUserName = $"pm_producer_{i}";
            User producer = UserCreator.CreateUser(
                _context,
                producerUserName,
                Faker.Name.First(),
                Faker.Name.Last(),
                Faker.Internet.Email(),
                Faker.Phone.Number(),
                UserConsts.DefaultPlatformPassword,
                platformProducerRoleForHost.Id,
                i<20 
            );
            UserCreator.CreateProducersProfile(_context, producer);
        }
    }
}