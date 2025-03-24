using Microsoft.AspNetCore.Components;
using PMHelmutSchmidtPortal.Authorization.Users.Profile;
using PMHelmutSchmidtPortal.Authorization.Users.Profile.Dto;
using PMHelmutSchmidtPortal.Core.Dependency;
using PMHelmutSchmidtPortal.Core.Threading;
using PMHelmutSchmidtPortal.Mobile.MAUI.Models.Settings;
using PMHelmutSchmidtPortal.Mobile.MAUI.Shared;

namespace PMHelmutSchmidtPortal.Mobile.MAUI.Pages.MySettings
{
    public partial class ChangePasswordModal : ModalBase
    {
        [Parameter] public EventCallback OnSave { get; set; }

        public override string ModalId => "change-password";

        public ChangePasswordModel ChangePasswordModel { get; set; } = new ChangePasswordModel();

        private readonly IProfileAppService _profileAppService;

        public ChangePasswordModal()
        {
            _profileAppService = DependencyResolver.Resolve<IProfileAppService>();
        }

        protected virtual async Task Save()
        {
            await SetBusyAsync(async () =>
            {
                await WebRequestExecuter.Execute(async () =>
                {
                    await _profileAppService.ChangePassword(new ChangePasswordInput
                    {
                        CurrentPassword = ChangePasswordModel.CurrentPassword,
                        NewPassword = ChangePasswordModel.NewPassword
                    });

                }, async () =>
                {
                    if (ChangePasswordModel.IsChangePasswordDisabled)
                    {
                        return;
                    }

                    await OnSave.InvokeAsync();
                });
            });
        }

        protected virtual async Task Cancel()
        {
            await Hide();
        }
    }
}
