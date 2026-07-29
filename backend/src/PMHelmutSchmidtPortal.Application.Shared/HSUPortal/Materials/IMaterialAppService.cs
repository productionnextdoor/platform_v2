using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using PMHelmutSchmidtPortal.HSUPortal.Materials.Dto;

namespace PMHelmutSchmidtPortal.HSUPortal.Materials;

public interface IMaterialAppService : IApplicationService
{
    Task<List<MaterialDto>> GetAll();
    Task<MaterialDto> Create(CreateMaterialInput input);
    Task<MaterialDto> Update(int id, UpdateMaterialInput input);
    Task Delete(int id);
}
