using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMHelmutSchmidtPortal.Migrations
{
    /// <inheritdoc />
    public partial class ChangeProductionActionCoulmnName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ProcessingTimeInHours",
                table: "PmProductionPlanAction",
                newName: "ProcessingTimeInWeeks");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ProcessingTimeInWeeks",
                table: "PmProductionPlanAction",
                newName: "ProcessingTimeInHours");
        }
    }
}
