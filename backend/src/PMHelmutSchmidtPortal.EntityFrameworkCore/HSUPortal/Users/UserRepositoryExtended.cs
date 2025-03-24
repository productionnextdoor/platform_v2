using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.EntityFrameworkCore;
using Abp.Linq.Extensions;
using Abp.Localization;
using Abp.Localization.Sources;
using Abp.UI;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using NUglify.Helpers;
using PMHelmutSchmidtPortal.Authorization.Roles;
using PMHelmutSchmidtPortal.EntityFrameworkCore;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUsers;

namespace PMHelmutSchmidtPortal.HSUPortal.Users;

public class UserRepositoryExtended : UserRepository, IUserRepositoryExtended
{
    private readonly IDbContextProvider<PMHelmutSchmidtPortalDbContext> _dbContextProvider;
    private readonly ILocalizationSource _localizationSource;

    private const string ProductionDetailsId = "@productionDetailsId";
    private const string RoleNameParam = "@roleName";
    private const string SkipCountParam = "@skipCount";
    private const string PageSizeParam = "@pageSize";
    private const string SearchTermParam = "@searchTerm";

    public UserRepositoryExtended(IDbContextProvider<PMHelmutSchmidtPortalDbContext> dbContextProvider, ILocalizationManager localizationManager)
        : base(dbContextProvider)
    {
        _dbContextProvider = dbContextProvider;
        _localizationSource = localizationManager.GetSource(PMHelmutSchmidtPortalConsts.HsuClientLocalizationSourceName);
    }

    public async Task<IQueryable<User>> GetDevelopersFiltered(DeveloperOverviewInput input, int roleId)
    {
        return (await GetAllAsync())
            .Include(u => u.Roles)
            .Include(u => u.UserAddress)
            .Where(u => u.Roles.Any(ur => ur.RoleId == roleId))
            .WhereIf(!input.Filter.IsNullOrWhiteSpace(),
                dev =>
                    (dev.Name + " " + dev.Surname).Contains(input.Filter) ||
                    dev.EmailAddress.Contains(input.Filter) ||
                    dev.PhoneNumber.Contains(input.Filter) ||
                    (dev.UserAddress.Street + ", " + dev.UserAddress.ZipCode + " " + dev.UserAddress.City).Contains(input.Filter));
    }

    public async Task<PagedResultDto<ProductProducerListDto>> GetProductProducers(ProductProducersInputDto input, int productionDetailsId)
    {
        int total = await GetTotalProducers("", true);

        StringBuilder queryString = new StringBuilder()
            .GetProducerWithFullInfo(
                $"""
                 {ProducerQueryStringHelper.UserAlias}.Id as {ProducerQueryStringHelper.UserIdOrdinal} ,
                 {ProducerQueryStringHelper.UserAddressAlias}.Name as {ProducerQueryStringHelper.CompanyNameOrdinal},
                 {ProducerQueryStringHelper.TradeTypeAlias}.Id as {ProducerQueryStringHelper.TradeIdOrdinal},
                 {ProducerQueryStringHelper.TradeTypeAlias}.Name as {ProducerQueryStringHelper.TradeNameOrdinal},
                 {ProducerQueryStringHelper.ProductProducerAlias}.AssignmentStatus as {ProducerQueryStringHelper.AssignmentStatusOrdinal}
                 """)
            .AddProductProducers(ProductionDetailsId)
            .FilterByRole(RoleNameParam)
            .AndActiveOnlyUsers()
            .GetSortingQueryString(input.Sorting, (columnName, isAscending) =>
            {
                return columnName switch
                {
                    "companyName" => $"ORDER BY {ProducerQueryStringHelper.CompanyNameOrdinal} {(isAscending ? "ASC" : "DESC")} ",
                    "status" => ProducerQueryStringHelper.GetAssignmentStatusSortingQueryString(isAscending),
                    "tradeTypeName" => GetTradeSortingQueryString(isAscending),
                    _ => throw new UserFriendlyException("Wrong column")
                };
            })
            .GetPaginationString(SkipCountParam, PageSizeParam);

        SqlParameter[] parameters =
        {
            new(RoleNameParam, StaticRoleNames.Host.Producer),
            new(ProductionDetailsId, productionDetailsId),
            new(SkipCountParam, input.SkipCount),
            new(PageSizeParam, input.MaxResultCount > 0 ? input.MaxResultCount : AppConsts.DefaultPageSize),
        };

        List<ProductProducerListDto> producerList = await DbHelper
            .GetDbCommand(await _dbContextProvider.GetDbContextAsync(), queryString, parameters)
            .ReadCommandResult<ProductProducerListDto>(MapProductProducerListDto);

        return new PagedResultDto<ProductProducerListDto>(total, producerList);
    }

    public async Task<PagedResultDto<ProducerOverviewOutput>> GetAllProducers(ProducerOverviewInput input)
    {
        int total = await GetTotalProducers(input.Filter);

        StringBuilder queryString = new StringBuilder()
            .GetProducerWithFullInfo(
                $"""
                 {ProducerQueryStringHelper.UserAlias}.Id as {ProducerQueryStringHelper.UserIdOrdinal},
                 {ProducerQueryStringHelper.UserAlias}.EmailAddress as {ProducerQueryStringHelper.EmailOrdinal},
                 {ProducerQueryStringHelper.UserAlias}.PhoneNumber as {ProducerQueryStringHelper.PhoneNumberOrdinal},
                 {ProducerQueryStringHelper.UserAlias}.Status as {ProducerQueryStringHelper.StatusOrdinal},
                 {ProducerQueryStringHelper.UserAddressAlias}.Name as {ProducerQueryStringHelper.CompanyNameOrdinal},
                 {ProducerQueryStringHelper.UserAddressAlias}.Street as {ProducerQueryStringHelper.StreetOrdinal},
                 {ProducerQueryStringHelper.UserAddressAlias}.ZipCode as {ProducerQueryStringHelper.ZipCodeOrdinal},
                 {ProducerQueryStringHelper.UserAddressAlias}.City as {ProducerQueryStringHelper.CityOrdinal},
                 {ProducerQueryStringHelper.TradeTypeAlias}.Id as {ProducerQueryStringHelper.TradeIdOrdinal},
                 {ProducerQueryStringHelper.TradeTypeAlias}.Name as {ProducerQueryStringHelper.TradeNameOrdinal}
                 """)
            .FilterByRole(RoleNameParam)
            .GetProducersSearch(SearchTermParam)
            .GetSortingQueryString(input.Sorting, (columnName, isAscending) =>
            {
                return columnName switch
                {
                    "companyName" => $"ORDER BY {ProducerQueryStringHelper.CompanyNameOrdinal} {(isAscending ? "ASC" : "DESC")} ",
                    "status" => $"ORDER BY {ProducerQueryStringHelper.StatusOrdinal} {(isAscending ? "ASC" : "DESC")} ",
                    "tradeTypeName" => GetTradeSortingQueryString(isAscending),
                    _ => throw new UserFriendlyException("Wrong column")
                };
            })
            .GetPaginationString(SkipCountParam, PageSizeParam);

        SqlParameter[] parameters =
        {
            new(RoleNameParam, StaticRoleNames.Host.Producer),
            new(SkipCountParam, input.SkipCount),
            new(PageSizeParam, input.MaxResultCount > 0 ? input.MaxResultCount : AppConsts.DefaultPageSize),
            new(SearchTermParam, $"%{input.Filter}%"),
        };

        List<ProducerOverviewOutput> producerList = await DbHelper
            .GetDbCommand(await _dbContextProvider.GetDbContextAsync(), queryString, parameters)
            .ReadCommandResult<ProducerOverviewOutput>(MapProducerListDto);

        return new PagedResultDto<ProducerOverviewOutput>(total, producerList);
    }

    private async Task<int> GetTotalProducers(string searchValue = "", bool activeOnly = false)
    {
        StringBuilder queryString = new StringBuilder()
            .GetProducerWithFullInfo("Count(*) as TotalProducers")
            .FilterByRole(RoleNameParam);

        if (activeOnly)
        {
            queryString.AndActiveOnlyUsers();
        }

        List<SqlParameter> parameters = new() { new SqlParameter(RoleNameParam, StaticRoleNames.Host.Producer) };

        if (!searchValue.IsNullOrWhiteSpace())
        {
            queryString.GetProducersSearch(SearchTermParam);
            parameters.Add(new SqlParameter(SearchTermParam, $"%{searchValue}%"));
        }


        List<int> totals = await DbHelper
            .GetDbCommand(await _dbContextProvider.GetDbContextAsync(), queryString, parameters.ToArray())
            .ReadCommandResult<int>((total, result) => { total.Add(result.GetInt32(result.GetOrdinal("TotalProducers"))); });

        return totals.First();
    }

    private static void MapProductProducerListDto(ICollection<ProductProducerListDto> producerList, DbDataReader result)
    {
        int userIdOrdinal = result.GetOrdinal(ProducerQueryStringHelper.UserIdOrdinal);
        int companyNameOrdinal = result.GetOrdinal(ProducerQueryStringHelper.CompanyNameOrdinal);
        int tradeIdOrdinal = result.GetOrdinal(ProducerQueryStringHelper.TradeIdOrdinal);
        int tradeNameOrdinal = result.GetOrdinal(ProducerQueryStringHelper.TradeNameOrdinal);

        producerList.Add(new ProductProducerListDto()
        {
            ProducerId = result.GetInt64(userIdOrdinal),
            CompanyName = !result.IsDBNull(companyNameOrdinal) ? result.GetString(companyNameOrdinal) : "",
            Trade = new TradeTypeDto
            {
                TradeTypeId = !result.IsDBNull(tradeIdOrdinal) ? result.GetInt32(tradeIdOrdinal) : 0,
                TradeTypeName = !result.IsDBNull(tradeNameOrdinal) ? result.GetString(tradeNameOrdinal) : ""
            },
            Status = ProducerQueryStringHelper.GetProducerAssignmentStatus(result)
        });
    }

    private static void MapProducerListDto(ICollection<ProducerOverviewOutput> producerList, DbDataReader result)
    {
        int userIdOrdinal = result.GetOrdinal(ProducerQueryStringHelper.UserIdOrdinal);
        int companyNameOrdinal = result.GetOrdinal(ProducerQueryStringHelper.CompanyNameOrdinal);
        int tradeIdOrdinal = result.GetOrdinal(ProducerQueryStringHelper.TradeIdOrdinal);
        int tradeNameOrdinal = result.GetOrdinal(ProducerQueryStringHelper.TradeNameOrdinal);
        int streetOrdinal = result.GetOrdinal(ProducerQueryStringHelper.StreetOrdinal);
        int zipCodeOrdinal = result.GetOrdinal(ProducerQueryStringHelper.ZipCodeOrdinal);
        int cityOrdinal = result.GetOrdinal(ProducerQueryStringHelper.CityOrdinal);
        int emailOrdinal = result.GetOrdinal(ProducerQueryStringHelper.EmailOrdinal);
        int phoneNumberOrdinal = result.GetOrdinal(ProducerQueryStringHelper.PhoneNumberOrdinal);
        int statusOrdinal = result.GetOrdinal(ProducerQueryStringHelper.StatusOrdinal);

        string status = !result.IsDBNull(statusOrdinal) ? result.GetString(statusOrdinal) : "";
        
        if (!Enum.TryParse(status,out UserStatus userStatus))
        {
            userStatus = UserStatus.InActive;
        }
        
        producerList.Add(new ProducerOverviewOutput()
        {
            UserId = result.GetInt64(userIdOrdinal),
            CompanyName = !result.IsDBNull(companyNameOrdinal) ? result.GetString(companyNameOrdinal) : "",
            Trade = new TradeTypeDto
            {
                TradeTypeId = !result.IsDBNull(tradeIdOrdinal) ? result.GetInt32(tradeIdOrdinal) : 0,
                TradeTypeName = !result.IsDBNull(tradeNameOrdinal) ? result.GetString(tradeNameOrdinal) : ""
            },
            Street = !result.IsDBNull(streetOrdinal) ? result.GetString(streetOrdinal) : "",
            ZipCode = !result.IsDBNull(zipCodeOrdinal) ? result.GetString(zipCodeOrdinal) : "",
            City = !result.IsDBNull(cityOrdinal) ? result.GetString(cityOrdinal) : "",
            Email = !result.IsDBNull(emailOrdinal) ? result.GetString(emailOrdinal) : "",
            PhoneNumber = !result.IsDBNull(phoneNumberOrdinal) ? result.GetString(phoneNumberOrdinal) : "",
            Status = userStatus,
        });
    }

    private string GetTradeSortingQueryString(bool isAscending)
    {
        StringBuilder statusSort = new($"ORDER BY CASE {ProducerQueryStringHelper.TradeTypeAlias}.Name ");

        List<TradeType> trades = _dbContextProvider
            .GetDbContext()
            .WorkTypes
            .ToList();

        trades.Sort((first, second) =>
            isAscending
                ? ProducerQueryStringHelper.CompareByTradeTranslation(first, second, _localizationSource)
                : ProducerQueryStringHelper.CompareByTradeTranslation(second, first, _localizationSource));

        for (int i = 0; i < trades.Count; i++)
        {
            statusSort.Append($"WHEN '{trades[i].Name}' THEN {i} ");
        }

        statusSort.Append($"ELSE {trades.Count} END ");
        return statusSort.ToString();
    }
}