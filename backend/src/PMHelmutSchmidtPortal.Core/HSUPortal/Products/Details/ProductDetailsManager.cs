using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.MimeTypes;
using Abp.UI;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.HSUPortal.Extensions;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.GeneralInfoStep;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.MaterialGroupStep;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductDetailsOverview;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductFilesStep;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductVariantStep;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Details;

public class ProductDetailsManager : HSUDomainBaseService, IProductDetailsManager
{
    private readonly IGeneralInfoManager _generalInfoManager;
    private readonly IMaterialGroupsStepManager _materialGroupsStepManager;
    private readonly IProductVariantManager _productVariantManager;
    private readonly IProductFileManager _productFileManager;
    private readonly IProductRepository _productRepository;
    private readonly IProductManager _productManager;
    private readonly IMimeTypeMap _mimeTypeMap;

    public ProductDetailsManager(
        IGeneralInfoManager generalInfoManager,
        IMaterialGroupsStepManager materialGroupsStepManager,
        IProductVariantManager productVariantManager,
        IProductFileManager productFileManager,
        IProductRepository productRepository,
        IProductManager productManager,
        IMimeTypeMap mimeTypeMap
    )

    {
        _generalInfoManager = generalInfoManager;
        _materialGroupsStepManager = materialGroupsStepManager;
        _productVariantManager = productVariantManager;
        _productFileManager = productFileManager;
        _productRepository = productRepository;
        _productManager = productManager;
        _mimeTypeMap = mimeTypeMap;
        
    }

    public async Task<ProductDetailsOverviewDto> GetProductDetailsOverview(int productId, User currentUser)
    {
        Product productOverview = await (await _productManager
            .GetProductForUser(productId,currentUser))
            .IncludeProductMeasurements()
            .IncludeWorkPiecesWithConnections()
            .IncludeProductFiles()
            .IncludeNonArchivedProductionDetails()
            .FirstOrDefaultAsync();
        
        _productManager.CheckProductExists(productOverview,productId);

        ProductFile previewImage = productOverview.ProductFiles
            .FirstOrDefault(pf =>
                pf.FileCategory == ProductFileCategory.ProductPicture && _productFileManager.IsSupportedImageType(_mimeTypeMap.GetMimeType(pf.FileName)));

        ProductDetailsOverviewDto productDetailsOverviewDto = ObjectMapper.Map<ProductDetailsOverviewDto>(productOverview);
        productDetailsOverviewDto.PreviewImageId = previewImage?.Id;
        productDetailsOverviewDto.ProductionDetailsLiveId = productOverview.ProductionDetails
            .Single(details => details.ProductionDetailsType == ProductionDetailsType.Live).Id;
        productDetailsOverviewDto.ProductionDetailsEditId = productOverview.ProductionDetails
            .SingleOrDefault(details => details.ProductionDetailsType == ProductionDetailsType.Edit)?.Id;
        return productDetailsOverviewDto;
    }

    public Task<GeneralInfoOutputDto> GetProductGeneralInfo(Product product)
    {
        return Task.FromResult(_generalInfoManager.GetProductGeneralInfo(product));
    }

    public async Task<GeneralInfoOutputDto> CreateOrUpdateGeneralInfo(Product product, GeneralInfoInputDto input)
    {
        product.Name = input.ProductName;
        
        GeneralInfoOutputDto generalInfoOutputDto = await _generalInfoManager.CreateOrUpdateGeneralInfo(product, input);

        await _productRepository.InsertOrUpdateAndGetIdAsync(product);
        await CurrentUnitOfWork.SaveChangesAsync();

        return generalInfoOutputDto;
    }

    public async Task<MaterialGroupStepOutput> GetProductMaterialsStage(Product product)
    {
        return await _materialGroupsStepManager.GetProductMaterialsStage(product);
    }

    public async Task<MaterialGroupStepOutput> CreateOrUpdateMaterialsStage(Product product, MaterialGroupStepInput input)
    {
        return await _materialGroupsStepManager.CreateOrUpdateMaterialsStage(product, input);
    }

    public async Task<ProductVariantStepOutputDto> GetProductVariantsStep(Product product)
    {
        return await _productVariantManager.GetProductVariantsStep(product);
    }

    public async Task<ProductVariantStepOutputDto> CreateOrUpdateProductVariantsStep(Product product, ProductVariantStepInputDto input)
    {
        return await _productVariantManager.CreateOrUpdateProductVariantsStep(product, input);
    }

    public async Task<ProductFilesStepOutput> GetProductFilesStep(Product product)
    {
        return await _productFileManager.GetProductFilesStep(product);
    }

    public async Task<ProductFilesStepOutput> CreateOrUpdateProductFilesStep(Product product, ProductFilesStepInput input)
    {
        product.DescriptionFromDev = input.ProductDescription;
        product.SharePointLink = input.SharepointLink;
        await _productRepository.InsertOrUpdateAndGetIdAsync(product);
        await CurrentUnitOfWork.SaveChangesAsync();

        return await _productFileManager.GetProductFilesStep(product);
    }

    public async Task<ProductListDto> ValidateAndFinalizeForValueChainPlanning(Product product)
    {
        List<string> errors = new();

        if (string.IsNullOrEmpty(product.DescriptionFromDev))
        {
            errors.Add(L("Error.Product.ProductValidations.Text.NoDescription"));
        }

        if (!await _generalInfoManager.ValidateGeneralInformation(product.Id))
        {
            errors.Add(L("Error.Product.ProductValidations.Text.GeneralInfoMissing"));
        }

        if (!await _materialGroupsStepManager.IsWorkPiecesExist(product.Id))
        {
           errors.Add(L("Error.Product.ProductValidations.Text.WorkpiecesMissing"));
        }

        if (!await _productFileManager.IsAllFilesExist(product.Id))
        {
            errors.Add(L("Error.Product.ProductValidations.Text.FilesMissing"));
        }

        if (errors.Count > 0)
        {
            throw new UserFriendlyException(L("Error.Product.ProductValidations.Title"), string.Join(". ", errors));
        }

        product.State = ProductState.ReadyForValueChainPlanning;
        await _productRepository.UpdateAsync(product);
        await CurrentUnitOfWork.SaveChangesAsync();

        return ObjectMapper.Map<ProductListDto>(product);
    }
}