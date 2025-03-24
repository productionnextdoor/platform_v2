using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMHelmutSchmidtPortal.Migrations
{
    /// <inheritdoc />
    public partial class RefactorProductionStepMeasurementVariant : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PmProductionStepMeasurementVariant_PmProductMeasurement_MeasurementsId",
                table: "PmProductionStepMeasurementVariant");

            migrationBuilder.RenameColumn(
                name: "MeasurementsId",
                table: "PmProductionStepMeasurementVariant",
                newName: "ProductMeasurementId");

            migrationBuilder.RenameColumn(
                name: "AdditionalCosts",
                table: "PmProductionStepMeasurementVariant",
                newName: "AdditionalCost");

            migrationBuilder.RenameIndex(
                name: "IX_PmProductionStepMeasurementVariant_MeasurementsId",
                table: "PmProductionStepMeasurementVariant",
                newName: "IX_PmProductionStepMeasurementVariant_ProductMeasurementId");

            migrationBuilder.AddForeignKey(
                name: "FK_PmProductionStepMeasurementVariant_PmProductMeasurement_ProductMeasurementId",
                table: "PmProductionStepMeasurementVariant",
                column: "ProductMeasurementId",
                principalTable: "PmProductMeasurement",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PmProductionStepMeasurementVariant_PmProductMeasurement_ProductMeasurementId",
                table: "PmProductionStepMeasurementVariant");

            migrationBuilder.RenameColumn(
                name: "ProductMeasurementId",
                table: "PmProductionStepMeasurementVariant",
                newName: "MeasurementsId");

            migrationBuilder.RenameColumn(
                name: "AdditionalCost",
                table: "PmProductionStepMeasurementVariant",
                newName: "AdditionalCosts");

            migrationBuilder.RenameIndex(
                name: "IX_PmProductionStepMeasurementVariant_ProductMeasurementId",
                table: "PmProductionStepMeasurementVariant",
                newName: "IX_PmProductionStepMeasurementVariant_MeasurementsId");

            migrationBuilder.AddForeignKey(
                name: "FK_PmProductionStepMeasurementVariant_PmProductMeasurement_MeasurementsId",
                table: "PmProductionStepMeasurementVariant",
                column: "MeasurementsId",
                principalTable: "PmProductMeasurement",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
