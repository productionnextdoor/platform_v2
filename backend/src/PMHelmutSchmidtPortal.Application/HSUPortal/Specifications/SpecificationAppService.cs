using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.Authorization;
using PMHelmutSchmidtPortal.HSUPortal.Materials;
using PMHelmutSchmidtPortal.HSUPortal.Materials.Dto;
using PMHelmutSchmidtPortal.HSUPortal.Products.Details;

namespace PMHelmutSchmidtPortal.HSUPortal.Specifications;

[AbpAuthorize]
public class SpecificationAppService : HsuBaseAppService, ISpecificationAppService
{
    private readonly IRepository<MaterialGroup> _materialGroupRepository;
    private readonly IRepository<Specification> _specificationRepository;

    public SpecificationAppService(
        IRepository<MaterialGroup> materialGroupRepository,
        IRepository<Specification> specificationRepository)
    {
        _materialGroupRepository = materialGroupRepository;
        _specificationRepository = specificationRepository;
    }

    [AbpAuthorize(AppPermissions.Hsu_Specifications_Get)]
    public async Task<List<SpecificationDto>> GetAll(int materialId)
    {
        List<Specification> specifications = await _specificationRepository
            .GetAll()
            .Where(s => s.MaterialGroupId == materialId)
            .ToListAsync();

        return ObjectMapper.Map<List<SpecificationDto>>(specifications);
    }

    [AbpAuthorize(AppPermissions.Hsu_Specifications_Create)]
    public async Task<SpecificationDto> Create(int materialId, CreateSpecificationInput input)
    {
        await _materialGroupRepository.GetAsync(materialId);

        Specification specification = new Specification
        {
            Name = input.Name,
            MaterialGroupId = materialId,
            SpecificationGroupId = input.SpecificationGroupId
        };

        specification.Id = await _specificationRepository.InsertAndGetIdAsync(specification);

        return ObjectMapper.Map<SpecificationDto>(specification);
    }

    [AbpAuthorize(AppPermissions.Hsu_Specifications_Update)]
    public async Task<SpecificationDto> Update(int id, UpdateSpecificationInput input)
    {
        Specification specification = await _specificationRepository.GetAsync(id);
        specification.Name = input.Name;
        specification.SpecificationGroupId = input.SpecificationGroupId;
        await _specificationRepository.UpdateAsync(specification);

        return ObjectMapper.Map<SpecificationDto>(specification);
    }

    [AbpAuthorize(AppPermissions.Hsu_Specifications_Delete)]
    public async Task Delete(int id)
    {
        await _specificationRepository.DeleteAsync(id);
    }
}
