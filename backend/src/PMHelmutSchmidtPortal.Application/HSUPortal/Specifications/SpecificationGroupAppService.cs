using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.Authorization;
using PMHelmutSchmidtPortal.HSUPortal.Materials.Dto;
using PMHelmutSchmidtPortal.HSUPortal.Products.Details;

namespace PMHelmutSchmidtPortal.HSUPortal.Specifications;

[AbpAuthorize]
public class SpecificationGroupAppService : HsuBaseAppService, ISpecificationGroupAppService
{
    private readonly IRepository<MaterialGroup> _materialGroupRepository;
    private readonly IRepository<SpecificationGroup> _specificationGroupRepository;
    private readonly IRepository<Specification> _specificationRepository;

    public SpecificationGroupAppService(
        IRepository<MaterialGroup> materialGroupRepository,
        IRepository<SpecificationGroup> specificationGroupRepository,
        IRepository<Specification> specificationRepository)
    {
        _materialGroupRepository = materialGroupRepository;
        _specificationGroupRepository = specificationGroupRepository;
        _specificationRepository = specificationRepository;
    }

    [AbpAuthorize(AppPermissions.Hsu_Specifications_Get)]
    public async Task<List<SpecificationGroupDto>> GetAll(int materialGroupId)
    {
        List<SpecificationGroup> groups = await _specificationGroupRepository
            .GetAll()
            .Include(g => g.Specifications)
            .Where(g => g.MaterialGroupId == materialGroupId)
            .ToListAsync();

        return ObjectMapper.Map<List<SpecificationGroupDto>>(groups);
    }

    [AbpAuthorize(AppPermissions.Hsu_Specifications_Create)]
    public async Task<SpecificationGroupDto> Create(int materialGroupId, CreateSpecificationGroupInput input)
    {
        await _materialGroupRepository.GetAsync(materialGroupId);

        SpecificationGroup group = new SpecificationGroup
        {
            Name = input.Name,
            MaterialGroupId = materialGroupId
        };

        group.Id = await _specificationGroupRepository.InsertAndGetIdAsync(group);

        return ObjectMapper.Map<SpecificationGroupDto>(group);
    }

    [AbpAuthorize(AppPermissions.Hsu_Specifications_Update)]
    public async Task<SpecificationGroupDto> Update(int id, UpdateSpecificationGroupInput input)
    {
        SpecificationGroup group = await _specificationGroupRepository.GetAsync(id);
        group.Name = input.Name;
        await _specificationGroupRepository.UpdateAsync(group);

        return ObjectMapper.Map<SpecificationGroupDto>(group);
    }

    [AbpAuthorize(AppPermissions.Hsu_Specifications_Delete)]
    public async Task Delete(int id)
    {
        await _specificationRepository.DeleteAsync(s => s.SpecificationGroupId == id);
        await _specificationGroupRepository.DeleteAsync(id);
    }
}
