using PMHelmutSchmidtPortal.Models.NavigationMenu;

namespace PMHelmutSchmidtPortal.Services.Navigation
{
    public interface IMenuProvider
    {
        List<NavigationMenuItem> GetAuthorizedMenuItems(Dictionary<string, string> grantedPermissions);
    }
}