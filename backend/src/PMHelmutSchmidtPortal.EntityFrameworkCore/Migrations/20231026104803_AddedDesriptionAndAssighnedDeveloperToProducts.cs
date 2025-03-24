using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMHelmutSchmidtPortal.Migrations
{
    /// <inheritdoc />
    public partial class AddedDesriptionAndAssighnedDeveloperToProducts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "AssignedDeveloperId",
                table: "PmProducts",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "PmProducts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PmProducts_AssignedDeveloperId",
                table: "PmProducts",
                column: "AssignedDeveloperId");

            migrationBuilder.AddForeignKey(
                name: "FK_PmProducts_AbpUsers_AssignedDeveloperId",
                table: "PmProducts",
                column: "AssignedDeveloperId",
                principalTable: "AbpUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PmProducts_AbpUsers_AssignedDeveloperId",
                table: "PmProducts");

            migrationBuilder.DropIndex(
                name: "IX_PmProducts_AssignedDeveloperId",
                table: "PmProducts");

            migrationBuilder.DropColumn(
                name: "AssignedDeveloperId",
                table: "PmProducts");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "PmProducts");
        }
    }
}
