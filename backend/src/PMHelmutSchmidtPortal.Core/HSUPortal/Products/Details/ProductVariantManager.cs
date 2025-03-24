using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.EntityFrameworkCore.Repositories;
using Abp.UI;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductVariantStep;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Details;

public class ProductVariantManager : HSUDomainBaseService, IProductVariantManager
{
    private readonly IWorkPieceRepository _workPieceRepository;
    private readonly IProductMeasurementRepository _productMeasurementRepository;
    private readonly IWorkPieceVariantsRepository _workPieceVariantsRepository;

    public ProductVariantManager(
        IWorkPieceRepository workPieceRepository,
        IProductMeasurementRepository productMeasurementRepository,
        IWorkPieceVariantsRepository workPieceVariantsRepository)
    {
        _workPieceRepository = workPieceRepository;
        _productMeasurementRepository = productMeasurementRepository;
        _workPieceVariantsRepository = workPieceVariantsRepository;
    }

    public async Task<ProductVariantStepOutputDto> GetProductVariantsStep(Product product)
    {
        List<WorkPiece> workPieceWithMaterials = await _workPieceRepository.GetProductWorkpiecesWithMaterials(product.Id).ToListAsync();
        List<ProductMeasurement> productMeasurements = await _productMeasurementRepository.GetProductMeasurementVariantsOnly(product.Id).ToListAsync();
        List<WorkPieceVariant> workPieceVariants = await _workPieceVariantsRepository.GetWorkPieceVariants(product.Id).ToListAsync();

        return GetProductVariantStepOutput(product.Id, workPieceWithMaterials, productMeasurements, workPieceVariants);
    }

    public async Task<ProductVariantStepOutputDto> CreateOrUpdateProductVariantsStep(Product product, ProductVariantStepInputDto input)
    {
        int maxPosition = _productMeasurementRepository
            .GetAllProductMeasurement(input.ProductId)
            .Max(pm => pm.Position);
        List<ProductMeasurement> productMeasurements = await _productMeasurementRepository.GetProductMeasurementVariantsOnly(input.ProductId).ToListAsync();
        ValidateMeasurements(productMeasurements, input.Measurements);
        foreach (MeasurementDto measurementDto in input.Measurements)
        {
            ProductMeasurement productMeasurement = productMeasurements
                .Where(pm => pm.Id == measurementDto.MeasurementId)
                .SingleOrDefault(new ProductMeasurement()
                {
                    ProductId = input.ProductId,
                    IsDefault = false,
                    //This is done to ensure that all the measurements have some position 
                    Position = ++maxPosition
                });

            productMeasurement.Height = measurementDto.Height;
            productMeasurement.Width = measurementDto.Width;
            productMeasurement.Depth = measurementDto.Depth;

            await _productMeasurementRepository.InsertOrUpdateAndGetIdAsync(productMeasurement);
        }

        IEnumerable<ProductMeasurement> productMeasurementToDelete = productMeasurements
            .Where(productMeasurement => input.Measurements
                .All(pmDto => pmDto.MeasurementId != productMeasurement.Id));

        _productMeasurementRepository.RemoveRange(productMeasurementToDelete);

        List<WorkPieceVariant> workPieceVariants = await _workPieceVariantsRepository.GetWorkPieceVariants(input.ProductId).ToListAsync();
        List<WorkPiece> workPieceWithMaterials = await _workPieceRepository.GetProductWorkpiecesWithMaterials(input.ProductId).ToListAsync();

        ValidateVariants(product.Id, workPieceVariants, input.WorkPieceVariants, workPieceWithMaterials);

        foreach (WorkPieceVariantDto workPieceVariantDto in input.WorkPieceVariants)
        {
            WorkPieceVariant workPieceVariant = workPieceVariants
                .Where(wpv => wpv.Id == workPieceVariantDto.WorkPieceVariantId)
                .SingleOrDefault(new WorkPieceVariant()
                {
                    WorkPieceId = workPieceVariantDto.WorkPieceId,
                });

            workPieceVariant.Description = workPieceVariantDto.Description;
            workPieceVariant.WorkPieceId = workPieceVariantDto.WorkPieceId;

            await _workPieceVariantsRepository.InsertOrUpdateAndGetIdAsync(workPieceVariant);
        }

        IEnumerable<WorkPieceVariant> workPieceVariantToDelete = workPieceVariants
            .Where(workPieceVariant => input.WorkPieceVariants
                .All(wpvDto => wpvDto.WorkPieceVariantId != workPieceVariant.Id));

        _workPieceVariantsRepository.RemoveRange(workPieceVariantToDelete);

        await CurrentUnitOfWork.SaveChangesAsync();

        workPieceVariants = await _workPieceVariantsRepository.GetWorkPieceVariants(input.ProductId).ToListAsync();
        productMeasurements = await _productMeasurementRepository.GetProductMeasurementVariantsOnly(input.ProductId).ToListAsync();

        return GetProductVariantStepOutput(input.ProductId, workPieceWithMaterials, productMeasurements, workPieceVariants);
    }

    private void ValidateMeasurements(IReadOnlyCollection<ProductMeasurement> productMeasurements, IEnumerable<MeasurementDto> measurementsDtos)
    {
        List<MeasurementDto> wrongMeasurements = measurementsDtos
            .Where(dto =>
                dto.MeasurementId != 0 &&
                productMeasurements.All(pm => pm.Id != dto.MeasurementId))
            .ToList();

        if (wrongMeasurements.Count <= 0) return;

        string wrongMeasurementIds = wrongMeasurements
            .Select(measurement => measurement.MeasurementId.ToString())
            .Aggregate((first, second) => $"{first}, {second}");
        
        throw new UserFriendlyException(
            L("Error.Product.Variants.Measurement.Title"),
            L("Error.Product.Variants.Measurement.Text", wrongMeasurementIds));
    }

    private void ValidateVariants(
        int productId,
        IReadOnlyCollection<WorkPieceVariant> workPieceVariants,
        List<WorkPieceVariantDto> workPieceVariantDtos,
        IReadOnlyCollection<WorkPiece> workPieceWithMaterials)
    {
        List<WorkPieceVariantDto> wrongVariants = workPieceVariantDtos
            .Where(dto =>
                dto.WorkPieceVariantId != 0 &&
                workPieceVariants.All(wp => wp.Id != dto.WorkPieceVariantId))
            .ToList();

        if (wrongVariants.Count > 0)
        {
            string wrongVariantIds = workPieceVariantDtos
                .Select(variant => variant.WorkPieceVariantId.ToString())
                .Aggregate((first, second) => $"{first}, {second}");

            throw new UserFriendlyException(
                L("Error.Product.Variants.WorkPieceVariants.Title"),
                L("Error.Product.Variants.WorkPieceVariants.Text", wrongVariantIds));
        }

        if (workPieceVariantDtos.Select(workPieceVariantDto =>
                workPieceWithMaterials
                    .Any(wp =>
                        wp.Id == workPieceVariantDto.WorkPieceId &&
                        wp.ProductId == productId)
            ).Any(isWorkpieceExists => !isWorkpieceExists))
        {
            throw new UserFriendlyException(
                L("Error.Product.Variants.Surfaces.Title"),
                L("Error.Product.Variants.Surfaces.Text")
            );
        }
    }
    
    private ProductVariantStepOutputDto GetProductVariantStepOutput(
        int productId,
        List<WorkPiece> workPieceWithMaterials,
        List<ProductMeasurement> productMeasurements,
        List<WorkPieceVariant> workPieceVariants)
    {
        return new ProductVariantStepOutputDto()
        {
            ProductId = productId,
            WorkPieces = ObjectMapper.Map<List<WorkPieceWithMaterialDto>>(workPieceWithMaterials),
            Measurements = ObjectMapper.Map<List<MeasurementDto>>(productMeasurements),
            WorkPieceVariants = ObjectMapper.Map<List<WorkPieceVariantDto>>(workPieceVariants),
        };
    }
}