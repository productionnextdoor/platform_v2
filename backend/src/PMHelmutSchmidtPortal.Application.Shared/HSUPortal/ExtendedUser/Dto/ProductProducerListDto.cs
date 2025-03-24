using PMHelmutSchmidtPortal.HSUPortal.ExtendedUsers;

namespace PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto
{
    public class ProductProducerListDto
    {
        public long ProducerId { get; set; }
        
        public string CompanyName { get; set; }
        
        public TradeTypeDto Trade { get; set; }
        public ProducerAssignmentStatus? Status { get; set; }
    }
}