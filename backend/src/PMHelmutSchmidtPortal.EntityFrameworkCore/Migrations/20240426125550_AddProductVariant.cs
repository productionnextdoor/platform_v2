using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMHelmutSchmidtPortal.Migrations
{
    /// <inheritdoc />
    public partial class AddProductVariant : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PmProductVariant",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    ProductMeasurementId = table.Column<int>(type: "int", nullable: false),
                    Cost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PmProductVariant", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PmProductVariant_PmProductMeasurement_ProductMeasurementId",
                        column: x => x.ProductMeasurementId,
                        principalTable: "PmProductMeasurement",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PmProductVariant_PmProducts_ProductId",
                        column: x => x.ProductId,
                        principalTable: "PmProducts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "PmProductOption",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductVariantId = table.Column<int>(type: "int", nullable: false),
                    WorkPieceId = table.Column<int>(type: "int", nullable: false),
                    WorkPieceVariantId = table.Column<int>(type: "int", nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PmProductOption", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PmProductOption_PmProductVariant_ProductVariantId",
                        column: x => x.ProductVariantId,
                        principalTable: "PmProductVariant",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PmProductOption_PmWorkPieceVariant_WorkPieceVariantId",
                        column: x => x.WorkPieceVariantId,
                        principalTable: "PmWorkPieceVariant",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PmProductOption_PmWorkPiece_WorkPieceId",
                        column: x => x.WorkPieceId,
                        principalTable: "PmWorkPiece",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PmProductOption_ProductVariantId",
                table: "PmProductOption",
                column: "ProductVariantId");

            migrationBuilder.CreateIndex(
                name: "IX_PmProductOption_WorkPieceId",
                table: "PmProductOption",
                column: "WorkPieceId");

            migrationBuilder.CreateIndex(
                name: "IX_PmProductOption_WorkPieceVariantId",
                table: "PmProductOption",
                column: "WorkPieceVariantId");

            migrationBuilder.CreateIndex(
                name: "IX_PmProductVariant_ProductId",
                table: "PmProductVariant",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_PmProductVariant_ProductMeasurementId",
                table: "PmProductVariant",
                column: "ProductMeasurementId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PmProductOption");

            migrationBuilder.DropTable(
                name: "PmProductVariant");
        }
    }
}
