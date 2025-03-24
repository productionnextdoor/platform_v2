using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMHelmutSchmidtPortal.Migrations
{
    /// <inheritdoc />
    public partial class AddProductVariantCostInformation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "AdditonalCost",
                table: "PmProductVariant",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "MaterialCost",
                table: "PmProductVariant",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "TransportAndAssemblyCost",
                table: "PmProductVariant",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "WorkCost",
                table: "PmProductVariant",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdditonalCost",
                table: "PmProductVariant");

            migrationBuilder.DropColumn(
                name: "MaterialCost",
                table: "PmProductVariant");

            migrationBuilder.DropColumn(
                name: "TransportAndAssemblyCost",
                table: "PmProductVariant");

            migrationBuilder.DropColumn(
                name: "WorkCost",
                table: "PmProductVariant");
        }
    }
}
