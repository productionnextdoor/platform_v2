using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMHelmutSchmidtPortal.Migrations
{
    /// <inheritdoc />
    public partial class MoveAdminNoteToUserAddress : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdminNote",
                table: "AbpUsers");

            migrationBuilder.AddColumn<string>(
                name: "AdminNote",
                table: "PmUserAddress",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdminNote",
                table: "PmUserAddress");

            migrationBuilder.AddColumn<string>(
                name: "AdminNote",
                table: "AbpUsers",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
