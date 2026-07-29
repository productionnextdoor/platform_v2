using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.Authorization;
using PMHelmutSchmidtPortal.HSUPortal.Materials.Dto;
using PMHelmutSchmidtPortal.HSUPortal.Products.Details;

namespace PMHelmutSchmidtPortal.HSUPortal.Materials;

[AbpAuthorize]
public class MaterialAppService : HsuBaseAppService, IMaterialAppService
{
    private readonly IRepository<MaterialGroup> _materialGroupRepository;

    public MaterialAppService(IRepository<MaterialGroup> materialGroupRepository)
    {
        _materialGroupRepository = materialGroupRepository;
    }

    [AbpAuthorize(AppPermissions.Hsu_Materials_Get)]
    public async Task<List<MaterialDto>> GetAll()
    {
        List<MaterialGroup> materialGroups = await _materialGroupRepository
            .GetAll()
            .Include(mg => mg.Specifications)
            .Include(mg => mg.SpecificationGroups)
                .ThenInclude(sg => sg.Specifications)
            .ToListAsync();

        return ObjectMapper.Map<List<MaterialDto>>(materialGroups);
    }

    [AbpAuthorize(AppPermissions.Hsu_Materials_Create)]
    public async Task<MaterialDto> Create(CreateMaterialInput input)
    {
        MaterialGroup materialGroup = new MaterialGroup
        {
            Name = input.Name,
            Specifications = new List<Specification>()
        };
        materialGroup.Id = await _materialGroupRepository.InsertAndGetIdAsync(materialGroup);

        return ObjectMapper.Map<MaterialDto>(materialGroup);
    }

    [AbpAuthorize(AppPermissions.Hsu_Materials_Update)]
    public async Task<MaterialDto> Update(int id, UpdateMaterialInput input)
    {
        MaterialGroup materialGroup = await _materialGroupRepository
            .GetAll()
            .Include(mg => mg.Specifications)
            .Include(mg => mg.SpecificationGroups)
                .ThenInclude(sg => sg.Specifications)
            .FirstAsync(mg => mg.Id == id);

        materialGroup.Name = input.Name;
        await _materialGroupRepository.UpdateAsync(materialGroup);

        return ObjectMapper.Map<MaterialDto>(materialGroup);
    }

    [AbpAuthorize(AppPermissions.Hsu_Materials_Delete)]
    public async Task Delete(int id)
    {
        await _materialGroupRepository.DeleteAsync(id);
    }
}
