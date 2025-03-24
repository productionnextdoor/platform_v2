using System.Collections.Generic;
using System.Threading.Tasks;
using Abp;
using PMHelmutSchmidtPortal.Dto;

namespace PMHelmutSchmidtPortal.Gdpr
{
    public interface IUserCollectedDataProvider
    {
        Task<List<FileDto>> GetFiles(UserIdentifier user);
    }
}
