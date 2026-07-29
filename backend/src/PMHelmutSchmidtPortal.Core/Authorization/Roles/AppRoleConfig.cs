using Abp.MultiTenancy;
using Abp.Zero.Configuration;

namespace PMHelmutSchmidtPortal.Authorization.Roles
{
    public static class AppRoleConfig
    {
        public static void Configure(IRoleManagementConfig roleManagementConfig)
        {
            #region base static roles
            //Static host roles

            roleManagementConfig.StaticRoles.Add(
                new StaticRoleDefinition(
                    StaticRoleNames.Host.Admin,
                    MultiTenancySides.Host,
                    grantAllPermissionsByDefault: true)
                );

            //Static tenant roles

            roleManagementConfig.StaticRoles.Add(
                new StaticRoleDefinition(
                    StaticRoleNames.Tenants.Admin,
                    MultiTenancySides.Tenant,
                    grantAllPermissionsByDefault: true)
                );

            roleManagementConfig.StaticRoles.Add(
                new StaticRoleDefinition(
                    StaticRoleNames.Tenants.User,
                    MultiTenancySides.Tenant)
                );
            #endregion

            #region Hsu static roles

            roleManagementConfig.StaticRoles.Add(
                new StaticRoleDefinition(
                    StaticRoleNames.Host.PlatformAdmin,
                    MultiTenancySides.Host)
                {
                    GrantedPermissions =
                    {
                        //ProductTable
                        AppPermissions.Hsu_Product_Overview_Admin,
                        AppPermissions.Hsu_Product_Details_Overview_Get_Admin,
                        AppPermissions.Hsu_Product_Base_GetProductAssigmentStatus,
                        AppPermissions.Hsu_Product_Base_UpdateProcessingDeadline,
                        AppPermissions.Hsu_Product_Base_AssignProducer,

                        //Base product Create
                        AppPermissions.Hsu_Product_Base_Get,
                        AppPermissions.Hsu_Product_Base_CreateOrUpdate,
                        AppPermissions.Hsu_Product_Base_EditMode,
                        AppPermissions.Hsu_Product_Base_Delete,

                        //Product wizard
                        AppPermissions.Hsu_Product_Details_GeneralInfo_Get,
                        AppPermissions.Hsu_Product_Details_GeneralInfo_CreateOrUpdate,
                        AppPermissions.Hsu_Product_Details_MaterialGroups_Get,
                        AppPermissions.Hsu_Product_Details_MaterialGroups_CreateOrUpdate,
                        AppPermissions.Hsu_Product_Details_ProductVariants_Get,
                        AppPermissions.Hsu_Product_Details_ProductVariants_CreateOrUpdate,
                        AppPermissions.Hsu_Product_Details_MeasurementsPosition_Get,
                        AppPermissions.Hsu_Product_Details_MeasurementsPosition_CreateOrUpdate,
                        AppPermissions.Hsu_Product_Details_ProductFiles_Get,
                        AppPermissions.Hsu_Product_Details_ProductFiles_CreateOrUpdate,
                        AppPermissions.Hsu_Product_Details_FinalizeForValueChainPlanning,
                        AppPermissions.Hsu_Product_Files_Upload,
                        AppPermissions.Hsu_Product_Files_Download,
                        AppPermissions.Hsu_Product_Files_Delete,
                        
                        //Product Details
                        AppPermissions.Hsu_Product_Details_Developer_ProductRevenueInfo,

                        //ValueChainPlanning
                        AppPermissions.Hsu_ValueChainPlanning_GetProductGraphData,
                        AppPermissions.Hsu_ValueChainPlanning_ProductionSteps_Overview_Get,
                        AppPermissions.Hsu_ValueChainPlanning_States_Create,
                        AppPermissions.Hsu_ValueChainPlanning_States_Update,
                        AppPermissions.Hsu_ValueChainPlanning_States_Delete,
                        AppPermissions.Hsu_ValueChainPlanning_Send_Product_To_Planning,
                        AppPermissions.Hsu_ValueChainPlanning_ProductionPlans_Get,
                        AppPermissions.Hsu_ValueChainPlanning_ProductionPlans_Active_Set,
                        AppPermissions.Hsu_ValueChainPlanning_ExportProductToShop,

                        //ImportExport
                        AppPermissions.Hsu_ImportExport_ProductExport,
                        AppPermissions.Hsu_ImportExport_StatisticsExport,
                        
                        //Order management
                        AppPermissions.Hsu_OrderManagement_Overview_Get_Admin,
                        AppPermissions.Hsu_OrderManagement_OrderDetails_Admin,
                        AppPermissions.Hsu_OrderManagement_Documents_Download,
                        AppPermissions.Hsu_OrderManagement_CancelOrder,
                        
                        //Profiles
                        AppPermissions.Hsu_ExtendedUser,
                        AppPermissions.Hsu_ExtendedUser_GetDevelopers,
                        AppPermissions.Hsu_ExtendedUser_GetProductProducers,
                        AppPermissions.Hsu_ExtendedUser_GetProducers,
                        AppPermissions.Hsu_ExtendedUser_SendUserInvite,
                        AppPermissions.Hsu_ExtendedUser_DeleteInvitedUser,
                        AppPermissions.Hsu_ExtendedUser_Profiles_CurrentAdmin,
                        AppPermissions.Hsu_ExtendedUser_Profiles_Producer_Get,
                        AppPermissions.Hsu_ExtendedUser_Profiles_Developer_Get,
                        AppPermissions.Hsu_ExtendedUser_Profiles_Admin_Get,
                        AppPermissions.Hsu_ExtendedUser_Profiles_Producer_Update,
                        AppPermissions.Hsu_ExtendedUser_Profiles_Developer_Update,
                        AppPermissions.Hsu_ExtendedUser_Profiles_Admin_Update,

                        // Impersonation
                        AppPermissions.Pages_Administration_Users_Impersonation,

                        //Materials
                        AppPermissions.Hsu_Materials_Manage,
                        AppPermissions.Hsu_Materials_Get,
                        AppPermissions.Hsu_Materials_Create,
                        AppPermissions.Hsu_Materials_Update,
                        AppPermissions.Hsu_Materials_Delete,

                        //Specifications
                        AppPermissions.Hsu_Specifications_Get,
                        AppPermissions.Hsu_Specifications_Create,
                        AppPermissions.Hsu_Specifications_Update,
                        AppPermissions.Hsu_Specifications_Delete,
                    }
                }
            );

            roleManagementConfig.StaticRoles.Add(
                new StaticRoleDefinition(
                    StaticRoleNames.Host.Developer,
                    MultiTenancySides.Host)
                {
                    GrantedPermissions =
                    {
                        //ProductTable
                        AppPermissions.Hsu_Product_Overview_Developer,

                        //Product wizard
                        AppPermissions.Hsu_Product_Details_Overview_Get_Developer,
                        AppPermissions.Hsu_Product_Details_GeneralInfo_Get,
                        AppPermissions.Hsu_Product_Details_GeneralInfo_CreateOrUpdate,
                        AppPermissions.Hsu_Product_Details_MaterialGroups_Get,
                        AppPermissions.Hsu_Product_Details_MaterialGroups_CreateOrUpdate,
                        AppPermissions.Hsu_Product_Details_ProductVariants_Get,
                        AppPermissions.Hsu_Product_Details_ProductVariants_CreateOrUpdate,
                        AppPermissions.Hsu_Product_Details_MeasurementsPosition_Get,
                        AppPermissions.Hsu_Product_Details_MeasurementsPosition_CreateOrUpdate,
                        AppPermissions.Hsu_Product_Details_ProductFiles_Get,
                        AppPermissions.Hsu_Product_Details_ProductFiles_CreateOrUpdate,
                        AppPermissions.Hsu_Product_Details_FinalizeForValueChainPlanning,
                        AppPermissions.Hsu_Product_Files_Upload,
                        AppPermissions.Hsu_Product_Files_Download,
                        AppPermissions.Hsu_Product_Files_Delete,
                        
                        //Product Details
                        AppPermissions.Hsu_Product_Details_Developer_ProductRevenueInfo,

                        //Profile
                        AppPermissions.Hsu_ExtendedUser_Profiles_CurrentDeveloper,

                        //Materials (read-only)
                        AppPermissions.Hsu_Materials_Get,

                        //Specifications (read-only)
                        AppPermissions.Hsu_Specifications_Get,
                    }
                }
            );

            roleManagementConfig.StaticRoles.Add(
                new StaticRoleDefinition(
                    StaticRoleNames.Host.Producer,
                    MultiTenancySides.Host)
                {
                    GrantedPermissions =
                    {
                        //ProductTable
                        AppPermissions.Hsu_Product_Overview_Producer,
                        AppPermissions.Hsu_Product_Details_Overview_Get_Producer,
                        AppPermissions.Hsu_Product_Files_Download,
                        AppPermissions.Hsu_Product_Base_GetProductAssigmentStatus,
                        AppPermissions.Hsu_Product_Base_AcceptOrRejectProductionRequest,

                        //ValueChainPlanning
                        AppPermissions.Hsu_ValueChainPlanning_GetProductGraphData,
                        AppPermissions.Hsu_ValueChainPlanning_States_Create,
                        AppPermissions.Hsu_ValueChainPlanning_ProductionSteps_Get,
                        AppPermissions.Hsu_ValueChainPlanning_ProductionSteps_Set,
                        AppPermissions.Hsu_ValueChainPlanning_ProductionSteps_Delete,
                        
                        //Order management
                        AppPermissions.Hsu_OrderManagement_Overview_Get_Producer,
                        AppPermissions.Hsu_OrderManagement_OrderDetails_Producer,
                        AppPermissions.Hsu_OrderManagement_Documents_Upload,
                        AppPermissions.Hsu_OrderManagement_Documents_Download,
                        AppPermissions.Hsu_OrderManagement_Documents_Delete,

                        //Profile
                        AppPermissions.Hsu_ExtendedUser_Profiles_CurrentProducer,
                        AppPermissions.Hsu_ExtendedUser_GetProducers,
                    }
                }
            );

            #endregion
        }
    }
}
