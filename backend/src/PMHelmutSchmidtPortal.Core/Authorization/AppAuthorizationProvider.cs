using Abp.Authorization;
using Abp.Configuration.Startup;
using Abp.Localization;
using Abp.MultiTenancy;

namespace PMHelmutSchmidtPortal.Authorization;

/// <summary>
/// Application's authorization provider.
/// Defines permissions for the application.
/// See <see cref="AppPermissions"/> for all permission names.
/// </summary>
public class AppAuthorizationProvider : AuthorizationProvider
{
    private readonly bool _isMultiTenancyEnabled;

    public AppAuthorizationProvider(bool isMultiTenancyEnabled)
    {
        _isMultiTenancyEnabled = isMultiTenancyEnabled;
    }

    public AppAuthorizationProvider(IMultiTenancyConfig multiTenancyConfig)
    {
        _isMultiTenancyEnabled = multiTenancyConfig.IsEnabled;
    }

    public override void SetPermissions(IPermissionDefinitionContext context)
    {
        //COMMON PERMISSIONS (FOR BOTH OF TENANTS AND HOST)

        #region Base Permissions

        Permission pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));
        pages.CreateChildPermission(AppPermissions.Pages_DemoUiComponents, L("DemoUiComponents"));

        Permission administration = pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

        Permission roles = administration.CreateChildPermission(AppPermissions.Pages_Administration_Roles, L("Roles"));
        roles.CreateChildPermission(AppPermissions.Pages_Administration_Roles_Create, L("CreatingNewRole"));
        roles.CreateChildPermission(AppPermissions.Pages_Administration_Roles_Edit, L("EditingRole"));
        roles.CreateChildPermission(AppPermissions.Pages_Administration_Roles_Delete, L("DeletingRole"));

        Permission users = administration.CreateChildPermission(AppPermissions.Pages_Administration_Users, L("Users"));
        users.CreateChildPermission(AppPermissions.Pages_Administration_Users_Create, L("CreatingNewUser"));
        users.CreateChildPermission(AppPermissions.Pages_Administration_Users_Edit, L("EditingUser"));
        users.CreateChildPermission(AppPermissions.Pages_Administration_Users_Delete, L("DeletingUser"));
        users.CreateChildPermission(AppPermissions.Pages_Administration_Users_ChangePermissions, L("ChangingPermissions"));
        users.CreateChildPermission(AppPermissions.Pages_Administration_Users_Impersonation, L("LoginForUsers"));
        users.CreateChildPermission(AppPermissions.Pages_Administration_Users_Unlock, L("Unlock"));
        users.CreateChildPermission(AppPermissions.Pages_Administration_Users_ChangeProfilePicture, L("UpdateUsersProfilePicture"));

        Permission languages = administration.CreateChildPermission(AppPermissions.Pages_Administration_Languages, L("Languages"));
        languages.CreateChildPermission(AppPermissions.Pages_Administration_Languages_Create, L("CreatingNewLanguage"), multiTenancySides: _isMultiTenancyEnabled ? MultiTenancySides.Host : MultiTenancySides.Tenant);
        languages.CreateChildPermission(AppPermissions.Pages_Administration_Languages_Edit, L("EditingLanguage"), multiTenancySides: _isMultiTenancyEnabled ? MultiTenancySides.Host : MultiTenancySides.Tenant);
        languages.CreateChildPermission(AppPermissions.Pages_Administration_Languages_Delete, L("DeletingLanguages"), multiTenancySides: _isMultiTenancyEnabled ? MultiTenancySides.Host : MultiTenancySides.Tenant);
        languages.CreateChildPermission(AppPermissions.Pages_Administration_Languages_ChangeTexts, L("ChangingTexts"));
        languages.CreateChildPermission(AppPermissions.Pages_Administration_Languages_ChangeDefaultLanguage, L("ChangeDefaultLanguage"));

        administration.CreateChildPermission(AppPermissions.Pages_Administration_AuditLogs, L("AuditLogs"));

        Permission organizationUnits = administration.CreateChildPermission(AppPermissions.Pages_Administration_OrganizationUnits, L("OrganizationUnits"));
        organizationUnits.CreateChildPermission(AppPermissions.Pages_Administration_OrganizationUnits_ManageOrganizationTree, L("ManagingOrganizationTree"));
        organizationUnits.CreateChildPermission(AppPermissions.Pages_Administration_OrganizationUnits_ManageMembers, L("ManagingMembers"));
        organizationUnits.CreateChildPermission(AppPermissions.Pages_Administration_OrganizationUnits_ManageRoles, L("ManagingRoles"));

        administration.CreateChildPermission(AppPermissions.Pages_Administration_UiCustomization, L("VisualSettings"));

        Permission webhooks = administration.CreateChildPermission(AppPermissions.Pages_Administration_WebhookSubscription, L("Webhooks"));
        webhooks.CreateChildPermission(AppPermissions.Pages_Administration_WebhookSubscription_Create, L("CreatingWebhooks"));
        webhooks.CreateChildPermission(AppPermissions.Pages_Administration_WebhookSubscription_Edit, L("EditingWebhooks"));
        webhooks.CreateChildPermission(AppPermissions.Pages_Administration_WebhookSubscription_ChangeActivity, L("ChangingWebhookActivity"));
        webhooks.CreateChildPermission(AppPermissions.Pages_Administration_WebhookSubscription_Detail, L("DetailingSubscription"));
        webhooks.CreateChildPermission(AppPermissions.Pages_Administration_Webhook_ListSendAttempts, L("ListingSendAttempts"));
        webhooks.CreateChildPermission(AppPermissions.Pages_Administration_Webhook_ResendWebhook, L("ResendingWebhook"));

        Permission dynamicProperties = administration.CreateChildPermission(AppPermissions.Pages_Administration_DynamicProperties, L("DynamicProperties"));
        dynamicProperties.CreateChildPermission(AppPermissions.Pages_Administration_DynamicProperties_Create, L("CreatingDynamicProperties"));
        dynamicProperties.CreateChildPermission(AppPermissions.Pages_Administration_DynamicProperties_Edit, L("EditingDynamicProperties"));
        dynamicProperties.CreateChildPermission(AppPermissions.Pages_Administration_DynamicProperties_Delete, L("DeletingDynamicProperties"));

        Permission dynamicPropertyValues = dynamicProperties.CreateChildPermission(AppPermissions.Pages_Administration_DynamicPropertyValue, L("DynamicPropertyValue"));
        dynamicPropertyValues.CreateChildPermission(AppPermissions.Pages_Administration_DynamicPropertyValue_Create, L("CreatingDynamicPropertyValue"));
        dynamicPropertyValues.CreateChildPermission(AppPermissions.Pages_Administration_DynamicPropertyValue_Edit, L("EditingDynamicPropertyValue"));
        dynamicPropertyValues.CreateChildPermission(AppPermissions.Pages_Administration_DynamicPropertyValue_Delete, L("DeletingDynamicPropertyValue"));

        Permission dynamicEntityProperties = dynamicProperties.CreateChildPermission(AppPermissions.Pages_Administration_DynamicEntityProperties, L("DynamicEntityProperties"));
        dynamicEntityProperties.CreateChildPermission(AppPermissions.Pages_Administration_DynamicEntityProperties_Create, L("CreatingDynamicEntityProperties"));
        dynamicEntityProperties.CreateChildPermission(AppPermissions.Pages_Administration_DynamicEntityProperties_Edit, L("EditingDynamicEntityProperties"));
        dynamicEntityProperties.CreateChildPermission(AppPermissions.Pages_Administration_DynamicEntityProperties_Delete, L("DeletingDynamicEntityProperties"));

        Permission dynamicEntityPropertyValues = dynamicProperties.CreateChildPermission(AppPermissions.Pages_Administration_DynamicEntityPropertyValue, L("EntityDynamicPropertyValue"));
        dynamicEntityPropertyValues.CreateChildPermission(AppPermissions.Pages_Administration_DynamicEntityPropertyValue_Create, L("CreatingDynamicEntityPropertyValue"));
        dynamicEntityPropertyValues.CreateChildPermission(AppPermissions.Pages_Administration_DynamicEntityPropertyValue_Edit, L("EditingDynamicEntityPropertyValue"));
        dynamicEntityPropertyValues.CreateChildPermission(AppPermissions.Pages_Administration_DynamicEntityPropertyValue_Delete, L("DeletingDynamicEntityPropertyValue"));

        Permission massNotification = administration.CreateChildPermission(AppPermissions.Pages_Administration_MassNotification, L("MassNotifications"));
        massNotification.CreateChildPermission(AppPermissions.Pages_Administration_MassNotification_Create, L("MassNotificationCreate"));

        //TENANT-SPECIFIC PERMISSIONS

        pages.CreateChildPermission(AppPermissions.Pages_Tenant_Dashboard, L("Dashboard"), multiTenancySides: MultiTenancySides.Tenant);

        administration.CreateChildPermission(AppPermissions.Pages_Administration_Tenant_Settings, L("Settings"), multiTenancySides: MultiTenancySides.Tenant);
        administration.CreateChildPermission(AppPermissions.Pages_Administration_Tenant_SubscriptionManagement, L("Subscription"), multiTenancySides: MultiTenancySides.Tenant);

        //HOST-SPECIFIC PERMISSIONS

        Permission editions = pages.CreateChildPermission(AppPermissions.Pages_Editions, L("Editions"), multiTenancySides: MultiTenancySides.Host);
        editions.CreateChildPermission(AppPermissions.Pages_Editions_Create, L("CreatingNewEdition"), multiTenancySides: MultiTenancySides.Host);
        editions.CreateChildPermission(AppPermissions.Pages_Editions_Edit, L("EditingEdition"), multiTenancySides: MultiTenancySides.Host);
        editions.CreateChildPermission(AppPermissions.Pages_Editions_Delete, L("DeletingEdition"), multiTenancySides: MultiTenancySides.Host);
        editions.CreateChildPermission(AppPermissions.Pages_Editions_MoveTenantsToAnotherEdition, L("MoveTenantsToAnotherEdition"), multiTenancySides: MultiTenancySides.Host);

        Permission tenants = pages.CreateChildPermission(AppPermissions.Pages_Tenants, L("Tenants"), multiTenancySides: MultiTenancySides.Host);
        tenants.CreateChildPermission(AppPermissions.Pages_Tenants_Create, L("CreatingNewTenant"), multiTenancySides: MultiTenancySides.Host);
        tenants.CreateChildPermission(AppPermissions.Pages_Tenants_Edit, L("EditingTenant"), multiTenancySides: MultiTenancySides.Host);
        tenants.CreateChildPermission(AppPermissions.Pages_Tenants_ChangeFeatures, L("ChangingFeatures"), multiTenancySides: MultiTenancySides.Host);
        tenants.CreateChildPermission(AppPermissions.Pages_Tenants_Delete, L("DeletingTenant"), multiTenancySides: MultiTenancySides.Host);
        tenants.CreateChildPermission(AppPermissions.Pages_Tenants_Impersonation, L("LoginForTenants"), multiTenancySides: MultiTenancySides.Host);

        administration.CreateChildPermission(AppPermissions.Pages_Administration_Host_Settings, L("Settings"), multiTenancySides: MultiTenancySides.Host);

        Permission maintenance = administration.CreateChildPermission(AppPermissions.Pages_Administration_Host_Maintenance, L("Maintenance"),
            multiTenancySides: _isMultiTenancyEnabled ? MultiTenancySides.Host : MultiTenancySides.Tenant);
        maintenance.CreateChildPermission(AppPermissions.Pages_Administration_NewVersion_Create, L("SendNewVersionNotification"));

        administration.CreateChildPermission(AppPermissions.Pages_Administration_HangfireDashboard, L("HangfireDashboard"),
            multiTenancySides: _isMultiTenancyEnabled ? MultiTenancySides.Host : MultiTenancySides.Tenant);
        administration.CreateChildPermission(AppPermissions.Pages_Administration_Host_Dashboard, L("Dashboard"), multiTenancySides: MultiTenancySides.Host);

        #endregion

        //HSU PERMISSIONS

        #region Hsu Permissions

        Permission hsu = context.GetPermissionOrNull(AppPermissions.Hsu) ?? context.CreatePermission(AppPermissions.Hsu, L("Hsu"));

        //Products
        Permission products = hsu.CreateChildPermission(AppPermissions.Hsu_Product, L("Products"));
        Permission overview = products.CreateChildPermission(AppPermissions.Hsu_Product_Overview);
        overview.CreateChildPermission(AppPermissions.Hsu_Product_Overview_Admin);
        overview.CreateChildPermission(AppPermissions.Hsu_Product_Overview_Developer);
        overview.CreateChildPermission(AppPermissions.Hsu_Product_Overview_Producer);

        Permission productsBase = products.CreateChildPermission(AppPermissions.Hsu_Product_Base, L("Base"));
        productsBase.CreateChildPermission(AppPermissions.Hsu_Product_Base_Get, L("Get"));
        productsBase.CreateChildPermission(AppPermissions.Hsu_Product_Base_CreateOrUpdate, L("CreateOrUpdate"));
        productsBase.CreateChildPermission(AppPermissions.Hsu_Product_Base_AssignProducer, L("AssignProducer"));
        productsBase.CreateChildPermission(AppPermissions.Hsu_Product_Base_UpdateProcessingDeadline, L("UpdateProcessingDeadline"));
        productsBase.CreateChildPermission(AppPermissions.Hsu_Product_Base_GetProductAssigmentStatus, L("GetProductAssigmentStatus"));
        productsBase.CreateChildPermission(AppPermissions.Hsu_Product_Base_AcceptOrRejectProductionRequest, L("AcceptOrRejectProductionRequest"));
        productsBase.CreateChildPermission(AppPermissions.Hsu_Product_Base_EditMode, L("EditMode"));
        productsBase.CreateChildPermission(AppPermissions.Hsu_Product_Base_Delete, L("Delete"));

        
        Permission productsDetails = products.CreateChildPermission(AppPermissions.Hsu_Product_Details, L("Details"));
        productsDetails.CreateChildPermission(AppPermissions.Hsu_Product_Details_Overview_Get_Admin, L("DetailsOverviewGetAdmin"));
        productsDetails.CreateChildPermission(AppPermissions.Hsu_Product_Details_Overview_Get_Developer, L("DetailsOverviewGetDeveloper"));
        productsDetails.CreateChildPermission(AppPermissions.Hsu_Product_Details_Overview_Get_Producer, L("DetailsOverviewGetProducer"));
        productsDetails.CreateChildPermission(AppPermissions.Hsu_Product_Details_FinalizeForValueChainPlanning, L("FinalizeForValueChainPlanning"));
        productsDetails.CreateChildPermission(AppPermissions.Hsu_Product_Details_GeneralInfo_Get, L("GeneralInfoGet"));
        productsDetails.CreateChildPermission(AppPermissions.Hsu_Product_Details_GeneralInfo_CreateOrUpdate, L("GeneralInfoCreateOrUpdate"));
        productsDetails.CreateChildPermission(AppPermissions.Hsu_Product_Details_MaterialGroups_Get, L("MaterialGroupsGet"));
        productsDetails.CreateChildPermission(AppPermissions.Hsu_Product_Details_MaterialGroups_CreateOrUpdate, L("MaterialGroupsCreateOrUpdate"));
        productsDetails.CreateChildPermission(AppPermissions.Hsu_Product_Details_ProductVariants_Get, L("ProductVariantsCreateOrUpdate"));
        productsDetails.CreateChildPermission(AppPermissions.Hsu_Product_Details_ProductVariants_CreateOrUpdate, L("ProductVariantsCreateOrUpdate"));
        productsDetails.CreateChildPermission(AppPermissions.Hsu_Product_Details_MeasurementsPosition_Get, L("MeasurementsPositionGet"));
        productsDetails.CreateChildPermission(AppPermissions.Hsu_Product_Details_MeasurementsPosition_CreateOrUpdate, L("MeasurementsPositionCreateOrUpdate"));
        productsDetails.CreateChildPermission(AppPermissions.Hsu_Product_Details_ProductFiles_Get, L("ProductFilesCreateOrUpdate"));
        productsDetails.CreateChildPermission(AppPermissions.Hsu_Product_Details_ProductFiles_CreateOrUpdate, L("ProductFilesCreateOrUpdate"));
        productsDetails.CreateChildPermission(AppPermissions.Hsu_Product_Details_Developer_ProductRevenueInfo, L("DeveloperProductRevenueInfo"));

        Permission productFiles = products.CreateChildPermission(AppPermissions.Hsu_Product_Files, L("ProductFiles"));
        productFiles.CreateChildPermission(AppPermissions.Hsu_Product_Files_Upload, L("ProductFiles.Upload"));
        productFiles.CreateChildPermission(AppPermissions.Hsu_Product_Files_Download, L("ProductFiles.Download"));
        productFiles.CreateChildPermission(AppPermissions.Hsu_Product_Files_Delete, L("ProductFiles.Delete"));

        //ValueChainPlanning
        Permission valueChainPlanning = hsu.CreateChildPermission(AppPermissions.Hsu_ValueChainPlanning, L("ValueChainPlanning"));
        valueChainPlanning.CreateChildPermission(AppPermissions.Hsu_ValueChainPlanning_GetProductGraphData, L("GetProductGraphData"));
        valueChainPlanning.CreateChildPermission(AppPermissions.Hsu_ValueChainPlanning_States_Create, L("CreateState"));
        valueChainPlanning.CreateChildPermission(AppPermissions.Hsu_ValueChainPlanning_States_Update, L("UpdateState"));
        valueChainPlanning.CreateChildPermission(AppPermissions.Hsu_ValueChainPlanning_States_Delete, L("DeleteState"));
        valueChainPlanning.CreateChildPermission(AppPermissions.Hsu_ValueChainPlanning_ProductionSteps_Overview_Get, L("ProductionStepsOverviewGet"));
        valueChainPlanning.CreateChildPermission(AppPermissions.Hsu_ValueChainPlanning_ProductionSteps_Get, L("ProductionStepsGet"));
        valueChainPlanning.CreateChildPermission(AppPermissions.Hsu_ValueChainPlanning_ProductionSteps_Set, L("ProductionStepsSet"));
        valueChainPlanning.CreateChildPermission(AppPermissions.Hsu_ValueChainPlanning_ProductionSteps_Delete, L("ProductionStepsDelete"));
        valueChainPlanning.CreateChildPermission(AppPermissions.Hsu_ValueChainPlanning_Send_Product_To_Planning, L("SendProductToPlanning"));
        valueChainPlanning.CreateChildPermission(AppPermissions.Hsu_ValueChainPlanning_ProductionPlans_Get, L("GetProductionPlans"));
        valueChainPlanning.CreateChildPermission(AppPermissions.Hsu_ValueChainPlanning_ProductionPlans_Active_Set, L("SetProductionPlanActive"));
        valueChainPlanning.CreateChildPermission(AppPermissions.Hsu_ValueChainPlanning_ExportProductToShop, L("ExportProductToShop"));

        //Import export
        Permission importExport = hsu.CreateChildPermission(AppPermissions.Hsu_ImportExport, L("ImportExport"));
        importExport.CreateChildPermission(AppPermissions.Hsu_ImportExport_ProductExport, L("ProductExport"));
        importExport.CreateChildPermission(AppPermissions.Hsu_ImportExport_StatisticsExport, L("ProductExport"));

        //Order nanagement
        Permission orderManagement = hsu.CreateChildPermission(AppPermissions.Hsu_OrderManagement, L("OrderManagement"));
        orderManagement.CreateChildPermission(AppPermissions.Hsu_OrderManagement_Overview_Get_Admin, L("OrderOverviewGetAdmin"));
        orderManagement.CreateChildPermission(AppPermissions.Hsu_OrderManagement_Overview_Get_Producer, L("OrderOverviewGetProducer"));
        orderManagement.CreateChildPermission(AppPermissions.Hsu_OrderManagement_OrderDetails_Admin, L("OrderDetailsAdmin"));
        orderManagement.CreateChildPermission(AppPermissions.Hsu_OrderManagement_OrderDetails_Producer, L("OrderDetailsProducer"));
        orderManagement.CreateChildPermission(AppPermissions.Hsu_OrderManagement_CancelOrder, L("CancelOrder"));

        Permission documents = orderManagement.CreateChildPermission(AppPermissions.Hsu_OrderManagement_Documents, L("Documents"));
        documents.CreateChildPermission(AppPermissions.Hsu_OrderManagement_Documents_Upload, L("Upload"));
        documents.CreateChildPermission(AppPermissions.Hsu_OrderManagement_Documents_Download, L("Download"));
        documents.CreateChildPermission(AppPermissions.Hsu_OrderManagement_Documents_Delete, L("Delete"));

        //Users
        Permission extendedUser = hsu.CreateChildPermission(AppPermissions.Hsu_ExtendedUser, L("ExtendedUser"));
        extendedUser.CreateChildPermission(AppPermissions.Hsu_ExtendedUser_GetDevelopers, L("GetDevelopers"));
        extendedUser.CreateChildPermission(AppPermissions.Hsu_ExtendedUser_GetProducers, L("GetProducers"));
        extendedUser.CreateChildPermission(AppPermissions.Hsu_ExtendedUser_GetProductProducers, L("GetProductProducers"));
        extendedUser.CreateChildPermission(AppPermissions.Hsu_ExtendedUser_SendUserInvite, L("SendUserInvite"));
        extendedUser.CreateChildPermission(AppPermissions.Hsu_ExtendedUser_DeleteInvitedUser, L("DeleteInvitedUser"));

        Permission profile = extendedUser.CreateChildPermission(AppPermissions.Hsu_ExtendedUser_Profiles, L("GetProfile"));
        profile.CreateChildPermission(AppPermissions.Hsu_ExtendedUser_Profiles_Admin_Get, L("GetAdminProfile"));
        profile.CreateChildPermission(AppPermissions.Hsu_ExtendedUser_Profiles_Developer_Get, L("GetDeveloperProfile"));
        profile.CreateChildPermission(AppPermissions.Hsu_ExtendedUser_Profiles_Producer_Get, L("GetProducerProfile"));
        profile.CreateChildPermission(AppPermissions.Hsu_ExtendedUser_Profiles_Admin_Update, L("UpdateAdminProfile"));
        profile.CreateChildPermission(AppPermissions.Hsu_ExtendedUser_Profiles_Developer_Update, L("UpdateDeveloperProfile"));
        profile.CreateChildPermission(AppPermissions.Hsu_ExtendedUser_Profiles_Producer_Update, L("UpdateProducerProfile"));
        profile.CreateChildPermission(AppPermissions.Hsu_ExtendedUser_Profiles_CurrentAdmin, L("GetCurrentAdminProfile"));
        profile.CreateChildPermission(AppPermissions.Hsu_ExtendedUser_Profiles_CurrentDeveloper, L("GetCurrentDeveloperProfile"));
        profile.CreateChildPermission(AppPermissions.Hsu_ExtendedUser_Profiles_CurrentProducer, L("GetCurrentProducerProfile"));

        //Materials
        Permission materials = hsu.CreateChildPermission(AppPermissions.Hsu_Materials, L("Materials"));
        materials.CreateChildPermission(AppPermissions.Hsu_Materials_Manage, L("ManageMaterials"));
        materials.CreateChildPermission(AppPermissions.Hsu_Materials_Get, L("GetMaterials"));
        materials.CreateChildPermission(AppPermissions.Hsu_Materials_Create, L("CreateMaterial"));
        materials.CreateChildPermission(AppPermissions.Hsu_Materials_Update, L("UpdateMaterial"));
        materials.CreateChildPermission(AppPermissions.Hsu_Materials_Delete, L("DeleteMaterial"));

        //Specifications
        Permission specifications = hsu.CreateChildPermission(AppPermissions.Hsu_Specifications, L("Specifications"));
        specifications.CreateChildPermission(AppPermissions.Hsu_Specifications_Get, L("GetSpecifications"));
        specifications.CreateChildPermission(AppPermissions.Hsu_Specifications_Create, L("CreateSpecification"));
        specifications.CreateChildPermission(AppPermissions.Hsu_Specifications_Update, L("UpdateSpecification"));
        specifications.CreateChildPermission(AppPermissions.Hsu_Specifications_Delete, L("DeleteSpecification"));

        //Utilities 
        Permission utilities = hsu.CreateChildPermission(AppPermissions.Hsu_Utilities, L("Utilities"));
        utilities.CreateChildPermission(AppPermissions.Hsu_Utilities_RemoveNonExistingFileEntries, L("RemoveNonExistingFileEntries"));
        utilities.CreateChildPermission(AppPermissions.Hsu_Utilities_RecalculateInBetweenStepMeasurement, L("RecalculateInBetweenStepMeasurement"));
        utilities.CreateChildPermission(AppPermissions.Hsu_Utilities_ImportNewOrdersFromShop, L("ImportNewOrdersFromShop"));
        utilities.CreateChildPermission(AppPermissions.Hsu_Utilities_CheckOrdersForExpierdValueChains, L("CheckOrdersForExpierdValueChains"));
        utilities.CreateChildPermission(AppPermissions.Hsu_Utilities_ReCalculateLiveProductPrices, L("ReCalculateLiveProductPrices"));
        utilities.CreateChildPermission(AppPermissions.Hsu_Utilities_RemoveProductsById, L("RemoveProductsById"));
        #endregion
    }

    private static ILocalizableString L(string name)
    {
        return new LocalizableString(name, PMHelmutSchmidtPortalConsts.LocalizationSourceName);
    }
}