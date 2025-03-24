using System;
using System.Linq;
using Abp;
using Abp.Notifications;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.Authorization.Roles;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.EntityFrameworkCore;
using PMHelmutSchmidtPortal.Notifications;

namespace PMHelmutSchmidtPortal.Migrations.Seed.HSU.DefaultCreators;

public class DefaultPortalAdminCreator
{
    private readonly PMHelmutSchmidtPortalDbContext _context;

    public DefaultPortalAdminCreator(PMHelmutSchmidtPortalDbContext context)
    {
        _context = context;
    }

    public void Create()
    {
        CreatePlatformAdminUsers();
    }
    
    private void CreatePlatformAdminUsers()
    {
        Role platformAdminRoleForHost = _context.Roles.FirstOrDefault(r => r.Name == StaticRoleNames.Host.PlatformAdmin);
        if (platformAdminRoleForHost == null)
        {
            Console.WriteLine("No admin role found");
            return;
        }

        User portalAdminUser = _context.Users
            .IgnoreQueryFilters()
            .FirstOrDefault(u => u.TenantId == null && u.Name == UserConsts.DefaultPlatformAdminUserName);

        if (portalAdminUser != null) return;
       
        portalAdminUser = UserCreator.CreateUser(
            _context,
            UserConsts.DefaultPlatformAdminUserName,
            UserConsts.DefaultPlatformAdminUserName,
            UserConsts.DefaultPlatformAdminUserName,
            UserConsts.DefaultPlatformAdminEmail,
            Faker.Phone.Number(),
            UserConsts.DefaultPlatformPassword,
            platformAdminRoleForHost.Id
        );
        
        //Notification subscriptions
        if (portalAdminUser == null) return;
        _context.NotificationSubscriptions.Add(new NotificationSubscriptionInfo(SequentialGuidGenerator.Instance.Create(), null, portalAdminUser.Id, AppNotificationNames.NewUserRegistered));
        _context.SaveChanges();
    }
}