using Abp.AutoMapper;
using PMHelmutSchmidtPortal.Authorization.Users.Dto;

namespace PMHelmutSchmidtPortal.Mobile.MAUI.Models.User
{
    [AutoMapFrom(typeof(UserListDto))]
    public class UserListModel : UserListDto
    {
        public string Photo { get; set; }

        public string FullName => Name + " " + Surname;
    }
}
