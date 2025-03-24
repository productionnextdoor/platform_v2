using PMHelmutSchmidtPortal.HSUPortal.ExtendedUsers;

namespace PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto
{
    public class ProducerOverviewOutput : FullProfileUserBase
    {
        public string CompanyName { get; set; }
        public TradeTypeDto Trade { get; set; }
        
        public UserStatus Status { get; set; }
    }
}