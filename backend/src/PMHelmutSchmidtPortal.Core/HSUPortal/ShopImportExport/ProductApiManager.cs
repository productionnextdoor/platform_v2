using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using PMHelmutSchmidtPortal.HSUPortal.ShopImportExport.Filter;
using System.Net.Http.Headers;
using Abp.MimeTypes;
using PMHelmutSchmidtPortal.HSUPortal.Products.Details;
using PMHelmutSchmidtPortal.HSUPortal.ShopImportExport.Products;
using PMHelmutSchmidtPortal.HSUPortal.ShopImportExport.PropertyGroups;

namespace PMHelmutSchmidtPortal.HSUPortal.ShopImportExport;

public class ProductApiManager : HSUDomainBaseService, IProductApiManager
{
    private const string ApiProduct = "api/product";
    private const string ApiMediaUpload = "api/_action/media";
    private const string ApiMediaHolder = "api/media?_response=true";
    private const string ApiSearchProduct = "api/search/product";
    private const string ApiSearchTax = "api/search/tax";
    private const string ApiSearchCurrency = "api/search/currency";
    private const string ApiSearchCategory = "api/search/category";
    private const string ApiSearchSalesChannel = "api/search/sales-channel";
    private const string ApiBulkAction = "api/_action/sync";

    private readonly IShopwareApiConnector _shopwareApiConnector;
    private readonly IProductFileManager _productFileManager;
    private readonly IMimeTypeMap _mimeTypeMap;

    public ProductApiManager(
        IShopwareApiConnector shopwareApiConnector,
        IProductFileManager productFileManager,
        IMimeTypeMap mimeTypeMap
    )
    {
        _shopwareApiConnector = shopwareApiConnector;
        _productFileManager = productFileManager;
        _mimeTypeMap = mimeTypeMap;
    }

    public async Task ExportProductToShop(ProductForExportDto productForExportDto)
    {
        await _shopwareApiConnector.SendRequestAsync(
            HttpMethod.Post,
            ApiProduct,
            new StringContent(
                JsonConvert.SerializeObject(
                    productForExportDto,
                    new JsonSerializerSettings
                    {
                        NullValueHandling = NullValueHandling.Ignore,
                        ContractResolver = new DefaultContractResolver
                        {
                            NamingStrategy = new CamelCaseNamingStrategy()
                        }
                    }),
                new MediaTypeHeaderValue("application/json")
            )
        );
    }

    public async Task UpdateProductInShop(ProductForExportDto productForExportDto, string productShopId)
    {
        await _shopwareApiConnector.SendRequestAsync(
            HttpMethod.Patch,
            $"{ApiProduct}/{productShopId}",
            new StringContent(
                JsonConvert.SerializeObject(
                    productForExportDto,
                    new JsonSerializerSettings
                    {
                        NullValueHandling = NullValueHandling.Ignore,
                        ContractResolver = new DefaultContractResolver
                        {
                            NamingStrategy = new CamelCaseNamingStrategy()
                        }
                    }),
                new MediaTypeHeaderValue("application/json")
            )
        );
    }

    public async Task<List<MediaDto>> UploadImages(IEnumerable<ProductFile> images)
    {
        int position = 0;
        List<Task<MediaDto>> mediaDtos = images
            .Where(image => _productFileManager.IsSupportedImageType(_mimeTypeMap.GetMimeType(image.FileName)))
            .Select(image => UploadImage(image, position++))
            .ToList();

        return (await Task.WhenAll(mediaDtos)).ToList();
    }

    public async Task DeleteProductChildren(List<string> productChildrenIds)
    {
        string response = await BulkAction("product", "delete", productChildrenIds.ConvertAll(id => new Dictionary<string, string> { { "id", id } }));
        JObject jObject = JObject.Parse(response);
    }

    public async Task CreateProductChildren(List<ChildDto> productChildren)
    {
        string response = await BulkAction("product", "upsert", productChildren);
        JObject jObject = JObject.Parse(response);
    }

    public async Task<string> GetProductShopId(string productNumber)
    {
        return await GetIdByFilter(ApiSearchProduct, "productNumber", productNumber);
    }

    public async Task<List<string>> GetProductChildrenIds(string productShopId)
    {
        string response = await _shopwareApiConnector.SendRequestAsync(
            HttpMethod.Post,
            ApiSearchProduct,
            new StringContent(
                JsonConvert.SerializeObject(new
                    {
                        Filter = new List<FilterDto<string>>
                        {
                            new()
                            {
                                Type = "equals",
                                Field = "parentId",
                                Value = productShopId
                            }
                        }
                    },
                    new JsonSerializerSettings
                    {
                        ContractResolver = new DefaultContractResolver
                        {
                            NamingStrategy = new CamelCaseNamingStrategy()
                        }
                    }),
                new MediaTypeHeaderValue("application/json"))
        );
        JObject obj = JObject.Parse(response);
        return obj["data"].Select(child => child["id"].ToString()).ToList();
    }

    public async Task<string> GetTaxId(string taxName)
    {
        return await GetProductAttributeIdByName(taxName, ApiSearchTax);
    }

    public async Task<string> GetCurrencyId(string currencyName)
    {
        return await GetProductAttributeIdByName(currencyName, ApiSearchCurrency);
    }

    public async Task<string> GetCategoryId(string categoryName)
    {
        return await GetProductAttributeIdByName(categoryName, ApiSearchCategory);
    }

    public async Task<string> GetSalesChanelId(string salesChannelName)
    {
        return await GetProductAttributeIdByName(salesChannelName, ApiSearchSalesChannel);
    }

    public async Task<string> CreateMediaHolderAndGetId()
    {
        string response = await _shopwareApiConnector.SendRequestAsync(
            HttpMethod.Post,
            ApiMediaHolder,
            new StringContent(JsonConvert.SerializeObject(new
                {
                    Name = ""
                },
                new JsonSerializerSettings
                {
                    ContractResolver = new DefaultContractResolver
                    {
                        NamingStrategy = new CamelCaseNamingStrategy()
                    }
                }), new MediaTypeHeaderValue("application/json"))
        );

        dynamic obj = JObject.Parse(response);
        return obj.data.id;
    }

    public IEnumerable<ConfiguratorSettings> GetConfiguratorSettings(IEnumerable<PropertyGroupDto> propertyGroupDtos)
    {
        return propertyGroupDtos
            .Where(pg => pg.Options.Count > 1)
            .SelectMany(pg => pg.Options)
            .ToList()
            .Select(option => new ConfiguratorSettings { Option = option });
    }

    private async Task<string> GetProductAttributeIdByName(string name, string url)
    {
        return await GetIdByFilter(url, "name", name);
    }

    private async Task<string> GetIdByFilter(string url, string fieldId, string value)
    {
        string response = await _shopwareApiConnector.SendRequestAsync(
            HttpMethod.Post,
            url,
            new StringContent(
                JsonConvert.SerializeObject(new
                    {
                        Filter = new List<FilterDto<string>>
                        {
                            new()
                            {
                                Type = "equals",
                                Field = fieldId,
                                Value = value
                            }
                        }
                    },
                    new JsonSerializerSettings
                    {
                        ContractResolver = new DefaultContractResolver
                        {
                            NamingStrategy = new CamelCaseNamingStrategy()
                        }
                    }),
                new MediaTypeHeaderValue("application/json"))
        );
        dynamic obj = JObject.Parse(response);
        return obj.data.First.id;
    }

    private async Task<MediaDto> UploadImage(ProductFile image, int position)
    {
        string mediaHolderId = await CreateMediaHolderAndGetId();
        string imageExtension = Path.GetExtension(image.FileName)?.TrimStart('.');
        string imageFullPath = _productFileManager.GetFullFilePath(image.FilePath);
        byte[] fileBytes = await File.ReadAllBytesAsync(imageFullPath);

        string requestUrl = $"{ApiMediaUpload}/{mediaHolderId}/upload?extension={imageExtension}";

        ByteArrayContent content = new(fileBytes);
        content.Headers.ContentType = new MediaTypeHeaderValue(_mimeTypeMap.GetMimeType(image.FileName));

        await _shopwareApiConnector.SendRequestAsync(HttpMethod.Post, requestUrl, content);

        return new MediaDto
        {
            MediaId = mediaHolderId,
            Position = position
        };
    }

    private async Task<string> BulkAction<T>(string entity, string action, List<T> payload)
    {
        return await _shopwareApiConnector.SendRequestAsync(
            HttpMethod.Post,
            ApiBulkAction,
            new StringContent(JsonConvert.SerializeObject(new Dictionary<string, object>()
                {
                    {"write-product" , new
                    {
                        Entity = entity,
                        Action = action,
                        Payload = payload
                    }}
                },
                new JsonSerializerSettings
                {
                    NullValueHandling = NullValueHandling.Ignore,
                    ContractResolver = new DefaultContractResolver
                    {
                        NamingStrategy = new CamelCaseNamingStrategy()
                    }
                }))
        );
    }
}