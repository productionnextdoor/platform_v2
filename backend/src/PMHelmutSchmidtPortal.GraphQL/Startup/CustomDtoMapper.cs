using AutoMapper;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.Dto;

namespace PMHelmutSchmidtPortal.Startup
{
    public static class CustomDtoMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<User, UserDto>()
                .ForMember(dto => dto.Roles, options => options.Ignore())
                .ForMember(dto => dto.OrganizationUnits, options => options.Ignore());
        }
    }
}