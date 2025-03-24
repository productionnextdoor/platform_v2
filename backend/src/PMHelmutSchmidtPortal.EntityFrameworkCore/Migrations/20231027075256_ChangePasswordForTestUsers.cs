using Microsoft.EntityFrameworkCore.Migrations;
using PMHelmutSchmidtPortal.Authorization.Users;

#nullable disable

namespace PMHelmutSchmidtPortal.Migrations
{
    /// <inheritdoc />
    public partial class ChangePasswordForTestUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("UPDATE AbpUsers SET " +
                                 $"Password=N'{UserConsts.DefaultPlatformPassword}'" +
                                 " WHERE NormalizedUserName IN ('ADMIN', 'PM_PORTALADMIN', 'PM_DEVELOPER', 'PM_PRODUCER')");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //This is ireversable change
        }
    }
}
