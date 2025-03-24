using System;
using System.Data.Common;
using System.Text;
using Abp.Localization.Sources;
using NUglify.Helpers;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUsers;

namespace PMHelmutSchmidtPortal.HSUPortal.Users;

public static class ProducerQueryStringHelper
{
    public const string UserAlias = "p";
    public const string UserRoleAlias = "aur";
    public const string RolesAlias = "ar";
    public const string UserAddressAlias = "pua";
    public const string ProducerInfoAlias = "ppi";
    public const string TradeTypeAlias = "ptt";
    public const string ProductProducerAlias = "ppp";

    public const string UserIdOrdinal = "UserId";
    public const string CompanyNameOrdinal = "CompanyName";
    public const string TradeIdOrdinal = "TradeId";
    public const string TradeNameOrdinal = "TradeName";
    public const string StreetOrdinal = "Street";
    public const string ZipCodeOrdinal = "ZipCode";
    public const string CityOrdinal = "City";
    public const string EmailOrdinal = "Email";
    public const string PhoneNumberOrdinal = "PhoneNumber";
    public const string StatusOrdinal = "Status";
    public const string AssignmentStatusOrdinal = "AssignmentStatus";


    public static StringBuilder GetProducerWithFullInfo(this StringBuilder queryString, string selectString)
    {
        return queryString.Append($"""
                                   SELECT {selectString}
                                   FROM AbpUsers {UserAlias}
                                   JOIN AbpUserRoles {UserRoleAlias} On {UserAlias}.Id  = {UserRoleAlias}.UserId
                                   JOIN AbpRoles {RolesAlias} ON {UserRoleAlias}.RoleId = {RolesAlias}.Id AND {RolesAlias}.IsDeleted = 0
                                   JOIN PmUserAddress {UserAddressAlias} On {UserAlias}.Id = {UserAddressAlias}.UserId AND {UserAddressAlias}.IsDeleted = 0
                                   JOIN PmProducerInfo {ProducerInfoAlias} On {UserAlias}.Id = {ProducerInfoAlias}.UserId AND {ProducerInfoAlias}.IsDeleted = 0
                                   JOIN PmTradeType ptt On {ProducerInfoAlias}.TradeTypeId  = {TradeTypeAlias}.Id AND {TradeTypeAlias}.IsDeleted = 0

                                   """);
    }

    public static StringBuilder FilterByRole(this StringBuilder queryString, string roleParamName)
    {
        return queryString.Append($"""
                                   WHERE {RolesAlias}.Name = {roleParamName}

                                   """);
    }

    public static StringBuilder AndActiveOnlyUsers(this StringBuilder queryString)
    {
        return queryString.Append($"""
                                   AND {UserAlias}.IsActive = 1

                                   """);
    }

    public static StringBuilder AddProductProducers(this StringBuilder queryString, string productionDetailsParamName)
    {
        return queryString.Append($"""
                                   LEFT JOIN  PmProductProducer {ProductProducerAlias}
                                   On {UserAlias}.Id = {ProductProducerAlias}.AssignedProducerId
                                   AND {ProductProducerAlias}.IsDeleted = 0
                                   AND {ProductProducerAlias}.ProductionDetailsId = {productionDetailsParamName}
                                   
                                   """);
    }

    public static StringBuilder GetProducersSearch(this StringBuilder queryString, string searchParamName)
    {
        return queryString.Append(
            $"""
             AND (
             {UserAlias}.EmailAddress LIKE {searchParamName} OR
             {UserAlias}.PhoneNumber LIKE {searchParamName} OR
             {UserAddressAlias}.Name LIKE {searchParamName} OR
             CONCAT({UserAddressAlias}.Street,', ',{UserAddressAlias}.ZipCode,' ',{UserAddressAlias}.City ) LIKE {searchParamName}
             )

             """
        );
    }

    public static StringBuilder GetSortingQueryString(this StringBuilder queryString, string sorting, Func<string, bool, string> sortingDelegate)
    {
        string[] sortingParams = sorting.Split(' ');
        string columnName = sortingParams[0];
        bool isAscending = sortingParams.Length > 1 && string.Equals(sortingParams[1], "ASC", StringComparison.OrdinalIgnoreCase);
        return queryString.Append(sortingDelegate(columnName, isAscending));
    }

    public static StringBuilder GetPaginationString(this StringBuilder queryString, string skipCountParamName, string pageSizeParamName)
    {
        return queryString.Append($"""
                                   OFFSET {skipCountParamName} ROWS
                                   FETCH NEXT {pageSizeParamName} ROWS ONLY

                                   """);
    }
    
    
    public static string GetAssignmentStatusSortingQueryString(bool isAscending)
    {
        StringBuilder statusSort = new($"ORDER BY CASE {ProductProducerAlias}.AssignmentStatus ");

        ProducerAssignmentStatus[] enumValues = Enum.GetValues<ProducerAssignmentStatus>();
        int sortValue = isAscending ? 0 : enumValues.Length;

        enumValues.ForEach(enumValue =>
        {
            statusSort.Append($"WHEN '{enumValue.ToString()}' THEN {sortValue} ");
            sortValue = isAscending ? ++sortValue : --sortValue;
        });

        statusSort.Append($"ELSE {sortValue} END ");

        return statusSort.ToString();
    }

    public static ProducerAssignmentStatus? GetProducerAssignmentStatus(DbDataReader result)
    {
        int statusOrdinal = result.GetOrdinal(AssignmentStatusOrdinal);

        if (result.IsDBNull(statusOrdinal))
        {
            return null;
        }

        string statusValue = result.GetString(statusOrdinal);

        if (!Enum.TryParse(statusValue, out ProducerAssignmentStatus status))
        {
            return null;
        }

        return status;
    }

    public static int CompareByTradeTranslation(TradeType x, TradeType y, ILocalizationSource localisationService)
    {
        string translatedX = localisationService.GetString($"UserProfile.WorkType.{x.Name}");
        string translatedY = localisationService.GetString($"UserProfile.WorkType.{y.Name}");
        return string.Compare(translatedX, translatedY, StringComparison.CurrentCulture);
    }
}