using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using PMHelmutSchmidtPortal.HSUPortal.Products;
using PMHelmutSchmidtPortal.HSUPortal.Products.Details;
using PMHelmutSchmidtPortal.HSUPortal.ShopImportExport.Filter;
using PMHelmutSchmidtPortal.HSUPortal.ShopImportExport.PropertyGroups;
using PMHelmutSchmidtPortal.HSUPortal.Users;

namespace PMHelmutSchmidtPortal.HSUPortal.ShopImportExport;

public class PropertyGroupsManager : HSUDomainBaseService, IPropertyGroupsManager
{
    private const string ApiPropertyGroup = "api/property-group";
    private const string ApiSearchPropertyGroup = "api/search/property-group";
    private readonly IShopwareApiConnector _shopwareApiConnector;

    public PropertyGroupsManager(IShopwareApiConnector shopwareApiConnector)
    {
        _shopwareApiConnector = shopwareApiConnector;
    }

    public async Task<List<PropertyGroupDto>> GetPropertyGroups(
        ICollection<ProductMeasurement> productMeasurements,
        ICollection<WorkPiece> workPieces,
        ICollection<RatingType> ratingTypes)
    {
        List<Task<PropertyGroupDto>> propertyGroupDtos = new()
        {
            SetProductPropertyGroup(
                L($"UserProfile.ProducerRatings.Name", CultureInfo.GetCultureInfoByIetfLanguageTag("De")),
                ratingTypes
                    .Select(rt => L($"UserProfile.ProducerRatings.{rt.Name}", CultureInfo.GetCultureInfoByIetfLanguageTag("De")))
                    .ToList())
        };

        propertyGroupDtos.Add(SetProductPropertyGroup(
            L($"Measurement.Name", CultureInfo.GetCultureInfoByIetfLanguageTag("De")),
            productMeasurements
                .Select(pm => pm.ToString())
                .ToList()));

        foreach (WorkPiece workPiece in workPieces)
        {
            string groupName = workPiece.ProductionStates.First(ps => ps.StateType == ProductionStateType.WorkPieceFinal).Description;

            //Standard option
            List<string> optionNames = new()
            {
                workPiece.ProductionStates.First(ps => ps.StateType == ProductionStateType.WorkPieceStart).Description
            };

            if (workPiece.WorkPieceVariants.Count != 0)
            {
                optionNames.AddRange(workPiece.WorkPieceVariants.Select(wpv => wpv.Description).ToList());
            }

            propertyGroupDtos.Add(SetProductPropertyGroup(groupName, optionNames));
        }

        return (await Task.WhenAll(propertyGroupDtos)).ToList();
    }

    private async Task<PropertyGroupDto> SetProductPropertyGroup(string groupName, List<string> optionNames)
    {
        PropertyGroupDto propertyGroupDto = await GetPropertyGroupByName(groupName);

        foreach (string optionName in optionNames)
        {
            PropertyGroupOptionDto option = propertyGroupDto.Options.SingleOrDefault(mg => mg.Name == optionName);

            if (option != null)
            {
                continue;
            }

            propertyGroupDto.Options.Add(new PropertyGroupOptionDto
            {
                Name = optionName
            });
        }

        if (propertyGroupDto.Options.Any(op => op.Id == null))
        {
            propertyGroupDto = await CreateOrUpdatePropertyGroup(propertyGroupDto);
        }

        propertyGroupDto.Options = propertyGroupDto
            .Options
            .Where(pg =>
                optionNames.Contains(pg.Name)).ToList();

        return propertyGroupDto;
    }

    private async Task<PropertyGroupDto> CreateOrUpdatePropertyGroup(PropertyGroupDto input)
    {
        await _shopwareApiConnector.SendRequestAsync(
            input.Id == null
                ? HttpMethod.Post
                : HttpMethod.Patch,
            $"{ApiPropertyGroup}/{input.Id}",
            new StringContent(
                JsonConvert.SerializeObject(input,
                    new JsonSerializerSettings
                    {
                        ContractResolver = new DefaultContractResolver
                        {
                            NamingStrategy = new CamelCaseNamingStrategy()
                        }
                    }),
                new MediaTypeHeaderValue("application/json"))
        );

        dynamic obj = JObject.Parse(await GetPropertyGroupResponse(input.Name));
        return MapPropertyGroup(obj);
    }

    private async Task<PropertyGroupDto> GetPropertyGroupByName(string name)
    {
        dynamic obj = JObject.Parse(await GetPropertyGroupResponse(name));

        if (!obj.data.HasValues)
        {
            return new PropertyGroupDto
            {
                Name = name,
                DisplayType = "select",
                SortingType = "alphanumeric",
                Filterable = false,
                VisibleOnProductDetailPage = true,
                Options = new List<PropertyGroupOptionDto>()
            };
        }

        return MapPropertyGroup(obj);
    }

    private async Task<string> GetPropertyGroupResponse(string name)
    {
        return await _shopwareApiConnector.SendRequestAsync(
            HttpMethod.Post,
            ApiSearchPropertyGroup,
            new StringContent(
                JsonConvert.SerializeObject(new
                    {
                        Filter = new List<FilterDto<string>>
                        {
                            new()
                            {
                                Type = "equals",
                                Field = "property_group.name",
                                Value = name
                            }
                        },
                        Associations = new
                        {
                            Options = new { }
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
    }

    private static PropertyGroupDto MapPropertyGroup(dynamic obj)
    {
        List<PropertyGroupOptionDto> options = new();

        foreach (dynamic option in obj.included)
        {
            options.Add(new PropertyGroupOptionDto
            {
                Id = option.id,
                Name = option.attributes.name
            });
        }

        return new PropertyGroupDto
        {
            Id = obj.data.First.id,
            Name = obj.data.First.attributes.name,
            DisplayType = obj.data.First.attributes.displayType,
            SortingType = obj.data.First.attributes.sortingType,
            Filterable = obj.data.First.attributes.filterable,
            VisibleOnProductDetailPage = obj.data.First.attributes.visibleOnProductDetailPage,
            Position = (obj.data.First.attributes.position != null && obj.data.First.attributes.position.Type == JTokenType.Integer)
                ? obj.data.First.attributes.position.ToObject<int>()
                : 0,
            Options = options
        };
    }
}