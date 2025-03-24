using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMHelmutSchmidtPortal.Migrations
{
    /// <inheritdoc />
    public partial class RenameProductMeasurements : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PmProductionStepMeasurementVariant_PmProductMeasurements_MeasurementsId",
                table: "PmProductionStepMeasurementVariant");

            migrationBuilder.DropForeignKey(
                name: "FK_PmProductMeasurements_PmProducts_ProductId",
                table: "PmProductMeasurements");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PmProductMeasurements",
                table: "PmProductMeasurements");

            migrationBuilder.RenameTable(
                name: "PmProductMeasurements",
                newName: "PmProductMeasurement");

            migrationBuilder.RenameIndex(
                name: "IX_PmProductMeasurements_ProductId",
                table: "PmProductMeasurement",
                newName: "IX_PmProductMeasurement_ProductId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PmProductMeasurement",
                table: "PmProductMeasurement",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PmProductionStepMeasurementVariant_PmProductMeasurement_MeasurementsId",
                table: "PmProductionStepMeasurementVariant",
                column: "MeasurementsId",
                principalTable: "PmProductMeasurement",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PmProductMeasurement_PmProducts_ProductId",
                table: "PmProductMeasurement",
                column: "ProductId",
                principalTable: "PmProducts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PmProductionStepMeasurementVariant_PmProductMeasurement_MeasurementsId",
                table: "PmProductionStepMeasurementVariant");

            migrationBuilder.DropForeignKey(
                name: "FK_PmProductMeasurement_PmProducts_ProductId",
                table: "PmProductMeasurement");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PmProductMeasurement",
                table: "PmProductMeasurement");

            migrationBuilder.RenameTable(
                name: "PmProductMeasurement",
                newName: "PmProductMeasurements");

            migrationBuilder.RenameIndex(
                name: "IX_PmProductMeasurement_ProductId",
                table: "PmProductMeasurements",
                newName: "IX_PmProductMeasurements_ProductId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PmProductMeasurements",
                table: "PmProductMeasurements",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PmProductionStepMeasurementVariant_PmProductMeasurements_MeasurementsId",
                table: "PmProductionStepMeasurementVariant",
                column: "MeasurementsId",
                principalTable: "PmProductMeasurements",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PmProductMeasurements_PmProducts_ProductId",
                table: "PmProductMeasurements",
                column: "ProductId",
                principalTable: "PmProducts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
