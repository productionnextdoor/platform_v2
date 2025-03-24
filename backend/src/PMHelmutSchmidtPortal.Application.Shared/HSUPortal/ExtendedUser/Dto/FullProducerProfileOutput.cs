using PMHelmutSchmidtPortal.HSUPortal.ExtendedUsers;

namespace PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto
{
    public class FullProducerProfileOutput: FullProducerProfileInput
    {
        public int ProductsInvolved { get; set; }
        public int ProductsProduced { get; set; }
        public int CurrentOrders { get; set; }
        public UserStatus Status { get; set; }
    }
}