using PMHelmutSchmidtPortal.HSUPortal.ExtendedUsers;

namespace PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto
{
    public class FullDeveloperProfileOutput: FullDeveloperProfileInput
    {
        public int ProductDesigns { get; set; }
        public int ProductsInShop { get; set; }
        public UserStatus Status { get; set; }
    }
}