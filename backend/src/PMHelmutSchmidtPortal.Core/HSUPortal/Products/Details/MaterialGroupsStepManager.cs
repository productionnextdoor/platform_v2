using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

    public MaterialGroupsStepManager(
        IMaterialGroupRepository materialGroupRepository,
        IWorkPieceRepository workPieceRepository,
        IProductionStateRepository productionStateRepository,
        IWorkPieceVariantsRepository workPieceVariantsRepository
    )
    {
        _materialGroupRepository = materialGroupRepository;
        _workPieceRepository = workPieceRepository;
        _productionStateRepository = productionStateRepository;
        _workPieceVariantsRepository = workPieceVariantsRepository;
    }

    public async Task<MaterialGroupStepOutput> GetProductMaterialsStage(Product product)
    {
        List<MaterialGroup> materialGroups = await _materialGroupRepository.GetMaterialGroupsWithSurfaceFinishesQuery().ToListAsync();
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
        List<MaterialGroup> materialGroups = await _materialGroupRepository.GetMaterialGroupsWithSurfaceFinishesQuery().ToListAsync();
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
            if (workPieceDto.SurfaceFinishId != 0)
            {
                workPiece.SurfaceFinishId = workPieceDto.SurfaceFinishId;
            }

            await _workPieceRepository.InsertOrUpdateAndGetIdAsync(workPiece);

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
        workPieces = await _workPieceRepository.GetProductWorkpieces(input.ProductId).ToListAsync();

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

        if (workPieceDtos.Select(workPieceDto => materialGroups
                .Any(mg => mg.Id == workPieceDto.MaterialGroupId && mg.SurfaceFinishes.Count == 0 && workPieceDto.SurfaceFinishId == 0 ||
                           mg.SurfaceFinishes
                               .Any(sf => sf.MaterialGroupId == workPieceDto.MaterialGroupId && sf.Id == workPieceDto.SurfaceFinishId)))
            .Any(isSurfaceFinishExist => !isSurfaceFinishExist))
        {
            throw new UserFriendlyException(
                L("Error.Product.MaterialGroups.Surfaces.Title"),
                L("Error.Product.MaterialGroups.Surfaces.Text"));
        }
    }
}