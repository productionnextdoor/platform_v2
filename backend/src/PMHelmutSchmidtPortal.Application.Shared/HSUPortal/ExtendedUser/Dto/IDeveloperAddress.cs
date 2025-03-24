namespace PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto
{
    public interface IDeveloperAddress
    {
        string Street { get; set; }
        string ZipCode { get; set; }
        string City { get; set; }
        string Region { get; set; }
        string Country { get; set; }
    }
}