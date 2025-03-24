using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMHelmutSchmidtPortal.Migrations
{
    /// <inheritdoc />
    public partial class AddProductionPlanning : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PmProductionStepMeasurementVariant_PmProductMeasurements_MeasurementsId",
                table: "PmProductionStepMeasurementVariant");

            migrationBuilder.AddColumn<string>(
                name: "CodeForPlanner",
                table: "PmProducts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastPlanCalculatedAt",
                table: "PmProducts",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "MaterialCost",
                table: "PmProductionStepWorkPieceVariantCost",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");

            migrationBuilder.AlterColumn<decimal>(
                name: "WorkHours",
                table: "PmProductionStepMeasurementVariant",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");

            migrationBuilder.AlterColumn<decimal>(
                name: "TransportAndAssemblyCost",
                table: "PmProductionStepMeasurementVariant",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");

            migrationBuilder.AlterColumn<decimal>(
                name: "OrderProcessingTime",
                table: "PmProductionStepMeasurementVariant",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");

            migrationBuilder.AlterColumn<int>(
                name: "MeasurementsId",
                table: "PmProductionStepMeasurementVariant",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "AdditionalCosts",
                table: "PmProductionStepMeasurementVariant",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");

            migrationBuilder.AlterColumn<decimal>(
                name: "Rate",
                table: "PmProducerInfo",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.CreateTable(
                name: "PmProductionPlan",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    PlanValue = table.Column<float>(type: "real", nullable: false),
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
                    table.PrimaryKey("PK_PmProductionPlan", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PmProductionPlan_PmProducts_ProductId",
                        column: x => x.ProductId,
                        principalTable: "PmProducts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PmProductionPlanAction",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductionStepId = table.Column<int>(type: "int", nullable: false),
                    FinalStateId = table.Column<int>(type: "int", nullable: false),
                    StartPoint = table.Column<float>(type: "real", nullable: false),
                    EndPoint = table.Column<float>(type: "real", nullable: false),
                    ProducerId = table.Column<long>(type: "bigint", nullable: false),
                    ProcessingTimeInHours = table.Column<float>(type: "real", nullable: false),
                    WorkingTimeInHours = table.Column<float>(type: "real", nullable: false),
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
                    table.PrimaryKey("PK_PmProductionPlanAction", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PmProductionPlanAction_AbpUsers_ProducerId",
                        column: x => x.ProducerId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PmProductionPlanAction_PmProductionPlan_ProductionPlanId",
                        column: x => x.ProductionPlanId,
                        principalTable: "PmProductionPlan",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PmProductionPlanAction_PmProductionState_FinalStateId",
                        column: x => x.FinalStateId,
                        principalTable: "PmProductionState",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PmProductionPlanAction_PmProductionStep_ProductionStepId",
                        column: x => x.ProductionStepId,
                        principalTable: "PmProductionStep",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PmActionPreconditionState",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ActionId = table.Column<int>(type: "int", nullable: true),
                    StateId = table.Column<int>(type: "int", nullable: true),
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
                    table.PrimaryKey("PK_PmActionPreconditionState", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PmActionPreconditionState_PmProductionPlanAction_ActionId",
                        column: x => x.ActionId,
                        principalTable: "PmProductionPlanAction",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PmActionPreconditionState_PmProductionState_StateId",
                        column: x => x.StateId,
                        principalTable: "PmProductionState",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_PmActionPreconditionState_ActionId",
                table: "PmActionPreconditionState",
                column: "ActionId");

            migrationBuilder.CreateIndex(
                name: "IX_PmActionPreconditionState_StateId",
                table: "PmActionPreconditionState",
                column: "StateId");

            migrationBuilder.CreateIndex(
                name: "IX_PmProductionPlan_ProductId",
                table: "PmProductionPlan",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_PmProductionPlanAction_FinalStateId",
                table: "PmProductionPlanAction",
                column: "FinalStateId");

            migrationBuilder.CreateIndex(
                name: "IX_PmProductionPlanAction_ProducerId",
                table: "PmProductionPlanAction",
                column: "ProducerId");

            migrationBuilder.CreateIndex(
                name: "IX_PmProductionPlanAction_ProductionPlanId",
                table: "PmProductionPlanAction",
                column: "ProductionPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_PmProductionPlanAction_ProductionStepId",
                table: "PmProductionPlanAction",
                column: "ProductionStepId");

            migrationBuilder.AddForeignKey(
                name: "FK_PmProductionStepMeasurementVariant_PmProductMeasurements_MeasurementsId",
                table: "PmProductionStepMeasurementVariant",
                column: "MeasurementsId",
                principalTable: "PmProductMeasurements",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PmProductionStepMeasurementVariant_PmProductMeasurements_MeasurementsId",
                table: "PmProductionStepMeasurementVariant");

            migrationBuilder.DropTable(
                name: "PmActionPreconditionState");

            migrationBuilder.DropTable(
                name: "PmProductionPlanAction");

            migrationBuilder.DropTable(
                name: "PmProductionPlan");

            migrationBuilder.DropColumn(
                name: "CodeForPlanner",
                table: "PmProducts");

            migrationBuilder.DropColumn(
                name: "LastPlanCalculatedAt",
                table: "PmProducts");

            migrationBuilder.AlterColumn<float>(
                name: "MaterialCost",
                table: "PmProductionStepWorkPieceVariantCost",
                type: "real",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<float>(
                name: "WorkHours",
                table: "PmProductionStepMeasurementVariant",
                type: "real",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<float>(
                name: "TransportAndAssemblyCost",
                table: "PmProductionStepMeasurementVariant",
                type: "real",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<float>(
                name: "OrderProcessingTime",
                table: "PmProductionStepMeasurementVariant",
                type: "real",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<int>(
                name: "MeasurementsId",
                table: "PmProductionStepMeasurementVariant",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<float>(
                name: "AdditionalCosts",
                table: "PmProductionStepMeasurementVariant",
                type: "real",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<double>(
                name: "Rate",
                table: "PmProducerInfo",
                type: "float",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AddForeignKey(
                name: "FK_PmProductionStepMeasurementVariant_PmProductMeasurements_MeasurementsId",
                table: "PmProductionStepMeasurementVariant",
                column: "MeasurementsId",
                principalTable: "PmProductMeasurements",
                principalColumn: "Id");
        }
    }
}
