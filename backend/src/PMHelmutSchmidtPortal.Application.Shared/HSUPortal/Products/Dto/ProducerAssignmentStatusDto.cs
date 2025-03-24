using System;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUsers;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Dto
{
    public class ProducerAssignmentStatusDto
    {
        public ProducerAssignmentStatus AssignmentStatus { get; set; }
        public DateTime? Deadline { get; set; }
    }
}