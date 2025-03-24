using System;
using System.Collections.Generic;
using Abp.Auditing;
using Abp.Authorization.Users;
using Abp.Extensions;
using Abp.Timing;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUsers;
using PMHelmutSchmidtPortal.HSUPortal.Users;

namespace PMHelmutSchmidtPortal.Authorization.Users
{
    /// <summary>
    /// Represents a user in the system.
    /// </summary>
    public class User : AbpUser<User>
    {
        public virtual Guid? ProfilePictureId { get; set; }

        public virtual bool ShouldChangePasswordOnNextLogin { get; set; }

        public DateTime? SignInTokenExpireTimeUtc { get; set; }

        public string SignInToken { get; set; }

        public string GoogleAuthenticatorKey { get; set; }
        public string RecoveryCode { get; set; }
        
        public List<UserOrganizationUnit> OrganizationUnits { get; set; }

        //Can add application specific user properties here
        
        public UserAddress UserAddress { get; set; }

        private UserStatus _status;
        public UserStatus Status
        {
            get => _status;
            set
            {
                _status = value;
                switch (_status)
                {
                    case UserStatus.Invited:
                    case UserStatus.InActive:
                        _isActive = false;
                        break;
                    case UserStatus.Active:
                        _isActive = true;
                        break;
                    default:
                        _isActive = false;
                        break;
                }
            }
        }

        private bool _isActive;
        public override bool IsActive
        {
            get => _isActive;
            set
            {
                _isActive = value;
                _status = _isActive ? UserStatus.Active : UserStatus.InActive;
            }
        }
        
        public string InviteCode { get; set; }

        public User()
        {
            IsLockoutEnabled = true;
            IsTwoFactorEnabled = true;
        }

        /// <summary>
        /// Creates admin <see cref="User"/> for a tenant.
        /// </summary>
        /// <param name="tenantId">Tenant Id</param>
        /// <param name="emailAddress">Email address</param>
        /// <param name="name">Name of admin user</param>
        /// <param name="surname">Surname of admin user</param>
        /// <returns>Created <see cref="User"/> object</returns>
        public static User CreateTenantAdminUser(int tenantId, string emailAddress, string name = null, string surname = null)
        {
            var user = new User
            {
                TenantId = tenantId,
                UserName = AdminUserName,
                Name = string.IsNullOrWhiteSpace(name) ? AdminUserName : name,
                Surname = string.IsNullOrWhiteSpace(surname) ? AdminUserName : surname,
                EmailAddress = emailAddress,
                Roles = new List<UserRole>(),
                OrganizationUnits = new List<UserOrganizationUnit>()
            };

            user.SetNormalizedNames();

            return user;
        }

        public override void SetNewPasswordResetCode()
        {
            /* This reset code is intentionally kept short.
             * It should be short and easy to enter in a mobile application, where user can not click a link.
             */
            PasswordResetCode = Guid.NewGuid().ToString("N").Truncate(10).ToUpperInvariant();
        }
        
        public void SetInviteCode()
        {
            InviteCode = Guid.NewGuid().ToString("N").Truncate(10).ToUpperInvariant();
        }

        public void Unlock()
        {
            AccessFailedCount = 0;
            LockoutEndDateUtc = null;
        }

        public void SetSignInToken()
        {
            SignInToken = Guid.NewGuid().ToString();
            SignInTokenExpireTimeUtc = Clock.Now.AddMinutes(1).ToUniversalTime();
        }
    }
}