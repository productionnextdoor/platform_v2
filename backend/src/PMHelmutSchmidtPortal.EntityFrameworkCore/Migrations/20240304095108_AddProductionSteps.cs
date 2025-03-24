using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMHelmutSchmidtPortal.Migrations
{
    /// <inheritdoc />
    public partial class AddProductionSteps : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PmProductionStep",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    ProducerId = table.Column<long>(type: "bigint", nullable: false),
                    StartStateId = table.Column<int>(type: "int", nullable: true),
                    EndStateId = table.Column<int>(type: "int", nullable: true),
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
                    table.PrimaryKey("PK_PmProductionStep", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PmProductionStep_AbpUsers_ProducerId",
                        column: x => x.ProducerId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PmProductionStep_PmProductionState_EndStateId",
                        column: x => x.EndStateId,
                        principalTable: "PmProductionState",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PmProductionStep_PmProductionState_StartStateId",
                        column: x => x.StartStateId,
                        principalTable: "PmProductionState",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PmProductionStep_PmProducts_ProductId",
                        column: x => x.ProductId,
                        principalTable: "PmProducts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PmProductionStepMeasurementVariant",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductionStepId = table.Column<int>(type: "int", nullable: true),
                    MeasurementsId = table.Column<int>(type: "int", nullable: true),
                    OrderProcessingTime = table.Column<float>(type: "real", nullable: false),
                    WorkHours = table.Column<float>(type: "real", nullable: false),
                    TransportAndAssemblyCost = table.Column<float>(type: "real", nullable: false),
                    AdditionalCosts = table.Column<float>(type: "real", nullable: false),
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
                    table.PrimaryKey("PK_PmProductionStepMeasurementVariant", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PmProductionStepMeasurementVariant_PmProductMeasurements_MeasurementsId",
                        column: x => x.MeasurementsId,
                        principalTable: "PmProductMeasurements",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PmProductionStepMeasurementVariant_PmProductionStep_ProductionStepId",
                        column: x => x.ProductionStepId,
                        principalTable: "PmProductionStep",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PmProductionStepWorkPieceVariantCost",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MeasurementVariantId = table.Column<int>(type: "int", nullable: true),
                    WorkPieceId = table.Column<int>(type: "int", nullable: true),
                    VariantId = table.Column<int>(type: "int", nullable: true),
                    IsStandard = table.Column<bool>(type: "bit", nullable: false),
                    MaterialCost = table.Column<float>(type: "real", nullable: false),
                    CanProduce = table.Column<bool>(type: "bit", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    ProducerId = table.Column<long>(type: "bigint", nullable: false),
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
                    table.PrimaryKey("PK_PmProductionStepWorkPieceVariantCost", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PmProductionStepWorkPieceVariantCost_AbpUsers_ProducerId",
                        column: x => x.ProducerId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PmProductionStepWorkPieceVariantCost_PmProductionStepMeasurementVariant_MeasurementVariantId",
                        column: x => x.MeasurementVariantId,
                        principalTable: "PmProductionStepMeasurementVariant",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PmProductionStepWorkPieceVariantCost_PmProducts_ProductId",
                        column: x => x.ProductId,
                        principalTable: "PmProducts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PmProductionStepWorkPieceVariantCost_PmWorkPieceVariant_VariantId",
                        column: x => x.VariantId,
                        principalTable: "PmWorkPieceVariant",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PmProductionStepWorkPieceVariantCost_PmWorkPiece_WorkPieceId",
                        column: x => x.WorkPieceId,
                        principalTable: "PmWorkPiece",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_PmProductionStep_EndStateId",
                table: "PmProductionStep",
                column: "EndStateId");

            migrationBuilder.CreateIndex(
                name: "IX_PmProductionStep_ProducerId",
                table: "PmProductionStep",
                column: "ProducerId");

            migrationBuilder.CreateIndex(
                name: "IX_PmProductionStep_ProductId",
                table: "PmProductionStep",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_PmProductionStep_StartStateId",
                table: "PmProductionStep",
                column: "StartStateId");

            migrationBuilder.CreateIndex(
                name: "IX_PmProductionStepMeasurementVariant_MeasurementsId",
                table: "PmProductionStepMeasurementVariant",
                column: "MeasurementsId");

            migrationBuilder.CreateIndex(
                name: "IX_PmProductionStepMeasurementVariant_ProductionStepId",
                table: "PmProductionStepMeasurementVariant",
                column: "ProductionStepId");

            migrationBuilder.CreateIndex(
                name: "IX_PmProductionStepWorkPieceVariantCost_MeasurementVariantId",
                table: "PmProductionStepWorkPieceVariantCost",
                column: "MeasurementVariantId");

            migrationBuilder.CreateIndex(
                name: "IX_PmProductionStepWorkPieceVariantCost_ProducerId",
                table: "PmProductionStepWorkPieceVariantCost",
                column: "ProducerId");

            migrationBuilder.CreateIndex(
                name: "IX_PmProductionStepWorkPieceVariantCost_ProductId",
                table: "PmProductionStepWorkPieceVariantCost",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_PmProductionStepWorkPieceVariantCost_VariantId",
                table: "PmProductionStepWorkPieceVariantCost",
                column: "VariantId");

            migrationBuilder.CreateIndex(
                name: "IX_PmProductionStepWorkPieceVariantCost_WorkPieceId",
                table: "PmProductionStepWorkPieceVariantCost",
                column: "WorkPieceId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PmProductionStepWorkPieceVariantCost");

            migrationBuilder.DropTable(
                name: "PmProductionStepMeasurementVariant");

            migrationBuilder.DropTable(
                name: "PmProductionStep");
        }
    }
}
