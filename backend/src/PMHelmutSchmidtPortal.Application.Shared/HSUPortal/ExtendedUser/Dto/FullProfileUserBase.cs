namespace PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto
{
    public class FullProfileUserBase : ProfileBase
    {
        public long UserId { get; set; }
        public bool IsActive { get; set; }
    }
}