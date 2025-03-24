using Abp.AutoMapper;
using PMHelmutSchmidtPortal.Authorization.Users.Dto;

namespace PMHelmutSchmidtPortal.Mobile.MAUI.Models.User
{
    [AutoMapFrom(typeof(CreateOrUpdateUserInput))]
    public class UserCreateOrUpdateModel : CreateOrUpdateUserInput
    {

    }
}
