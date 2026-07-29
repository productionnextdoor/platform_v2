namespace PMHelmutSchmidtPortal.Authorization;

/// <summary>
/// Defines string constants for application's permission names.
/// <see cref="AppAuthorizationProvider"/> for permission definitions.
/// </summary>
public static class AppPermissions
{
    //COMMON PERMISSIONS (FOR BOTH OF TENANTS AND HOST)

    #region Asp zero perrmissions

    public const string Pages = "Pages";

    public const string Pages_DemoUiComponents = "Pages.DemoUiComponents";
    public const string Pages_Administration = "Pages.Administration";

    public const string Pages_Administration_Roles = "Pages.Administration.Roles";
    public const string Pages_Administration_Roles_Create = "Pages.Administration.Roles.Create";
    public const string Pages_Administration_Roles_Edit = "Pages.Administration.Roles.Edit";
    public const string Pages_Administration_Roles_Delete = "Pages.Administration.Roles.Delete";

    public const string Pages_Administration_Users = "Pages.Administration.Users";
    public const string Pages_Administration_Users_Create = "Pages.Administration.Users.Create";
    public const string Pages_Administration_Users_Edit = "Pages.Administration.Users.Edit";
    public const string Pages_Administration_Users_Delete = "Pages.Administration.Users.Delete";
    public const string Pages_Administration_Users_ChangePermissions = "Pages.Administration.Users.ChangePermissions";
    public const string Pages_Administration_Users_Impersonation = "Pages.Administration.Users.Impersonation";
    public const string Pages_Administration_Users_Unlock = "Pages.Administration.Users.Unlock";
    public const string Pages_Administration_Users_ChangeProfilePicture = "Pages.Administration.Users.ChangeProfilePicture";

    public const string Pages_Administration_Languages = "Pages.Administration.Languages";
    public const string Pages_Administration_Languages_Create = "Pages.Administration.Languages.Create";
    public const string Pages_Administration_Languages_Edit = "Pages.Administration.Languages.Edit";
    public const string Pages_Administration_Languages_Delete = "Pages.Administration.Languages.Delete";
    public const string Pages_Administration_Languages_ChangeTexts = "Pages.Administration.Languages.ChangeTexts";
    public const string Pages_Administration_Languages_ChangeDefaultLanguage = "Pages.Administration.Languages.ChangeDefaultLanguage";

    public const string Pages_Administration_AuditLogs = "Pages.Administration.AuditLogs";

    public const string Pages_Administration_OrganizationUnits = "Pages.Administration.OrganizationUnits";
    public const string Pages_Administration_OrganizationUnits_ManageOrganizationTree = "Pages.Administration.OrganizationUnits.ManageOrganizationTree";
    public const string Pages_Administration_OrganizationUnits_ManageMembers = "Pages.Administration.OrganizationUnits.ManageMembers";
    public const string Pages_Administration_OrganizationUnits_ManageRoles = "Pages.Administration.OrganizationUnits.ManageRoles";

    public const string Pages_Administration_HangfireDashboard = "Pages.Administration.HangfireDashboard";

    public const string Pages_Administration_UiCustomization = "Pages.Administration.UiCustomization";

    public const string Pages_Administration_WebhookSubscription = "Pages.Administration.WebhookSubscription";
    public const string Pages_Administration_WebhookSubscription_Create = "Pages.Administration.WebhookSubscription.Create";
    public const string Pages_Administration_WebhookSubscription_Edit = "Pages.Administration.WebhookSubscription.Edit";
    public const string Pages_Administration_WebhookSubscription_ChangeActivity = "Pages.Administration.WebhookSubscription.ChangeActivity";
    public const string Pages_Administration_WebhookSubscription_Detail = "Pages.Administration.WebhookSubscription.Detail";
    public const string Pages_Administration_Webhook_ListSendAttempts = "Pages.Administration.Webhook.ListSendAttempts";
    public const string Pages_Administration_Webhook_ResendWebhook = "Pages.Administration.Webhook.ResendWebhook";

    public const string Pages_Administration_DynamicProperties = "Pages.Administration.DynamicProperties";
    public const string Pages_Administration_DynamicProperties_Create = "Pages.Administration.DynamicProperties.Create";
    public const string Pages_Administration_DynamicProperties_Edit = "Pages.Administration.DynamicProperties.Edit";
    public const string Pages_Administration_DynamicProperties_Delete = "Pages.Administration.DynamicProperties.Delete";

    public const string Pages_Administration_DynamicPropertyValue = "Pages.Administration.DynamicPropertyValue";
    public const string Pages_Administration_DynamicPropertyValue_Create = "Pages.Administration.DynamicPropertyValue.Create";
    public const string Pages_Administration_DynamicPropertyValue_Edit = "Pages.Administration.DynamicPropertyValue.Edit";
    public const string Pages_Administration_DynamicPropertyValue_Delete = "Pages.Administration.DynamicPropertyValue.Delete";

    public const string Pages_Administration_DynamicEntityProperties = "Pages.Administration.DynamicEntityProperties";
    public const string Pages_Administration_DynamicEntityProperties_Create = "Pages.Administration.DynamicEntityProperties.Create";
    public const string Pages_Administration_DynamicEntityProperties_Edit = "Pages.Administration.DynamicEntityProperties.Edit";
    public const string Pages_Administration_DynamicEntityProperties_Delete = "Pages.Administration.DynamicEntityProperties.Delete";

    public const string Pages_Administration_DynamicEntityPropertyValue = "Pages.Administration.DynamicEntityPropertyValue";
    public const string Pages_Administration_DynamicEntityPropertyValue_Create = "Pages.Administration.DynamicEntityPropertyValue.Create";
    public const string Pages_Administration_DynamicEntityPropertyValue_Edit = "Pages.Administration.DynamicEntityPropertyValue.Edit";
    public const string Pages_Administration_DynamicEntityPropertyValue_Delete = "Pages.Administration.DynamicEntityPropertyValue.Delete";

    public const string Pages_Administration_MassNotification = "Pages.Administration.MassNotification";
    public const string Pages_Administration_MassNotification_Create = "Pages.Administration.MassNotification.Create";

    public const string Pages_Administration_NewVersion_Create = "Pages_Administration_NewVersion_Create";

    //TENANT-SPECIFIC PERMISSIONS

    public const string Pages_Tenant_Dashboard = "Pages.Tenant.Dashboard";

    public const string Pages_Administration_Tenant_Settings = "Pages.Administration.Tenant.Settings";

    public const string Pages_Administration_Tenant_SubscriptionManagement = "Pages.Administration.Tenant.SubscriptionManagement";

    //HOST-SPECIFIC PERMISSIONS

    public const string Pages_Editions = "Pages.Editions";
    public const string Pages_Editions_Create = "Pages.Editions.Create";
    public const string Pages_Editions_Edit = "Pages.Editions.Edit";
    public const string Pages_Editions_Delete = "Pages.Editions.Delete";
    public const string Pages_Editions_MoveTenantsToAnotherEdition = "Pages.Editions.MoveTenantsToAnotherEdition";

    public const string Pages_Tenants = "Pages.Tenants";
    public const string Pages_Tenants_Create = "Pages.Tenants.Create";
    public const string Pages_Tenants_Edit = "Pages.Tenants.Edit";
    public const string Pages_Tenants_ChangeFeatures = "Pages.Tenants.ChangeFeatures";
    public const string Pages_Tenants_Delete = "Pages.Tenants.Delete";
    public const string Pages_Tenants_Impersonation = "Pages.Tenants.Impersonation";

    public const string Pages_Administration_Host_Maintenance = "Pages.Administration.Host.Maintenance";
    public const string Pages_Administration_Host_Settings = "Pages.Administration.Host.Settings";
    public const string Pages_Administration_Host_Dashboard = "Pages.Administration.Host.Dashboard";

    #endregion

    //HSUPortal-SPECIFIC PERMISSIONS

    #region Hsu portal perrmissions

    public const string Hsu = "Hsu";

    public const string Hsu_Product = "Hsu.Product";

    public const string Hsu_Product_Overview = "Hsu.Product.Overview";
    public const string Hsu_Product_Overview_Admin = "Hsu.Product.Overview.Admin";
    public const string Hsu_Product_Overview_Developer = "Hsu.Product.Overview.Developer";
    public const string Hsu_Product_Overview_Producer = "Hsu.Product.Overview.Producer";

    public const string Hsu_Product_Base = "Hsu.Product.Base";
    public const string Hsu_Product_Base_Get = "Hsu.Product.Base.Get";
    public const string Hsu_Product_Base_CreateOrUpdate = "Hsu.Product.Base.CreateOrUpdate";
    public const string Hsu_Product_Base_AssignProducer = "Hsu.Products.Base.AssignProducer";
    public const string Hsu_Product_Base_UpdateProcessingDeadline = "Hsu.Product.Base.UpdateProcessingDeadline";
    public const string Hsu_Product_Base_GetProductAssigmentStatus = "Hsu.Product.Base.GetProductAssigmentStatus ";
    public const string Hsu_Product_Base_AcceptOrRejectProductionRequest = "Hsu.Product.Base.AcceptOrRejectProductionRequest";
    public const string Hsu_Product_Base_EditMode = "Hsu.Product.Base.EditMode";
    public const string Hsu_Product_Base_Delete = "Hsu.Product.Base.Delete";

    public const string Hsu_Product_Details = "Hsu.Product.Details";
    public const string Hsu_Product_Details_Overview_Get_Admin = "Hsu.Product.Details.Overview.Get.Admin";
    public const string Hsu_Product_Details_Overview_Get_Developer = "Hsu.Product.Details.Overview.Get.Developer";
    public const string Hsu_Product_Details_Overview_Get_Producer = "Hsu.Product.Details.Overview.Get.Producer";
    public const string Hsu_Product_Details_FinalizeForValueChainPlanning = "Hsu.Product.Details.FinalizeForValueChainPlanning";
    public const string Hsu_Product_Details_GeneralInfo_Get = "Hsu.Product.Details.GeneralInfo.Get";
    public const string Hsu_Product_Details_GeneralInfo_CreateOrUpdate = "Hsu.Product.Details.GeneralInfo.CreateOrUpdate";
    public const string Hsu_Product_Details_MaterialGroups_Get = "Hsu.Product.Details._MaterialGroups.Get";
    public const string Hsu_Product_Details_MaterialGroups_CreateOrUpdate = "Hsu.Product.Details._MaterialGroups.CreateOrUpdate";
    public const string Hsu_Product_Details_ProductVariants_Get = "Hsu.Product.Details.ProductVariants.Get";
    public const string Hsu_Product_Details_ProductVariants_CreateOrUpdate = "Hsu.Product.Details.ProductVariants.CreateOrUpdate";
    public const string Hsu_Product_Details_MeasurementsPosition_Get = "Hsu.Product.Details.MeasurementsPosition.Get";
    public const string Hsu_Product_Details_MeasurementsPosition_CreateOrUpdate = "Hsu.Product.Details.MeasurementsPosition.CreateOrUpdate";
    public const string Hsu_Product_Details_ProductFiles_Get = "Hsu.Product.Details.ProductFiles.Get";
    public const string Hsu_Product_Details_ProductFiles_CreateOrUpdate = "Hsu.Product.Details.ProductFiles.CreateOrUpdate";
    public const string Hsu_Product_Details_Developer_ProductRevenueInfo = "Hsu.Product.Details.Developer.ProductRevenueInfo";

    public const string Hsu_Product_Files = "Hsu.Product.Files";
    public const string Hsu_Product_Files_Upload = "Hsu.Product.Files.Upload";
    public const string Hsu_Product_Files_Download = "Hsu.Product.Files.Download";
    public const string Hsu_Product_Files_Delete = "Hsu.Product.Files.Delete";

    public const string Hsu_ValueChainPlanning = "Hsu.ValueChainPlanning";
    public const string Hsu_ValueChainPlanning_GetProductGraphData = "Hsu.ValueChainPlanning.GetProductGraphData";
    public const string Hsu_ValueChainPlanning_States_Create = "Hsu.ValueChainPlanning.States.Create";
    public const string Hsu_ValueChainPlanning_States_Update = "Hsu.ValueChainPlanning.States.Update";
    public const string Hsu_ValueChainPlanning_States_Delete = "Hsu.ValueChainPlanning.States.Delete";
    public const string Hsu_ValueChainPlanning_ProductionSteps_Overview_Get = "Hsu.ValueChainPlanning.ProductionSteps.Overview.Get";
    public const string Hsu_ValueChainPlanning_ProductionSteps_Get = "Hsu.ValueChainPlanning.ProductionSteps.Get";
    public const string Hsu_ValueChainPlanning_ProductionSteps_Set = "Hsu.ValueChainPlanning.ProductionSteps.Set";
    public const string Hsu_ValueChainPlanning_ProductionSteps_Delete = "Hsu.ValueChainPlanning.ProductionSteps.Delete";
    public const string Hsu_ValueChainPlanning_Send_Product_To_Planning = "Hsu.ValueChainPlanning.SendProductToPlanning.";
    public const string Hsu_ValueChainPlanning_ProductionPlans_Get = "Hsu.ValueChainPlanning.ProductionPlans.Get.";
    public const string Hsu_ValueChainPlanning_ProductionPlans_Active_Set = "Hsu.ValueChainPlanning.ProductionPlans.Active.Set";
    public const string Hsu_ValueChainPlanning_ExportProductToShop = "Hsu.ValueChainPlanning.ExportProductToShop";

    public const string Hsu_ImportExport = "Hsu.ImportExport";
    public const string Hsu_ImportExport_ProductExport = "Hsu.ImportExport.ProductExport";
    public const string Hsu_ImportExport_StatisticsExport = "Hsu.ImportExport.StatisticsExport";

    public const string Hsu_OrderManagement = "Hsu.OrderManagement";
    public const string Hsu_OrderManagement_Overview_Get_Admin = "Hsu.OrderManagement.Overview.Get.Admin";
    public const string Hsu_OrderManagement_Overview_Get_Producer = "Hsu.OrderManagement.Overview.Get.Producer";
    public const string Hsu_OrderManagement_OrderDetails_Admin = "Hsu.OrderManagement.OrderDetails.Admin";
    public const string Hsu_OrderManagement_OrderDetails_Producer = "Hsu.OrderManagement.OrderDetails.Producer";
    public const string Hsu_OrderManagement_CancelOrder = "Hsu.OrderManagement.CancelOrder";

    public const string Hsu_OrderManagement_Documents = "Hsu.OrderManagement.Documents";
    public const string Hsu_OrderManagement_Documents_Upload = "Hsu.OrderManagement.Documents.Upload";
    public const string Hsu_OrderManagement_Documents_Download = "Hsu.OrderManagement.Documents.Download";
    public const string Hsu_OrderManagement_Documents_Delete = "Hsu.OrderManagement.Documents.Delete";

    public const string Hsu_ExtendedUser = "Hsu.ExtendedUser";
    public const string Hsu_ExtendedUser_GetDevelopers = "Hsu.ExtendedUser.GetDevelopers";
    public const string Hsu_ExtendedUser_GetProducers = "Hsu.ExtendedUser.GetProducer";
    public const string Hsu_ExtendedUser_GetProductProducers = "Hsu.ExtendedUser.GetProductProducers";
    public const string Hsu_ExtendedUser_SendUserInvite = "Hsu.ExtendedUser.SendUserInvite";
    public const string Hsu_ExtendedUser_DeleteInvitedUser = "Hsu.ExtendedUser.DeleteInvitedUser";
    public const string Hsu_ExtendedUser_Profiles = "Hsu.ExtendedUser.Profiles";
    public const string Hsu_ExtendedUser_Profiles_Admin_Get = "Hsu.ExtendedUser.Profiles.Admin.Get";
    public const string Hsu_ExtendedUser_Profiles_Developer_Get = "Hsu.ExtendedUser.Profiles.Developer.Get";
    public const string Hsu_ExtendedUser_Profiles_Producer_Get = "Hsu.ExtendedUser.Profiles.Producer.Get";
    public const string Hsu_ExtendedUser_Profiles_Admin_Update = "Hsu.ExtendedUser.Profiles.Admin.Update";
    public const string Hsu_ExtendedUser_Profiles_Developer_Update = "Hsu.ExtendedUser.Profiles.Developer.Update";
    public const string Hsu_ExtendedUser_Profiles_Producer_Update = "Hsu.ExtendedUser.Profiles.Producer.Update";
    public const string Hsu_ExtendedUser_Profiles_CurrentAdmin = "Hsu.ExtendedUser.Profiles.CurrentAdmin";
    public const string Hsu_ExtendedUser_Profiles_CurrentDeveloper = "Hsu.ExtendedUser.Profiles.CurrentDeveloper";
    public const string Hsu_ExtendedUser_Profiles_CurrentProducer = "Hsu.ExtendedUser.Profiles.CurrentProducer";

    public const string Hsu_Materials = "Hsu.Materials";
    public const string Hsu_Materials_Manage = "Hsu.Materials.Manage";
    public const string Hsu_Materials_Get = "Hsu.Materials.Get";
    public const string Hsu_Materials_Create = "Hsu.Materials.Create";
    public const string Hsu_Materials_Update = "Hsu.Materials.Update";
    public const string Hsu_Materials_Delete = "Hsu.Materials.Delete";

    public const string Hsu_Specifications = "Hsu.Specifications";
    public const string Hsu_Specifications_Get = "Hsu.Specifications.Get";
    public const string Hsu_Specifications_Create = "Hsu.Specifications.Create";
    public const string Hsu_Specifications_Update = "Hsu.Specifications.Update";
    public const string Hsu_Specifications_Delete = "Hsu.Specifications.Delete";

    public const string Hsu_Utilities = "Hsu.Utilities";
    public const string Hsu_Utilities_RemoveNonExistingFileEntries = "Hsu.Utilities.RemoveNonExistingFileEntries";
    public const string Hsu_Utilities_RecalculateInBetweenStepMeasurement = "Hsu.Utilities.RecalculateInBetweenStepMeasurement";
    public const string Hsu_Utilities_ImportNewOrdersFromShop = "Hsu.Utilities.ImportNewOrdersFromShop";
    public const string Hsu_Utilities_CheckOrdersForExpierdValueChains = "Hsu.Utilities.CheckOrdersForExpierdValueChains";
    public const string Hsu_Utilities_ReCalculateLiveProductPrices = "Hsu.Utilities.ReCalculateLiveProductPrices";
    public const string Hsu_Utilities_RemoveProductsById = "Hsu.Utilities.RemoveProductsById";

    #endregion
}