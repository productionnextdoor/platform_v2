using PMHelmutSchmidtPortal.Core.Dependency;
using PMHelmutSchmidtPortal.Mobile.MAUI.Services.UI;

namespace PMHelmutSchmidtPortal.Mobile.MAUI.Shared
{
    public class PMHelmutSchmidtPortalMainLayoutPageComponentBase : PMHelmutSchmidtPortalComponentBase
    {
        protected PageHeaderService PageHeaderService { get; set; }

        protected DomManipulatorService DomManipulatorService { get; set; }

        public PMHelmutSchmidtPortalMainLayoutPageComponentBase()
        {
            PageHeaderService = DependencyResolver.Resolve<PageHeaderService>();
            DomManipulatorService = DependencyResolver.Resolve<DomManipulatorService>();
        }

        protected async Task SetPageHeader(string title)
        {
            PageHeaderService.Title = title;
            PageHeaderService.ClearButton();
            await DomManipulatorService.ClearModalBackdrop(JS);
        }

        protected async Task SetPageHeader(string title, List<PageHeaderButton> buttons)
        {
            PageHeaderService.Title = title;
            PageHeaderService.SetButtons(buttons);
            await DomManipulatorService.ClearModalBackdrop(JS);
        }
    }
}
