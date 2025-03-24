using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMHelmutSchmidtPortal.Migrations
{
    /// <inheritdoc />
    public partial class ChangeProductionPlanFKs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PmProductionPlanRating_PmProductionPlan_ProductionPlanId",
                table: "PmProductionPlanRating");

            migrationBuilder.AlterColumn<int>(
                name: "ProductionPlanId",
                table: "PmProductionPlanRating",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_PmProductionPlanRating_PmProductionPlan_ProductionPlanId",
                table: "PmProductionPlanRating",
                column: "ProductionPlanId",
                principalTable: "PmProductionPlan",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PmProductionPlanRating_PmProductionPlan_ProductionPlanId",
                table: "PmProductionPlanRating");

            migrationBuilder.AlterColumn<int>(
                name: "ProductionPlanId",
                table: "PmProductionPlanRating",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_PmProductionPlanRating_PmProductionPlan_ProductionPlanId",
                table: "PmProductionPlanRating",
                column: "ProductionPlanId",
                principalTable: "PmProductionPlan",
                principalColumn: "Id");
        }
    }
}
