using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMHelmutSchmidtPortal.Migrations
{
    /// <inheritdoc />
    public partial class RemoveUnnecessaryLanguages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                "DELETE FROM AbpLanguages \nWHERE Name NOT IN ('en', 'de');"
                );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                "INSERT INTO AbpLanguages\n(CreationTime, CreatorUserId, DeleterUserId, DeletionTime," +
                " DisplayName, Icon, IsDeleted, LastModificationTime, LastModifierUserId, Name, TenantId, IsDisabled) VALUES" +
                "( GETDATE(), NULL, NULL, NULL, N'English', N'famfamfam-flags gb', 0, NULL, NULL, N'en-GB', NULL, 0),"+
                "( GETDATE(), NULL, NULL, NULL, N'العربية', N'famfamfam-flags sa', 0, NULL, NULL, N'ar', NULL, 0),"+
                "( GETDATE(), NULL, NULL, NULL, N'Italiano', N'famfamfam-flags it', 0, NULL, NULL, N'it', NULL, 0),"+
                "( GETDATE(), NULL, NULL, NULL, N'Français', N'famfamfam-flags fr', 0, NULL, NULL, N'fr', NULL, 0),"+
                "( GETDATE(), NULL, NULL, NULL, N'Português', N'famfamfam-flags br', 0, NULL, NULL, N'pt-BR', NULL, 0),"+
                "( GETDATE(), NULL, NULL, NULL, N'Türkçe', N'famfamfam-flags tr', 0, NULL, NULL, N'tr', NULL, 0),"+
                "( GETDATE(), NULL, NULL, NULL, N'Pусский', N'famfamfam-flags ru', 0, NULL, NULL, N'ru', NULL, 0),"+
                "( GETDATE(), NULL, NULL, NULL, N'简体中文', N'famfamfam-flags cn', 0, NULL, NULL, N'zh-Hans', NULL, 0),"+
                "( GETDATE(), NULL, NULL, NULL, N'Español (México)', N'famfamfam-flags mx', 0, NULL, NULL, N'es-MX', NULL, 0),"+
                "( GETDATE(), NULL, NULL, NULL, N'Español (Spanish)', N'famfamfam-flags es', 0, NULL, NULL, N'es', NULL, 0),"+
                "( GETDATE(), NULL, NULL, NULL, N'Tiếng Việt', N'famfamfam-flags vn', 0, NULL, NULL, N'vi', NULL, 0),"+
                "( GETDATE(), NULL, NULL, NULL, N'Dutch (Nederlands)', N'famfamfam-flags nl', 0, NULL, NULL, N'nl', NULL, 0),"+
                "( GETDATE(), NULL, NULL, NULL, N'ภาษาไทย', N'famfamfam-flags th', 0, NULL, NULL, N'th', NULL, 0);"
            );

        }
    }
}
