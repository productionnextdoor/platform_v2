using Microsoft.EntityFrameworkCore.Migrations;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUsers;

#nullable disable

namespace PMHelmutSchmidtPortal.Migrations
{
    /// <inheritdoc />
    public partial class AddUserStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "AbpUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
            
            migrationBuilder.Sql(
                $@"UPDATE AbpUsers 
                    SET Status = CASE 
                        WHEN isActive = 1 THEN '{UserStatus.Active.ToString()}'
                        ELSE '{UserStatus.InActive.ToString()}' 
                    END");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "AbpUsers");
        }
    }
}
