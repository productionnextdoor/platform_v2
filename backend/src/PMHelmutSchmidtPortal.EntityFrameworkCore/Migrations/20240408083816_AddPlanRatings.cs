using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMHelmutSchmidtPortal.Migrations
{
    /// <inheritdoc />
    public partial class AddPlanRatings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "LeadTime",
                table: "PmProductionPlan",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.CreateTable(
                name: "PmProductionPlanRating",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RatingTypeId = table.Column<int>(type: "int", nullable: false),
                    Rating = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ProductionPlanId = table.Column<int>(type: "int", nullable: true),
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
                    table.PrimaryKey("PK_PmProductionPlanRating", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PmProductionPlanRating_PmProductionPlan_ProductionPlanId",
                        column: x => x.ProductionPlanId,
                        principalTable: "PmProductionPlan",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PmProductionPlanRating_PmRatingType_RatingTypeId",
                        column: x => x.RatingTypeId,
                        principalTable: "PmRatingType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PmProductionPlanRating_ProductionPlanId",
                table: "PmProductionPlanRating",
                column: "ProductionPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_PmProductionPlanRating_RatingTypeId",
                table: "PmProductionPlanRating",
                column: "RatingTypeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PmProductionPlanRating");

            migrationBuilder.DropColumn(
                name: "LeadTime",
                table: "PmProductionPlan");
        }
    }
}
