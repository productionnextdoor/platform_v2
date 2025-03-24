using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMHelmutSchmidtPortal.Migrations
{
    /// <inheritdoc />
    public partial class AddProductDetailsToProductVariant : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProductionDetailsId",
                table: "PmProductVariant",
                type: "int",
                nullable: false,
                defaultValue: 0);
            
            migrationBuilder.Sql(
                @"
                    UPDATE PmProductVariant SET ProductionDetailsId = pd.Id
                    FROM PmProductVariant ps
                    INNER JOIN PmProducts p ON ps.ProductId = p.Id
                    INNER JOIN PmProductProductionDetails pd ON pd.ProductId = p.Id
                    WHERE pd.ProductionDetailsType = 'Live'
                ");
            
            migrationBuilder.CreateIndex(
                name: "IX_PmProductVariant_ProductionDetailsId",
                table: "PmProductVariant",
                column: "ProductionDetailsId");

            migrationBuilder.AddForeignKey(
                name: "FK_PmProductVariant_PmProductProductionDetails_ProductionDetailsId",
                table: "PmProductVariant",
                column: "ProductionDetailsId",
                principalTable: "PmProductProductionDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PmProductVariant_PmProductProductionDetails_ProductionDetailsId",
                table: "PmProductVariant");

            migrationBuilder.DropIndex(
                name: "IX_PmProductVariant_ProductionDetailsId",
                table: "PmProductVariant");

            migrationBuilder.DropColumn(
                name: "ProductionDetailsId",
                table: "PmProductVariant");
        }
    }
}
