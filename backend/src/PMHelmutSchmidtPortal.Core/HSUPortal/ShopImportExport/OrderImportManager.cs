using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using PMHelmutSchmidtPortal.HSUPortal.ShopImportExport.Filter;
using PMHelmutSchmidtPortal.HSUPortal.ShopOrders;

namespace PMHelmutSchmidtPortal.HSUPortal.ShopImportExport;

public class OrderImportManager : HSUDomainBaseService, IOrderImportManager
{
    private const string ApiGetOrders = "api/search/order";
    private const string ApiSetOrdersAsExported = "api/_action/sync";

    private readonly IShopwareApiConnector _shopwareApiConnector;

    public OrderImportManager(IShopwareApiConnector shopwareApiConnector)
    {
        _shopwareApiConnector = shopwareApiConnector;
    }

    public async Task<List<ShopOrder>> GetNewOrdersFromShop()
    {
        string response = await SendOrderImportRequest();
        JObject obj = JObject.Parse(response);

        List<ShopOrder> orders = obj["data"].Select(order => new ShopOrder()
        {
            ShopUuid = order["id"].ToString(),
            OrderNumber = order["attributes"]["orderNumber"].ToString(),
            OrderDate = DateTime.Parse(order["attributes"]["orderDateTime"].ToString()),
            Status = OrderStatus.Open
        }).ToList();

        foreach (ShopOrder order in orders)
        {
            order.CustomerInfo = GetCustomerInfo(obj["included"], order.ShopUuid);
            order.ProductVariantId = GetProductCustomFieldId(obj["included"], order.ShopUuid,"pm_product_variant_id");
            order.ValueChainParameterId = GetProductCustomFieldId(obj["included"], order.ShopUuid,"pm_value_chain_parameter_id");
        }

        return orders;
    }

    public async Task SetOrdersAsExported(IEnumerable<string> orderShopIds)
    {
        await _shopwareApiConnector.SendRequestAsync(
            HttpMethod.Post,
            ApiSetOrdersAsExported,
            new StringContent(
                JsonConvert.SerializeObject(new Dictionary<string,dynamic>()
                    {
                       {
                           "set-export-flag",
                           new
                           {
                               Entity = "order",
                               Action = "upsert",
                               Payload = orderShopIds.Select(id => new
                               {
                                   Id = id,
                                   CustomFields = new Dictionary<string,bool>()
                                   {
                                       {"pm_custom_fields_field__exported",true}
                                   }
                               })
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
    }

    private Task<string> SendOrderImportRequest()
    {
        return _shopwareApiConnector.SendRequestAsync(
            HttpMethod.Post,
            ApiGetOrders,
            new StringContent(
                JsonConvert.SerializeObject(new
                    {
                        Filter = new[]
                        {
                            new
                            {
                                Type = "not",
                                Queries = new List<FilterDto<bool>>
                                {
                                    new()
                                    {
                                        Type = "equals",
                                        Field = "customFields.pm_custom_fields_field__exported",
                                        Value = true
                                    }
                                }
                            }
                        },
                        Associations = new
                        {
                            LineItems = new { },
                            Addresses = new { }
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

    private static CustomerInfo GetCustomerInfo(JToken included, string orderShopId)
    {
        CustomerInfo customerInfo = included
            .Where(inc => inc["type"].ToString() == "order_address" &&
                          inc["attributes"]["orderId"]?.ToString() == orderShopId)
            .Select(address => new CustomerInfo()
            {
                Name = address["attributes"]["firstName"] + " " + address["attributes"]["lastName"],
                PhoneNumber = address["attributes"]["phoneNumber"].ToString(),
                Street = address["attributes"]["street"].ToString(),
                Zip = address["attributes"]["zipcode"].ToString(),
                City = address["attributes"]["city"].ToString(),
            })
            .First();

        customerInfo.EmailAddress = included
            .First(inc => inc["type"].ToString() == "order_customer" &&
                          inc["attributes"]["orderId"].ToString() == orderShopId)["attributes"]["email"].ToString();

        return customerInfo;
    }

    private static int GetProductCustomFieldId(JToken included, string orderShopId, string customField)
    {
        JToken productVariantId = included
            .First(inc => inc["type"].ToString() == "order_line_item" &&
                          inc["attributes"]["orderId"].ToString() == orderShopId)["attributes"]["payload"]["customFields"][$"{customField}"];

        return int.Parse(productVariantId.ToString());
    }

}