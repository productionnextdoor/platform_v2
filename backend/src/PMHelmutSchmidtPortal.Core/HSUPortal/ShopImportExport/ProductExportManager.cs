using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.UI;
using PMHelmutSchmidtPortal.HSUPortal.Extensions;
using PMHelmutSchmidtPortal.HSUPortal.Products;
using PMHelmutSchmidtPortal.HSUPortal.Products.Details;
using PMHelmutSchmidtPortal.HSUPortal.ProductVariants;
using PMHelmutSchmidtPortal.HSUPortal.ShopImportExport.Products;
using PMHelmutSchmidtPortal.HSUPortal.ShopImportExport.PropertyGroups;
using PMHelmutSchmidtPortal.HSUPortal.Users;

namespace PMHelmutSchmidtPortal.HSUPortal.ShopImportExport;

public class ProductExportManager : HSUDomainBaseService, IProductExportManager
{
    private readonly IShopwareApiConnector _shopwareApiConnector;
    private readonly IProductApiManager _productApiManager;
    private readonly IPropertyGroupsManager _propertyGroupsManager;
    private readonly IProductManager _productManager;
    private readonly IRepository<RatingType> _ratingTypeRepository;
    private readonly IProductVariantRepository _productVariantRepository;

    public ProductExportManager(
        IShopwareApiConnector shopwareApiConnector,
        IProductApiManager productApiManager,
        IPropertyGroupsManager propertyGroupsManager,
        IProductManager productManager,
        IRepository<RatingType> ratingTypeRepository,
        IProductVariantRepository productVariantRepository
    )
    {
        _shopwareApiConnector = shopwareApiConnector;
        _productApiManager = productApiManager;
        _propertyGroupsManager = propertyGroupsManager;
        _productManager = productManager;
        _ratingTypeRepository = ratingTypeRepository;
        _productVariantRepository = productVariantRepository;
    }

    public async Task ExportProductToShop(int productId)
    {
        Product product = FetchAndCheckProductForExport(productId);
        await ExportNewProductToShop(product);
    }
    
    public async Task UpdateProductInShop(int productId)
    {
        Product product = FetchAndCheckProductForExport(productId);
        await ExportUpdatedProductToShop(product);
    }

    private Product FetchAndCheckProductForExport(int productId)
    {
        Product product = _productManager
            .GetProduct(productId)
            .IncludeProductMeasurements()
            .IncludeWorkPiecesWithConnections()
            .IncludeProductFiles()
            .IncludeNonArchivedProductionDetails()
            .Single();

        _productManager.CheckProductExists(product, productId);

        if (product.State != ProductState.ProductionReady && product.State != ProductState.Live)
        {
            throw new UserFriendlyException(L("Error.ImportExport.ProductNotReady.Title"),
                L("Error.ImportExport.ProductNotReady.Text"));
        }

        return product;
    }

    private async Task ExportNewProductToShop(Product product)
    {
        List<RatingType> ratingTypes = await _ratingTypeRepository.GetAllListAsync();

        await _shopwareApiConnector.SetToken();
        Task<List<PropertyGroupDto>> propertyGroupTask = _propertyGroupsManager
            .GetPropertyGroups(product.ProductMeasurements, product.WorkPieces, ratingTypes);
        Task<string> taxIdTask = _productApiManager.GetTaxId(PMHelmutSchmidtPortalConsts.TaxRateName);
        Task<string> categoryIdTask = _productApiManager.GetCategoryId(PMHelmutSchmidtPortalConsts.CategoryName);
        Task<string> currencyIdTask = _productApiManager.GetCurrencyId(PMHelmutSchmidtPortalConsts.CurrencyName);
        Task<string> salesChanelIdTask = _productApiManager.GetSalesChanelId(PMHelmutSchmidtPortalConsts.SalesChanelName);

        List<ProductFile> images = product.ProductFiles
            .Where(pf =>
                pf.FileCategory == ProductFileCategory.ProductPicture)
            .ToList();

        Task<List<MediaDto>> mediaTask = _productApiManager.UploadImages(images);

        await Task.WhenAll(propertyGroupTask, taxIdTask, categoryIdTask, currencyIdTask, salesChanelIdTask, mediaTask);

        ProductForExportDto productForExportDto = MapNewProductForExport(
            product,
            ratingTypes,
            propertyGroupTask.Result,
            currencyIdTask.Result,
            categoryIdTask.Result,
            salesChanelIdTask.Result,
            taxIdTask.Result,
            mediaTask.Result);

        await _productApiManager.ExportProductToShop(productForExportDto);

        product.State = ProductState.Live;
    }

    private async Task ExportUpdatedProductToShop(Product product)
    {
        List<RatingType> ratingTypes = await _ratingTypeRepository.GetAllListAsync();
        
        Task<string> productShopIdTask = _productApiManager.GetProductShopId(product.ProductNumber.ToString());
        Task<string> currencyIdTask =  _productApiManager.GetCurrencyId(PMHelmutSchmidtPortalConsts.CurrencyName);
        Task<List<PropertyGroupDto>> propertyGroupTask =  _propertyGroupsManager
            .GetPropertyGroups(product.ProductMeasurements, product.WorkPieces, ratingTypes);
        
        ProductionDetails liveProductionDetails = product.ProductionDetails
            .Single(details => details.ProductionDetailsType == ProductionDetailsType.Live);
        
        List<ProductVariant> productVariants = _productVariantRepository
            .GetAllProductVariantsWithAssoc(liveProductionDetails.Id)
            .ToList();
        
        ProductMeasurement defaultMeasurements = product.ProductMeasurements.Single(pm => pm.IsDefault);
        
        decimal standardPrice = productVariants
            .Single(pv => pv.ProductMeasurementId == defaultMeasurements.Id &&
                          pv.ProductOptions.All(po => po.WorkPieceVariantId == null)).Price;
        
        await Task.WhenAll(productShopIdTask, currencyIdTask, propertyGroupTask);

       ProductForExportDto productForExportDto = new()
        {
            Active = false,
            Price = new List<PriceDto>
            {
                new()
                {
                    CurrencyId = currencyIdTask.Result,
                    Gross = standardPrice,
                    Net = standardPrice,
                    Linked = false
                }
            },
        };
        
        await _productApiManager.UpdateProductInShop(productForExportDto, productShopIdTask.Result);

        List<string> productChildrenIds = await _productApiManager.GetProductChildrenIds(productShopIdTask.Result);
        if (productChildrenIds.Count != 0)
        {
            await _productApiManager.DeleteProductChildren(productChildrenIds);
        }

        List<ChildDto> childDtos = GenerateChildren(ratingTypes, propertyGroupTask.Result, productVariants, product.ProductNumber, currencyIdTask.Result, productShopIdTask.Result);
        await _productApiManager.CreateProductChildren(childDtos);
    }
    
    private ProductForExportDto MapNewProductForExport(
        Product product,
        List<RatingType> ratingTypes,
        List<PropertyGroupDto> propertyGroupDtos,
        string currencyId,
        string categoryId,
        string salesChanelId,
        string taxId,
        List<MediaDto> media = null
    )
    {
        ProductMeasurement defaultMeasurements = product.ProductMeasurements.Single(pm => pm.IsDefault);
        CoverDto cover = null;

        ProductionDetails liveProductionDetails = product.ProductionDetails
            .Single(details => details.ProductionDetailsType == ProductionDetailsType.Live);

        List<ProductVariant> productVariants = _productVariantRepository
            .GetAllProductVariantsWithAssoc(liveProductionDetails.Id)
            .ToList();

        decimal standardPrice = productVariants
            .Single(pv => pv.ProductMeasurementId == defaultMeasurements.Id &&
                          pv.ProductOptions.All(po => po.WorkPieceVariantId == null)).Price;

        if (media is { Count: > 0 })
        {
            cover = new CoverDto { MediaId = media.First().MediaId };
            media = media.Where(img => img.MediaId != cover.MediaId).ToList();
        }

        ProductForExportDto productForExportDto = new()
        {
            Name = product.Name,
            ProductNumber = product.ProductNumber.ToString(),
            Description = product.DescriptionFromDev,
            Stock = 10,
            TaxId = taxId,
            Width = defaultMeasurements.Width,
            Height = defaultMeasurements.Height,
            Length = defaultMeasurements.Depth,
            Active = false,
            Price = new List<PriceDto>
            {
                new()
                {
                    CurrencyId = currencyId,
                    Gross = standardPrice,
                    Net = standardPrice,
                    Linked = false
                }
            },
            ConfiguratorSettings = _productApiManager.GetConfiguratorSettings(propertyGroupDtos).ToList(),
            Children = GenerateChildren(ratingTypes, propertyGroupDtos, productVariants, product.ProductNumber, currencyId),
            Media = media,
            Cover = cover,
            Categories = new List<CategoryDto> { new() { Id = categoryId } },
            Visibilities = new List<VisibilityDto>
            {
                new()
                {
                    SalesChannelId = salesChanelId,
                    Visibility = 30
                }
            }
        };
        return productForExportDto;
    }

    private List<ChildDto> GenerateChildren(
        List<RatingType> ratingTypes,
        List<PropertyGroupDto> propertyGroupDtos,
        List<ProductVariant> productVariants,
        int productNumber,
        string currencyId,
        string parentId = null)
    {
        List<ChildDto> combinations = new();

        PropertyGroupDto measurementGroup = propertyGroupDtos.Single(pg => pg.Name == L("Measurement.Name",
            CultureInfo.GetCultureInfoByIetfLanguageTag("De")));

        PropertyGroupDto valueChainGroup = propertyGroupDtos.Single(pg => pg.Name == L($"UserProfile.ProducerRatings.Name",
            CultureInfo.GetCultureInfoByIetfLanguageTag("De")));
        int i = 0;
        foreach (RatingType ratingType in ratingTypes)
        {
            PropertyGroupOptionDto valueChainOption = valueChainGroup
                .Options
                .SingleOrDefault(vco =>
                    vco.Name == L($"UserProfile.ProducerRatings.{ratingType.Name}", CultureInfo.GetCultureInfoByIetfLanguageTag("De")));

            if (valueChainOption == null)
            {
                continue;
            }

            foreach (ProductVariant productVariant in productVariants)
            {
                PropertyGroupOptionDto measurementOption = measurementGroup
                    .Options
                    .Single(mgo => mgo.Name == productVariant.ProductMeasurement.ToString());
                ChildDto child = new()
                {
                    ParentId = parentId,
                    ProductNumber = $"{productNumber}.{i++}",
                    Stock = 10,
                    Options = new List<PropertyGroupOptionDto>
                    {
                        new()
                        {
                            Id = valueChainOption.Id
                        },
                        new()
                        {
                            Id = measurementOption.Id
                        },
                    },
                    Price = new List<PriceDto>
                    {
                        new() { CurrencyId = currencyId, Gross = productVariant.Price, Net = productVariant.Price, Linked = false }
                    },
                    Properties = new List<ProductPropertyDto>
                    {
                        new()
                        {
                            Id = valueChainOption.Id,
                            Name = valueChainOption.Name,
                            GroupId = valueChainGroup.Id
                        },
                        new()
                        {
                            Id = measurementOption.Id,
                            Name = measurementOption.Name,
                            GroupId = measurementGroup.Id
                        }
                    },
                    CustomFields = new Dictionary<string, string>
                    {
                        { "pm_product_variant_id", productVariant.Id.ToString() },
                        { "pm_value_chain_parameter_id", ratingType.Id.ToString() }
                    }
                };

                foreach (ProductOption variantOption in productVariant.ProductOptions)
                {
                    string optionGroupName = variantOption
                        .WorkPiece
                        .ProductionStates
                        .First(ps => ps.StateType == ProductionStateType.WorkPieceFinal).Description;

                    string optionName = variantOption.WorkPieceVariantId == null
                        ? variantOption
                            .WorkPiece
                            .ProductionStates
                            .First(ps => ps.StateType == ProductionStateType.WorkPieceStart).Description
                        : variantOption.WorkPieceVariant.Description;

                    PropertyGroupDto group = propertyGroupDtos
                        .Single(pg => pg.Name.Equals(optionGroupName, StringComparison.OrdinalIgnoreCase));

                    PropertyGroupOptionDto option = group
                        .Options.Single(go => go.Name == optionName);

                    child.Options.Add(
                        new PropertyGroupOptionDto
                        {
                            Id = option.Id
                        });
                    child.Properties.Add(new ProductPropertyDto
                    {
                        Id = option.Id,
                        Name = option.Name,
                        GroupId = group.Id
                    });
                }

                combinations.Add(child);
            }
        }

        return combinations;
    }
}