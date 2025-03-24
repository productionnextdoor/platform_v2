using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMHelmutSchmidtPortal.Migrations
{
    /// <inheritdoc />
    public partial class AddVariantActionsCosts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PmVariantProductionPlanActionCost",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductVariantId = table.Column<int>(type: "int", nullable: false),
                    PlanActionId = table.Column<int>(type: "int", nullable: false),
                    WorkCost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    AdditionalCost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TransportAndAssemblyCost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    MaterialCost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
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
                    table.PrimaryKey("PK_PmVariantProductionPlanActionCost", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PmVariantProductionPlanActionCost_PmProductVariant_ProductVariantId",
                        column: x => x.ProductVariantId,
                        principalTable: "PmProductVariant",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PmVariantProductionPlanActionCost_PmProductionPlanAction_PlanActionId",
                        column: x => x.PlanActionId,
                        principalTable: "PmProductionPlanAction",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PmVariantProductionPlanActionCost_PlanActionId",
                table: "PmVariantProductionPlanActionCost",
                column: "PlanActionId");

            migrationBuilder.CreateIndex(
                name: "IX_PmVariantProductionPlanActionCost_ProductVariantId",
                table: "PmVariantProductionPlanActionCost",
                column: "ProductVariantId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PmVariantProductionPlanActionCost");
        }
    }
}
