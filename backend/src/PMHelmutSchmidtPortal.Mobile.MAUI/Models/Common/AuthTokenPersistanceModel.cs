using Abp.AutoMapper;
using PMHelmutSchmidtPortal.Sessions.Dto;

namespace PMHelmutSchmidtPortal.Models.Common
{
    [AutoMapFrom(typeof(ApplicationInfoDto)),
     AutoMapTo(typeof(ApplicationInfoDto))]
    public class ApplicationInfoPersistanceModel
    {
        public string Version { get; set; }

        public DateTime ReleaseDate { get; set; }
    }
}