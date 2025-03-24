using System.ComponentModel.DataAnnotations;

namespace PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto
{
    public interface IProducerAddress
    {
        [StringLength(200)]
        string CompanyName { get; set; }
        string Street { get; set; }
        string ZipCode { get; set; }
        string City { get; set; }
    }
}
