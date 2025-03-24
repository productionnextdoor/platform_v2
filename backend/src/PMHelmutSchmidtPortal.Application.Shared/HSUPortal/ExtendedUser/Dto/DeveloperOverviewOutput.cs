using PMHelmutSchmidtPortal.HSUPortal.ExtendedUsers;

namespace PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto
{
    public class DeveloperOverviewOutput : FullProfileUserBase
    {
        public int NumberOfProducts { get; set; }
        
        public UserStatus Status { get; set; }
        
    }
}