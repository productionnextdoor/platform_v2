using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.EntityFrameworkCore.Repositories;
using Abp.UI;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.MaterialGroupStep;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Details;

public class MaterialGroupsStepManager : HSUDomainBaseService, IMaterialGroupsStepManager
{
    private readonly IMaterialGroupRepository _materialGroupRepository;
    private readonly IWorkPieceRepository _workPieceRepository;
    private readonly IProductionStateRepository _productionStateRepository;
    private readonly IWorkPieceVariantsRepository _workPieceVariantsRepository;
    private readonly IRepository<WorkPieceSpecification> _workPieceSpecificationRepository;

    public MaterialGroupsStepManager(
        IMaterialGroupRepository materialGroupRepository,
        IWorkPieceRepository workPieceRepository,
        IProductionStateRepository productionStateRepository,
        IWorkPieceVariantsRepository workPieceVariantsRepository,
        IRepository<WorkPieceSpecification> workPieceSpecificationRepository
    )
    {
        _materialGroupRepository = materialGroupRepository;
        _workPieceRepository = workPieceRepository;
        _productionStateRepository = productionStateRepository;
        _workPieceVariantsRepository = workPieceVariantsRepository;
        _workPieceSpecificationRepository = workPieceSpecificationRepository;
    }

    public async Task<MaterialGroupStepOutput> GetProductMaterialsStage(Product product)
    {
        List<MaterialGroup> materialGroups = await _materialGroupRepository.GetMaterialGroupsWithSpecificationsQuery().ToListAsync();
        List<WorkPiece> workPieces = await _workPieceRepository.GetProductWorkpiecesWithProductionStates(product.Id)
            .ToListAsync();

        return GetMaterialGroupStepOutput(product.Id, materialGroups, workPieces);
    }

    public async Task<MaterialGroupStepOutput> CreateOrUpdateMaterialsStage(Product product, MaterialGroupStepInput input)
    {
        ProductionState finalProductState = await _productionStateRepository.GetFinalProductState(product.Id)
            .SingleOrDefaultAsync();

        if (finalProductState == null)
        {
            throw new UserFriendlyException(
                L("Error.Product.MaterialGroups.NoFinalState.Title"),
                L("Error.Product.MaterialGroups.NoFinalState.Text"));
        }

        List<WorkPiece> workPieces = await _workPieceRepository.GetProductWorkpiecesWithProductionStatesAndVariants(product.Id).ToListAsync();
        List<MaterialGroup> materialGroups = await _materialGroupRepository.GetMaterialGroupsWithSpecificationsQuery().ToListAsync();
        ValidateWorkPieces(workPieces, input.WorkPieceDtos, materialGroups);

        if (!AreWorkPieceFinalStatesUnique(input.WorkPieceDtos, out string duplicateFinishedState))
        {
            throw new UserFriendlyException(
                L("Error.Product.MaterialGroups.DuplicateFinishedState.Title"),
                L("Error.Product.MaterialGroups.DuplicateFinishedState.Text", duplicateFinishedState));
        }
        
        //Create or update workpieces
        foreach (WorkPieceDto workPieceDto in input.WorkPieceDtos)
        {
            WorkPiece workPiece = workPieces.Where(wp => wp.Id == workPieceDto.WorkPieceId).SingleOrDefault(new WorkPiece()
            {
                ProductId = input.ProductId,
                ProductionStates = new List<ProductionState>()
            });

            workPiece.MaterialGroupId = workPieceDto.MaterialGroupId;
            await _workPieceRepository.InsertOrUpdateAndGetIdAsync(workPiece);

            await ReplaceWorkPieceSpecifications(workPiece, workPieceDto, materialGroups);

            ProductionState finalState = await _productionStateRepository
                .GetOrCreateProductionStateForWorkPiece(workPiece, finalProductState, ProductionStateType.WorkPieceFinal);
            finalState.Description = workPieceDto.FinishedState;
            await _productionStateRepository.InsertOrUpdateAndGetIdAsync(finalState);

            ProductionState firstState = await _productionStateRepository
                .GetOrCreateProductionStateForWorkPiece(workPiece, finalState, ProductionStateType.WorkPieceStart);
            firstState.Description = workPieceDto.Name;
            await _productionStateRepository.InsertOrUpdateAndGetIdAsync(firstState);
        }

        //Remove missing workpieces from db
        foreach (WorkPiece workPiece in workPieces.Where(workPiece => input.WorkPieceDtos.All(wpDto => wpDto.WorkPieceId != workPiece.Id)))
        {
            foreach (ProductionState productionState in workPiece.ProductionStates)
            {
                productionState.NextState = null;
                await _productionStateRepository.DeleteAsync(productionState);
            }

            _workPieceVariantsRepository.RemoveRange(workPiece.WorkPieceVariants);

            await _workPieceRepository.DeleteAsync(workPiece);
        }

        await CurrentUnitOfWork.SaveChangesAsync();

        //refresh the list for the output
        workPieces = await _workPieceRepository.GetProductWorkpiecesWithProductionStates(input.ProductId).ToListAsync();

        return GetMaterialGroupStepOutput(input.ProductId, materialGroups, workPieces);
    }
    
    private bool AreWorkPieceFinalStatesUnique(List<WorkPieceDto> workPieceDtos, out string duplicateFinishedState)
    {
        duplicateFinishedState = null;
        HashSet<string> finishedStates = new HashSet<string>();
        foreach (var workPieceDto in workPieceDtos)
        {
            if (!finishedStates.Add(workPieceDto.FinishedState))
            {
                duplicateFinishedState = workPieceDto.FinishedState;
                return false;
            }
        }

        return true;
    }

    public async Task<bool> IsWorkPiecesExist(int productId)
    {
        List<WorkPiece> workPieces = await _workPieceRepository.GetProductWorkpiecesWithProductionStates(productId).ToListAsync();

        return workPieces.Any(workPiece =>
            workPiece.ProductionStates.Any(ps => ps.StateType == ProductionStateType.WorkPieceStart) &&
            workPiece.ProductionStates.Any(ps => ps.StateType == ProductionStateType.WorkPieceFinal));
    }

    private MaterialGroupStepOutput GetMaterialGroupStepOutput(int productId, List<MaterialGroup> materialGroups, List<WorkPiece> workPieces)
    {
        return new MaterialGroupStepOutput()
        {
            ProductId = productId,
            MaterialGroupDtos = ObjectMapper.Map<List<MaterialGroupDto>>(materialGroups),
            WorkPieceDtos = ObjectMapper.Map<List<WorkPieceDto>>(workPieces),
        };
    }

    private async Task ReplaceWorkPieceSpecifications(
        WorkPiece workPiece,
        WorkPieceDto workPieceDto,
        List<MaterialGroup> materialGroups)
    {
        List<WorkPieceSpecification> existing = await _workPieceSpecificationRepository
            .GetAll()
            .Where(wps => wps.WorkPieceId == workPiece.Id)
            .ToListAsync();

        foreach (WorkPieceSpecification old in existing)
        {
            await _workPieceSpecificationRepository.DeleteAsync(old);
        }

        IEnumerable<Specification> allSpecifications = materialGroups.SelectMany(mg => mg.Specifications);

        foreach (int specificationId in workPieceDto.SpecificationIds)
        {
            Specification specification = allSpecifications.FirstOrDefault(s => s.Id == specificationId);
            if (specification == null)
            {
                throw new UserFriendlyException(
                    L("Error.Product.MaterialGroups.Specifications.NotFoundTitle"),
                    L("Error.Product.MaterialGroups.Specifications.NotFoundText"));
            }

            string specName = specification.Name;

            await _workPieceSpecificationRepository.InsertAsync(new WorkPieceSpecification
            {
                WorkPieceId = workPiece.Id,
                SpecificationId = specificationId,
                SpecificationName = specName
            });
        }
    }

    private void ValidateWorkPieces(
        IReadOnlyCollection<WorkPiece> workPieces,
        IReadOnlyCollection<WorkPieceDto> workPieceDtos,
        IReadOnlyCollection<MaterialGroup> materialGroups)
    {
        List<WorkPieceDto> wrongWorkpieces = workPieceDtos
            .Where(dto =>
                dto.WorkPieceId != 0 &&
                workPieces.All(wp => wp.Id != dto.WorkPieceId))
            .ToList();

        if (wrongWorkpieces.Count > 0)
        {
            string wrongWorkpiecesIds = wrongWorkpieces
                .Select(workpiece => workpiece.WorkPieceId.ToString())
                .Aggregate((first, second) => $"{first}, {second}");

            throw new UserFriendlyException(
                L("Error.Product.MaterialGroups.WorkPieces.Title"),
                L("Error.Product.MaterialGroups.WorkPieces.Text", wrongWorkpiecesIds));
        }

        foreach (WorkPieceDto workPieceDto in workPieceDtos)
        {
            if (workPieceDto.SpecificationIds == null || workPieceDto.SpecificationIds.Count < 1 || workPieceDto.SpecificationIds.Count > 2)
            {
                throw new UserFriendlyException(
                    L("Error.Product.MaterialGroups.Specifications.Title"),
                    L("Error.Product.MaterialGroups.Specifications.CountText"));
            }

            if (workPieceDto.SpecificationIds.Distinct().Count() != workPieceDto.SpecificationIds.Count)
            {
                throw new UserFriendlyException(
                    L("Error.Product.MaterialGroups.Specifications.Title"),
                    L("Error.Product.MaterialGroups.Specifications.CountText"));
            }

            bool allValid = workPieceDto.SpecificationIds.All(specId =>
                materialGroups.Any(mg => mg.Specifications
                    .Any(spec => spec.MaterialGroupId == workPieceDto.MaterialGroupId && spec.Id == specId)));

            if (!allValid)
            {
                throw new UserFriendlyException(
                    L("Error.Product.MaterialGroups.Specifications.NotFoundTitle"),
                    L("Error.Product.MaterialGroups.Specifications.NotFoundText"));
            }
        }
    }
}