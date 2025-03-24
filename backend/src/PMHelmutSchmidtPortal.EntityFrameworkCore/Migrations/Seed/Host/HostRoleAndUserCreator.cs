using System.Linq;
using Abp;
using Abp.Authorization.Users;
using Abp.Notifications;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.Authorization.Roles;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.EntityFrameworkCore;
using PMHelmutSchmidtPortal.Notifications;

namespace PMHelmutSchmidtPortal.Migrations.Seed.Host
{
    public class HostRoleAndUserCreator
    {
        private readonly PMHelmutSchmidtPortalDbContext _context;

        public HostRoleAndUserCreator(PMHelmutSchmidtPortalDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            CreateHostRoleAndUsers();
        }

        private void CreateHostRoleAndUsers()
        {
            #region PlatformAdmin 
            //PlatformAdmin role for host
            GetOrCreateRole(StaticRoleNames.Host.PlatformAdmin);
            #endregion
            
            #region PM_Developer
            //Developer role for host
            GetOrCreateRole(StaticRoleNames.Host.Developer);
            #endregion
            
            #region PM_Producer
            //Developer role for host
            GetOrCreateRole(StaticRoleNames.Host.Producer);
            #endregion

            #region DefaulAdmin
            
            //Admin role for host

            Role adminRoleForHost = _context.Roles.IgnoreQueryFilters().FirstOrDefault(r => r.TenantId == null && r.Name == StaticRoleNames.Host.Admin);
            if (adminRoleForHost == null)
            {
                adminRoleForHost = _context.Roles.Add(new Role(null, StaticRoleNames.Host.Admin, StaticRoleNames.Host.Admin) { IsStatic = true, IsDefault = true }).Entity;
                _context.SaveChanges();
            }

            //admin user for host

            User adminUserForHost = _context.Users.IgnoreQueryFilters().FirstOrDefault(u => u.TenantId == null && u.UserName == AbpUserBase.AdminUserName);
            if (adminUserForHost == null)
            {
                User user = new User
                {
                    TenantId = null,
                    UserName = AbpUserBase.AdminUserName,
                    Name = "admin",
                    Surname = "admin",
                    EmailAddress = "admin@aspnetzero.com",
                    IsEmailConfirmed = true,
                    ShouldChangePasswordOnNextLogin = false,
                    IsActive = true,
                    Password = UserConsts.DefaultPlatformPassword
                };

                user.SetNormalizedNames();

                adminUserForHost = _context.Users.Add(user).Entity;
                _context.SaveChanges();

                //Assign Admin role to admin user
                _context.UserRoles.Add(new UserRole(null, adminUserForHost.Id, adminRoleForHost.Id));
                _context.SaveChanges();

                //User account of admin user
                _context.UserAccounts.Add(new UserAccount
                {
                    TenantId = null,
                    UserId = adminUserForHost.Id,
                    UserName = AbpUserBase.AdminUserName,
                    EmailAddress = adminUserForHost.EmailAddress
                });

                _context.SaveChanges();

                //Notification subscriptions
                _context.NotificationSubscriptions.Add(new NotificationSubscriptionInfo(SequentialGuidGenerator.Instance.Create(), null, adminUserForHost.Id, AppNotificationNames.NewTenantRegistered));
                _context.NotificationSubscriptions.Add(new NotificationSubscriptionInfo(SequentialGuidGenerator.Instance.Create(), null, adminUserForHost.Id, AppNotificationNames.NewUserRegistered));

                _context.SaveChanges();
            }
            
            #endregion
        }
        
        private void GetOrCreateRole(string roleName)
        {
            _ = _context.Roles
                    .IgnoreQueryFilters()
                    .FirstOrDefault(r => r.TenantId == null && r.Name == roleName) 
                ?? _context.Roles.Add(
                    new Role(null, roleName, roleName) { IsStatic = true }
                ).Entity;
            
            _context.SaveChanges();
        }
    }
}