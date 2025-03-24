using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMHelmutSchmidtPortal.Migrations
{
    /// <inheritdoc />
    public partial class TruncateDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //pm tables
            migrationBuilder.Sql("DELETE FROM dbo.PmProductProducer; DBCC CHECKIDENT('dbo.PmProductProducer', RESEED, 0);" );  
            migrationBuilder.Sql("DELETE FROM dbo.PmProductFile; DBCC CHECKIDENT('dbo.PmProductFile', RESEED, 0);" );      
            migrationBuilder.Sql("DELETE FROM dbo.PmProductMeasurements; DBCC CHECKIDENT('dbo.PmProductMeasurements', RESEED, 0);" );      
            migrationBuilder.Sql("DELETE FROM dbo.PmProductionState; DBCC CHECKIDENT('dbo.PmProductionState', RESEED, 0);" );      
            migrationBuilder.Sql("DELETE FROM dbo.PmWorkPieceVariant; DBCC CHECKIDENT('dbo.PmWorkPieceVariant', RESEED, 0);" );      
            migrationBuilder.Sql("DELETE FROM dbo.PmWorkPiece; DBCC CHECKIDENT('dbo.PmWorkPiece', RESEED, 0);" );      
            migrationBuilder.Sql("DELETE FROM dbo.PmSurfaceFinish; DBCC CHECKIDENT('dbo.PmSurfaceFinish', RESEED, 0);" );      
            migrationBuilder.Sql("DELETE FROM dbo.PmMaterialGroup; DBCC CHECKIDENT('dbo.PmMaterialGroup', RESEED, 0);" );      
            migrationBuilder.Sql("DELETE FROM dbo.PmProducts; DBCC CHECKIDENT('dbo.PmProducts', RESEED, 0);" );      
            migrationBuilder.Sql("DELETE FROM dbo.PmUserAddress; DBCC CHECKIDENT('dbo.PmUserAddress', RESEED, 0);" );      
            migrationBuilder.Sql("DELETE FROM dbo.PmProducerRating; DBCC CHECKIDENT('dbo.PmProducerRating', RESEED, 0);" );      
            migrationBuilder.Sql("DELETE FROM dbo.PmProducerInfo; DBCC CHECKIDENT('dbo.PmProducerInfo', RESEED, 0);" );      
            migrationBuilder.Sql("DELETE FROM dbo.PmRatingType; DBCC CHECKIDENT('dbo.PmRatingType', RESEED, 0);" );      
            migrationBuilder.Sql("DELETE FROM dbo.PmTradeType; DBCC CHECKIDENT('dbo.PmTradeType', RESEED, 0);" );   
            
            migrationBuilder.Sql("DELETE FROM dbo.AbpAuditLogs; DBCC CHECKIDENT('dbo.AbpAuditLogs', RESEED, 0);" );      
            migrationBuilder.Sql("DELETE FROM dbo.AbpEntityChangeSets; DBCC CHECKIDENT('dbo.AbpEntityChangeSets', RESEED, 0);" );      
            migrationBuilder.Sql("DELETE FROM dbo.AbpNotificationSubscriptions;" );      
            migrationBuilder.Sql("DELETE FROM dbo.AbpNotifications; " );      
            migrationBuilder.Sql("DELETE FROM dbo.AbpPermissions; DBCC CHECKIDENT('dbo.AbpPermissions', RESEED, 0);" );      
            migrationBuilder.Sql("DELETE FROM dbo.AbpSettings; DBCC CHECKIDENT('dbo.AbpSettings', RESEED, 0);" );      
            migrationBuilder.Sql("DELETE FROM dbo.AbpUserAccounts; DBCC CHECKIDENT('dbo.AbpUserAccounts', RESEED, 0);" );    
            migrationBuilder.Sql("DELETE FROM dbo.AbpUserClaims; DBCC CHECKIDENT('dbo.AbpUserClaims', RESEED, 0);" );      
            migrationBuilder.Sql("DELETE FROM dbo.AbpUserLoginAttempts; DBCC CHECKIDENT('dbo.AbpUserLoginAttempts', RESEED, 0);" );      
            migrationBuilder.Sql("DELETE FROM dbo.AbpUserLogins; DBCC CHECKIDENT('dbo.AbpUserLogins', RESEED, 0);" );      
            migrationBuilder.Sql("DELETE FROM dbo.AbpUserNotifications; " );      
            migrationBuilder.Sql("DELETE FROM dbo.AbpUserOrganizationUnits; DBCC CHECKIDENT('dbo.AbpUserOrganizationUnits', RESEED, 0);" );
            migrationBuilder.Sql("DELETE FROM dbo.AbpUserRoles; DBCC CHECKIDENT('dbo.AbpUserRoles', RESEED, 0);" );      
            migrationBuilder.Sql("DELETE FROM dbo.AbpUserTokens; DBCC CHECKIDENT('dbo.AbpUserTokens', RESEED, 0);" ); 
            migrationBuilder.Sql("DELETE FROM dbo.AbpUsers; DBCC CHECKIDENT('dbo.AbpUsers', RESEED, 0);" );      
            migrationBuilder.Sql("DELETE FROM dbo.AppChatMessages; DBCC CHECKIDENT('dbo.AppChatMessages', RESEED, 0);" ); 
            migrationBuilder.Sql("DELETE FROM dbo.AppFriendships; DBCC CHECKIDENT('dbo.AppFriendships', RESEED, 0);" );      
            migrationBuilder.Sql("DELETE FROM dbo.AppRecentPasswords; " ); 
   
            
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //This is ireversable migration
        }
    }
}
