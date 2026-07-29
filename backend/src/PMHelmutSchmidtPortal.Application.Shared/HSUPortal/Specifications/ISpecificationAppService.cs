using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using PMHelmutSchmidtPortal.HSUPortal.Materials.Dto;

namespace PMHelmutSchmidtPortal.HSUPortal.Specifications;

public interface ISpecificationAppService : IApplicationService
{
    Task<List<SpecificationDto>> GetAll(int materialId);
    Task<SpecificationDto> Create(int materialId, CreateSpecificationInput input);
    Task<SpecificationDto> Update(int id, UpdateSpecificationInput input);
    Task Delete(int id);
}
