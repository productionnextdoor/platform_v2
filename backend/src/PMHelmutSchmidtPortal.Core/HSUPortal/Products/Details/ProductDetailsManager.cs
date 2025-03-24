using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.MimeTypes;
using Abp.UI;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.HSUPortal.Extensions;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.DeliveryAddressStep;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.GeneralInfoStep;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.MaterialGroupStep;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductDetailsOverview;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductFilesStep;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductVariantStep;
using PMHelmutSchmidtPortal.HSUPortal.Utilities;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Details;

public class ProductDetailsManager : HSUDomainBaseService, IProductDetailsManager
{
    private readonly IGeneralInfoManager _generalInfoManager;
    private readonly IProductCustomerInfoManager _productCustomerInfoManager;
    private readonly IMaterialGroupsStepManager _materialGroupsStepManager;
    private readonly IProductVariantManager _productVariantManager;
    private readonly IProductFileManager _productFileManager;
    private readonly IProductRepository _productRepository;
    private readonly IProductManager _productManager;
    private readonly IMimeTypeMap _mimeTypeMap;
    private readonly CustomConfigService _customConfigService;

    public ProductDetailsManager(
        IGeneralInfoManager generalInfoManager,
        IProductCustomerInfoManager productCustomerInfoManager,
        IMaterialGroupsStepManager materialGroupsStepManager,
        IProductVariantManager productVariantManager,
        IProductFileManager productFileManager,
        IProductRepository productRepository,
        IProductManager productManager,
        IMimeTypeMap mimeTypeMap,
        CustomConfigService customConfigService
    )

    {
        _generalInfoManager = generalInfoManager;
        _productCustomerInfoManager = productCustomerInfoManager;
        _materialGroupsStepManager = materialGroupsStepManager;
        _productVariantManager = productVariantManager;
        _productFileManager = productFileManager;
        _productRepository = productRepository;
        _productManager = productManager;
        _mimeTypeMap = mimeTypeMap;
        _customConfigService = customConfigService;
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
        productDetailsOverviewDto.DeliveryAddress = await _productCustomerInfoManager.GetByProductId(productId);
        return productDetailsOverviewDto;
    }

    public Task<GeneralInfoOutputDto> GetProductGeneralInfo(Product product)
    {
        return Task.FromResult(_generalInfoManager.GetProductGeneralInfo(product));
    }

    public async Task<GeneralInfoOutputDto> CreateOrUpdateGeneralInfo(Product product, GeneralInfoInputDto input)
    {
        ValidateGeneralInfoForOfferInput(input);
        product.Name = input.ProductName;
        product.Quantity = input.Quantity;
        product.OfferDeadline = input.OfferDeadline;
        product.ProductionDeadLine = input.ProductionDeadLine;
        
        GeneralInfoOutputDto generalInfoOutputDto = await _generalInfoManager.CreateOrUpdateGeneralInfo(product, input);

        await _productRepository.InsertOrUpdateAndGetIdAsync(product);
        await CurrentUnitOfWork.SaveChangesAsync();

        return generalInfoOutputDto;
    }

    public Task<DeliveryAddressOutputDto> GetProductDeliveryAddress(Product product)
    {
        return _productCustomerInfoManager.GetByProductId(product.Id);
    }

    public Task<DeliveryAddressOutputDto> CreateOrUpdateProductDeliveryAddress(Product product, DeliveryAddressInputDto input)
    {
        return _productCustomerInfoManager.CreateOrUpdateAsync(product, input);
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

        if (_customConfigService.IsOffer() &&
            product.Quantity <= 0 && 
            product.OfferDeadline < DateTime.Now &&
            product.ProductionDeadLine < DateTime.Now
            )
        {
            errors.Add(L("Error.Product.ProductValidations.Text.OfferDataMissing"));
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
    
    private void ValidateGeneralInfoForOfferInput(GeneralInfoInputDto input)
    {
        if (!_customConfigService.IsOffer())
        {
            return;
        }
        
        if (!input.Quantity.HasValue)
        {
            throw new UserFriendlyException(L("Error.Product.ProductValidations.Text.Quantity"));
        }
        
        if (!input.OfferDeadline.HasValue)
        {
            throw new UserFriendlyException(L("Error.Product.ProductValidations.Text.OfferDeadline"));
        }
        
        if (!input.ProductionDeadLine.HasValue)
        {
            throw new UserFriendlyException(L("Error.Product.ProductValidations.Text.ProductionDeadLine"));
        }
        
        if (input.ProductionDeadLine <= input.OfferDeadline)
        {
            throw new UserFriendlyException(L("Error.Product.ProductValidations.Text.OfferBeforeProduction"));
        }
    }
    
}