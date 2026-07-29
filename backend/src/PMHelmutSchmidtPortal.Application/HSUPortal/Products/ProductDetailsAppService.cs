using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.UI;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.Authorization;
using PMHelmutSchmidtPortal.Authorization.Roles;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.HSUPortal.Products.Details;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.GeneralInfoStep;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.MaterialGroupStep;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductDetailsOverview;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductFilesStep;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductMeasurementStep;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductVariantStep;
using PMHelmutSchmidtPortal.HSUPortal.ShopOrders;

namespace PMHelmutSchmidtPortal.HSUPortal.Products;

public class ProductDetailsAppService : HsuBaseAppService, IProductDetailsAppService
{
    private readonly IProductDetailsManager _productDetailsManager;
    private readonly IProductManager _productManager;
    private readonly IOrderManager _orderManager;
    private readonly UserManager _userManager;
    private readonly IMeasurementPositionManager _measurementPositionManager;
    private readonly IRepository<WizardStep> _wizardStepRepository;

    public ProductDetailsAppService(
        IProductDetailsManager productDetailsManager,
        IProductManager productManager,
        IOrderManager orderManager,
        UserManager userManager,
        IMeasurementPositionManager measurementPositionManager,
        IRepository<WizardStep> wizardStepRepository)
    {
        _productDetailsManager = productDetailsManager;
        _productManager = productManager;
        _orderManager = orderManager;
        _userManager = userManager;
        _measurementPositionManager = measurementPositionManager;
        _wizardStepRepository = wizardStepRepository;
    }

    [AbpAuthorize(
        AppPermissions.Hsu_Product_Details_Overview_Get_Admin,
        AppPermissions.Hsu_Product_Details_Overview_Get_Developer,
        AppPermissions.Hsu_Product_Details_Overview_Get_Producer
    )]
    public async Task<ProductDetailsOverviewDto> GetProductDetailsOverview(int productId)
    {
        return await _productDetailsManager.GetProductDetailsOverview(productId, await GetCurrentUserAsync());
    }

    [AbpAuthorize(
        AppPermissions.Hsu_Product_Details_Overview_Get_Admin,
        AppPermissions.Hsu_Product_Details_Overview_Get_Developer,
        AppPermissions.Hsu_Product_Details_Overview_Get_Producer
    )]
    public async Task<WizardStepType> GetWizardStep(int productId)
    {
        return (await _wizardStepRepository
            .GetAll()
            .SingleOrDefaultAsync(step => step.Id == productId))?.WizardStepType ?? WizardStepType.General;
    }

    [AbpAuthorize(
        AppPermissions.Hsu_Product_Details_Overview_Get_Admin,
        AppPermissions.Hsu_Product_Details_Overview_Get_Developer,
        AppPermissions.Hsu_Product_Details_Overview_Get_Producer
    )]
    public async Task<ProductDetailsOverviewDto> GetProductDetailsOverviewByOrderId(int orderId)
    {
        int productId = await _orderManager.GetProductId(orderId);
        return await GetProductDetailsOverview(productId);
    }

    [AbpAuthorize(AppPermissions.Hsu_Product_Details_GeneralInfo_Get)]
    public async Task<GeneralInfoOutputDto> GetProductGeneralInfo(int productId)
    {
        await SetWizardStep(productId, WizardStepType.General);
        return await _productDetailsManager.GetProductGeneralInfo(await CheckAndGetProductForWizard(productId));
    }

    [AbpAuthorize(AppPermissions.Hsu_Product_Details_GeneralInfo_CreateOrUpdate)]
    public async Task<GeneralInfoOutputDto> CreateOrUpdateGeneralInfo(GeneralInfoInputDto productInput)
    {
        return await _productDetailsManager.CreateOrUpdateGeneralInfo(await CheckAndGetProductForWizard(productInput.ProductId), productInput);
    }

    [AbpAuthorize(AppPermissions.Hsu_Product_Details_MaterialGroups_Get)]
    public async Task<MaterialGroupStepOutput> GetProductMaterialGroups(int productId)
    {
        await SetWizardStep(productId, WizardStepType.MaterialGroups);
        return await _productDetailsManager.GetProductMaterialsStage(await CheckAndGetProductForWizard(productId));
    }


    [AbpAuthorize(AppPermissions.Hsu_Product_Details_MaterialGroups_CreateOrUpdate)]
    public async Task<MaterialGroupStepOutput> CreateOrUpdateProductMaterialsGroups(MaterialGroupStepInput input)
    {
        return await _productDetailsManager.CreateOrUpdateMaterialsStage(await CheckAndGetProductForWizard(input.ProductId), input);
    }

    [AbpAuthorize(AppPermissions.Hsu_Product_Details_ProductVariants_Get)]
    public async Task<ProductVariantStepOutputDto> GetProductVariants(int productId)
    {
        await SetWizardStep(productId, WizardStepType.Variants);
        return await _productDetailsManager.GetProductVariantsStep(await CheckAndGetProductForWizard(productId));
    }

    [AbpAuthorize(AppPermissions.Hsu_Product_Details_ProductVariants_Get)]
    public async Task<ProductVariantStepOutputDto> CreateOrUpdateProductVariants(ProductVariantStepInputDto input)
    {
        return await _productDetailsManager.CreateOrUpdateProductVariantsStep(await CheckAndGetProductForWizard(input.ProductId), input);
    }

    [AbpAuthorize(AppPermissions.Hsu_Product_Details_MeasurementsPosition_Get)]
    public async Task<ProductMeasurementStepOutput> GetProductMeasurements(int productId)
    {
        await CheckAndGetProductForWizard(productId);
        await SetWizardStep(productId, WizardStepType.SortingMeasurements);
        return GetProductMeasurementStepOutput(
            productId,
            await _measurementPositionManager.GetProductMeasurements(productId));
    }

    [AbpAuthorize(AppPermissions.Hsu_Product_Details_MeasurementsPosition_CreateOrUpdate)]
    public async Task<ProductMeasurementStepOutput> SaveProductMeasurementPositions(ProductMeasurementStepInput input)
    {
        await CheckAndGetProductForWizard(input.ProductId);
        return GetProductMeasurementStepOutput(
            input.ProductId,
            await _measurementPositionManager.SaveProductMeasurementPositions(input));
    }

    [AbpAuthorize(AppPermissions.Hsu_Product_Details_ProductFiles_Get)]
    public async Task<ProductFilesStepOutput> GetProductFilesInformation(int productId)
    {
        await SetWizardStep(productId, WizardStepType.Files);
        return await _productDetailsManager.GetProductFilesStep(await CheckAndGetProductForWizard(productId));
    }

    [AbpAuthorize(AppPermissions.Hsu_Product_Details_ProductFiles_CreateOrUpdate)]
    public async Task<ProductFilesStepOutput> CreateOrUpdateProductFilesInformation(ProductFilesStepInput input)
    {
        return await _productDetailsManager.CreateOrUpdateProductFilesStep(await CheckAndGetProductForWizard(input.ProductId), input);
    }

    [AbpAuthorize(AppPermissions.Hsu_Product_Details_FinalizeForValueChainPlanning)]
    public async Task<ProductListDto> FinalizeForValueChainPlanning(int productId)
    {
        return await _productDetailsManager.ValidateAndFinalizeForValueChainPlanning(await CheckAndGetProductForWizard(productId));
    }

    private async Task<Product> CheckAndGetProductForWizard(int productId)
    {
        Product product = await (await _productManager.GetProductForUser(productId, await GetCurrentUserAsync())).SingleOrDefaultAsync();

        _productManager.CheckProductExists(product, productId);

        if (await _userManager.IsInRoleAsync(await GetCurrentUserAsync(), StaticRoleNames.Host.Developer) && product.State != ProductState.InProcessDeveloper)
        {
            throw new UserFriendlyException(
                L("Error.Product.NotReadyForDev.Title"),
                L("Error.Product.NotReadyForDev.Text", productId));
        }

        if (await _userManager.IsInRoleAsync(await GetCurrentUserAsync(), StaticRoleNames.Host.PlatformAdmin) &&
            product.State != ProductState.ReadyForValueChainPlanning)
        {
            throw new UserFriendlyException(
                L("Error.Product.NoEditAllowed.Title"),
                L("Error.Product.NoEditAllowed.Text", productId));
        }

        return product;
    }

    private ProductMeasurementStepOutput GetProductMeasurementStepOutput(int productId, IEnumerable<ProductMeasurement> productMeasurements)
    {
        return new ProductMeasurementStepOutput
        {
            ProductId = productId,
            MeasurementDtos = ObjectMapper.Map<List<MeasurementDto>>(productMeasurements)
        };
    }

    private async Task SetWizardStep(int productId, WizardStepType wizardStep)
    {
        WizardStep currentWizardStep = await _wizardStepRepository
            .GetAll()
            .SingleOrDefaultAsync(step => step.Id == productId);

        if (currentWizardStep == null)
        {
            currentWizardStep = new WizardStep
            {
                Id = productId,
                WizardStepType = WizardStepType.General
            };

            await _wizardStepRepository.InsertAsync(currentWizardStep);
            return;
        }

        if (currentWizardStep.WizardStepType < wizardStep)
        {
            currentWizardStep.WizardStepType = wizardStep;
            await _wizardStepRepository.UpdateAsync(currentWizardStep);
        }

        await CurrentUnitOfWork.SaveChangesAsync();
    }
}