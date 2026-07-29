using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using PMHelmutSchmidtPortal.HSUPortal.Materials.Dto;

namespace PMHelmutSchmidtPortal.HSUPortal.Specifications;

public interface ISpecificationGroupAppService : IApplicationService
{
    Task<List<SpecificationGroupDto>> GetAll(int materialGroupId);
    Task<SpecificationGroupDto> Create(int materialGroupId, CreateSpecificationGroupInput input);
    Task<SpecificationGroupDto> Update(int id, UpdateSpecificationGroupInput input);
    Task Delete(int id);
}
