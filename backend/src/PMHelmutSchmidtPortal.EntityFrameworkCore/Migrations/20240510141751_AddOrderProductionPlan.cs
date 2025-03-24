using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMHelmutSchmidtPortal.Migrations
{
    /// <inheritdoc />
    public partial class AddOrderProductionPlan : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PmOrderProductionPlan",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ShopOrderId = table.Column<int>(type: "int", nullable: false),
                    ProductionPlanId = table.Column<int>(type: "int", nullable: false),
                    ProductionStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SelectedForProductionAt = table.Column<DateTime>(type: "datetime2", nullable: false),
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
                    table.PrimaryKey("PK_PmOrderProductionPlan", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PmOrderProductionPlan_PmProductionPlan_ProductionPlanId",
                        column: x => x.ProductionPlanId,
                        principalTable: "PmProductionPlan",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PmOrderProductionPlan_PmShopOrder_ShopOrderId",
                        column: x => x.ShopOrderId,
                        principalTable: "PmShopOrder",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PmOrderProductionPlanAction",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderProductionPlanId = table.Column<int>(type: "int", nullable: false),
                    PlanActionId = table.Column<int>(type: "int", nullable: false),
                    ActionStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
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
                    table.PrimaryKey("PK_PmOrderProductionPlanAction", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PmOrderProductionPlanAction_PmOrderProductionPlan_OrderProductionPlanId",
                        column: x => x.OrderProductionPlanId,
                        principalTable: "PmOrderProductionPlan",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PmOrderProductionPlanAction_PmProductionPlanAction_PlanActionId",
                        column: x => x.PlanActionId,
                        principalTable: "PmProductionPlanAction",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_PmOrderProductionPlan_ProductionPlanId",
                table: "PmOrderProductionPlan",
                column: "ProductionPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_PmOrderProductionPlan_ShopOrderId",
                table: "PmOrderProductionPlan",
                column: "ShopOrderId");

            migrationBuilder.CreateIndex(
                name: "IX_PmOrderProductionPlanAction_OrderProductionPlanId",
                table: "PmOrderProductionPlanAction",
                column: "OrderProductionPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_PmOrderProductionPlanAction_PlanActionId",
                table: "PmOrderProductionPlanAction",
                column: "PlanActionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PmOrderProductionPlanAction");

            migrationBuilder.DropTable(
                name: "PmOrderProductionPlan");
        }
    }
}
