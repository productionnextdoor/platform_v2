using System;
using Microsoft.EntityFrameworkCore.Migrations;
using PMHelmutSchmidtPortal.HSUPortal.Products;

#nullable disable

namespace PMHelmutSchmidtPortal.Migrations
{
    /// <inheritdoc />
    public partial class AddProductProductionDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           migrationBuilder.CreateTable(
                name: "PmProductProductionDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    ProcessingDeadline = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastPlanCalculatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ProductionDetailsType = table.Column<string>(type: "nvarchar(max)", nullable: false, defaultValue: ProductionDetailsType.Live),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValue:DateTime.Now),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PmProductProductionDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PmProductProductionDetails_PmProducts_ProductId",
                        column: x => x.ProductId,
                        principalTable: "PmProducts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });
           
           migrationBuilder.AddColumn<int>(
               name: "ProductionDetailsId",
               table: "PmProductProducer",
               type: "int",
               nullable: true,
               defaultValue: 0);

           migrationBuilder.AddColumn<int>(
               name: "ProductionDetailsId",
               table: "PmProductionStepWorkPieceVariantCost",
               type: "int",
               nullable: false,
               defaultValue: 0);

           migrationBuilder.AddColumn<int>(
               name: "ProductionDetailsId",
               table: "PmProductionStep",
               type: "int",
               nullable: false,
               defaultValue: 0);

           migrationBuilder.AddColumn<int>(
               name: "ProductionDetailsId",
               table: "PmProductionState",
               type: "int",
               nullable: false,
               defaultValue: 0);

           migrationBuilder.AddColumn<int>(
               name: "ProductionDetailsId",
               table: "PmProductionPlan",
               type: "int",
               nullable: false,
               defaultValue: 0);

            //Create PmProductProductionDetails for each product
            migrationBuilder.Sql(
                @"
                    INSERT INTO PmProductProductionDetails (ProductId, ProcessingDeadline, LastPlanCalculatedAt)
                    SELECT Id, ProcessingDeadline, LastPlanCalculatedAt FROM PmProducts
                ");
            
            // Update ProductionStates to reference ProductProductionDetailsId
            migrationBuilder.Sql(
                @"
                    UPDATE PmProductionState SET ProductionDetailsId = pd.Id
                    FROM PmProductionState ps
                    INNER JOIN PmProducts p ON ps.ProductId = p.Id
                    INNER JOIN PmProductProductionDetails pd ON pd.ProductId = p.Id
                ");

            // Update ProductionSteps to reference ProductProductionDetailsId
            migrationBuilder.Sql(
                @"
                    UPDATE PmProductionStep SET ProductionDetailsId = pd.Id
                    FROM PmProductionStep ps
                    INNER JOIN PmProducts p ON ps.ProductId = p.Id
                    INNER JOIN PmProductProductionDetails pd ON pd.ProductId = p.Id
                    ");

            // Update ProductionPlans to reference ProductProductionDetailsId
            migrationBuilder.Sql(
                @"
                    UPDATE PmProductionPlan SET ProductionDetailsId = pd.Id
                    FROM PmProductionPlan pp
                    INNER JOIN PmProducts p ON pp.ProductId = p.Id
                    INNER JOIN PmProductProductionDetails pd ON pd.ProductId = p.Id
                ");

            // Update ProductProducers to reference ProductProductionDetailsId
            migrationBuilder.Sql(
                @"
                    UPDATE PmProductProducer SET ProductionDetailsId = pd.Id
                    FROM PmProductProducer pp
                    INNER JOIN PmProducts p ON pp.ProductId = p.Id
                    INNER JOIN PmProductProductionDetails pd ON pd.ProductId = p.Id
                ");
            
            // Update ProductionStepWorkPieceVariantCost to reference ProductProductionDetailsId
            migrationBuilder.Sql(
                @"
                    UPDATE PmProductionStepWorkPieceVariantCost SET ProductionDetailsId = pd.Id
                    FROM PmProductionStepWorkPieceVariantCost pp
                    INNER JOIN PmProducts p ON pp.ProductId = p.Id
                    INNER JOIN PmProductProductionDetails pd ON pd.ProductId = p.Id
                ");
            
            migrationBuilder.CreateIndex(
                name: "IX_PmProductProducer_ProductionDetailsId",
                table: "PmProductProducer",
                column: "ProductionDetailsId");

            migrationBuilder.CreateIndex(
                name: "IX_PmProductionStepWorkPieceVariantCost_ProductionDetailsId",
                table: "PmProductionStepWorkPieceVariantCost",
                column: "ProductionDetailsId");

            migrationBuilder.CreateIndex(
                name: "IX_PmProductionStep_ProductionDetailsId",
                table: "PmProductionStep",
                column: "ProductionDetailsId");

            migrationBuilder.CreateIndex(
                name: "IX_PmProductionState_ProductionDetailsId",
                table: "PmProductionState",
                column: "ProductionDetailsId");

            migrationBuilder.CreateIndex(
                name: "IX_PmProductionPlan_ProductionDetailsId",
                table: "PmProductionPlan",
                column: "ProductionDetailsId");

            migrationBuilder.CreateIndex(
                name: "IX_PmProductProductionDetails_ProductId",
                table: "PmProductProductionDetails",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_PmProductionPlan_PmProductProductionDetails_ProductionDetailsId",
                table: "PmProductionPlan",
                column: "ProductionDetailsId",
                principalTable: "PmProductProductionDetails",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PmProductionState_PmProductProductionDetailsProductionDetailsId",
                table: "PmProductionState",
                column: "ProductionDetailsId",
                principalTable: "PmProductProductionDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PmProductionStep_PmProductProductionDetails_ProductionDetailsId",
                table: "PmProductionStep",
                column: "ProductionDetailsId",
                principalTable: "PmProductProductionDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PmProductionStepWorkPieceVariantCost_PmProductProductionDetails_ProductionDetailsId",
                table: "PmProductionStepWorkPieceVariantCost",
                column: "ProductionDetailsId",
                principalTable: "PmProductProductionDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PmProductProducer_PmProductProductionDetails_ProductionDetailsId",
                table: "PmProductProducer",
                column: "ProductionDetailsId",
                principalTable: "PmProductProductionDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
            
            
            migrationBuilder.DropColumn(
                name: "LastPlanCalculatedAt",
                table: "PmProducts");

            migrationBuilder.DropColumn(
                name: "ProcessingDeadline",
                table: "PmProducts");
            
            migrationBuilder.DropForeignKey(
                name: "FK_PmProductionPlan_PmProducts_ProductId",
                table: "PmProductionPlan");

            migrationBuilder.DropForeignKey(
                name: "FK_PmProductionState_PmProducts_ProductId",
                table: "PmProductionState");

            migrationBuilder.DropForeignKey(
                name: "FK_PmProductionStep_PmProducts_ProductId",
                table: "PmProductionStep");

            migrationBuilder.DropForeignKey(
                name: "FK_PmProductionStepWorkPieceVariantCost_PmProducts_ProductId",
                table: "PmProductionStepWorkPieceVariantCost");

            migrationBuilder.DropForeignKey(
                name: "FK_PmProductProducer_PmProducts_ProductId",
                table: "PmProductProducer");

            migrationBuilder.DropIndex(
                name: "IX_PmProductProducer_ProductId",
                table: "PmProductProducer");

            migrationBuilder.DropIndex(
                name: "IX_PmProductionStepWorkPieceVariantCost_ProductId",
                table: "PmProductionStepWorkPieceVariantCost");

            migrationBuilder.DropIndex(
                name: "IX_PmProductionStep_ProductId",
                table: "PmProductionStep");

            migrationBuilder.DropIndex(
                name: "IX_PmProductionState_ProductId",
                table: "PmProductionState");

            migrationBuilder.DropIndex(
                name: "IX_PmProductionPlan_ProductId",
                table: "PmProductionPlan");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "PmProductProducer");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "PmProductionStepWorkPieceVariantCost");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "PmProductionStep");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "PmProductionState");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "PmProductionPlan");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder) 
        {
            // Re-add dropped columns to PmProducts
            migrationBuilder.AddColumn<DateTime>(
                name: "ProcessingDeadline",
                table: "PmProducts",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastPlanCalculatedAt",
                table: "PmProducts",
                type: "datetime2",
                nullable: true);
            
            // Re-add the ProductId columns to related tables
            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "PmProductProducer",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "PmProductionStepWorkPieceVariantCost",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "PmProductionStep",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "PmProductionState",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "PmProductionPlan",
                type: "int",
                nullable: false,
                defaultValue: 0);

            // Restore data from PmProductProductionDetails to PmProducts
            migrationBuilder.Sql(
                @"
                UPDATE p
                SET p.ProcessingDeadline = pd.ProcessingDeadline,
                    p.LastPlanCalculatedAt = pd.LastPlanCalculatedAt
                FROM PmProducts p
                INNER JOIN PmProductProductionDetails pd ON p.Id = pd.ProductId
                ");

            // Restore data to related tables
            migrationBuilder.Sql(
                @"
                UPDATE PmProductionState
                SET ProductId = pd.ProductId
                FROM PmProductionState ps
                INNER JOIN PmProductProductionDetails pd ON ps.ProductionDetailsId = pd.Id
                ");

            migrationBuilder.Sql(
                @"
                UPDATE PmProductionStep
                SET ProductId = pd.ProductId
                FROM PmProductionStep ps
                INNER JOIN PmProductProductionDetails pd ON ps.ProductionDetailsId = pd.Id
                ");

            migrationBuilder.Sql(
                @"
                UPDATE PmProductionPlan
                SET ProductId = pd.ProductId
                FROM PmProductionPlan pp
                INNER JOIN PmProductProductionDetails pd ON pp.ProductionDetailsId = pd.Id
                ");

            migrationBuilder.Sql(
                @"
                UPDATE PmProductProducer
                SET ProductId = pd.ProductId
                FROM PmProductProducer pp
                INNER JOIN PmProductProductionDetails pd ON pp.ProductionDetailsId = pd.Id
                ");

            migrationBuilder.Sql(
                @"
                UPDATE PmProductionStepWorkPieceVariantCost
                SET ProductId = pd.ProductId
                FROM PmProductionStepWorkPieceVariantCost pp
                INNER JOIN PmProductProductionDetails pd ON pp.ProductionDetailsId = pd.Id
                ");

            // Drop foreign keys
            migrationBuilder.DropForeignKey(
                name: "FK_PmProductionPlan_PmProductProductionDetails_ProductionDetailsId",
                table: "PmProductionPlan");

            migrationBuilder.DropForeignKey(
                name: "FK_PmProductionState_PmProductProductionDetailsProductionDetailsId",
                table: "PmProductionState");

            migrationBuilder.DropForeignKey(
                name: "FK_PmProductionStep_PmProductProductionDetails_ProductionDetailsId",
                table: "PmProductionStep");

            migrationBuilder.DropForeignKey(
                name: "FK_PmProductionStepWorkPieceVariantCost_PmProductProductionDetails_ProductionDetailsId",
                table: "PmProductionStepWorkPieceVariantCost");

            migrationBuilder.DropForeignKey(
                name: "FK_PmProductProducer_PmProductProductionDetails_ProductionDetailsId",
                table: "PmProductProducer");

            // Drop indexes
            migrationBuilder.DropIndex(
                name: "IX_PmProductProducer_ProductionDetailsId",
                table: "PmProductProducer");

            migrationBuilder.DropIndex(
                name: "IX_PmProductionStepWorkPieceVariantCost_ProductionDetailsId",
                table: "PmProductionStepWorkPieceVariantCost");

            migrationBuilder.DropIndex(
                name: "IX_PmProductionStep_ProductionDetailsId",
                table: "PmProductionStep");

            migrationBuilder.DropIndex(
                name: "IX_PmProductionState_ProductionDetailsId",
                table: "PmProductionState");

            migrationBuilder.DropIndex(
                name: "IX_PmProductionPlan_ProductionDetailsId",
                table: "PmProductionPlan");

            migrationBuilder.DropIndex(
                name: "IX_PmProductProductionDetails_ProductId",
                table: "PmProductProductionDetails");

            // Remove columns from related tables
            migrationBuilder.DropColumn(
                name: "ProductionDetailsId",
                table: "PmProductProducer");

            migrationBuilder.DropColumn(
                name: "ProductionDetailsId",
                table: "PmProductionStepWorkPieceVariantCost");

            migrationBuilder.DropColumn(
                name: "ProductionDetailsId",
                table: "PmProductionStep");

            migrationBuilder.DropColumn(
                name: "ProductionDetailsId",
                table: "PmProductionState");

            migrationBuilder.DropColumn(
                name: "ProductionDetailsId",
                table: "PmProductionPlan");

            // Drop the PmProductProductionDetails table
            migrationBuilder.DropTable(
                name: "PmProductProductionDetails");
            
            // Recreate indexes for ProductId
            migrationBuilder.CreateIndex(
                name: "IX_PmProductProducer_ProductId",
                table: "PmProductProducer",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_PmProductionStepWorkPieceVariantCost_ProductId",
                table: "PmProductionStepWorkPieceVariantCost",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_PmProductionStep_ProductId",
                table: "PmProductionStep",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_PmProductionState_ProductId",
                table: "PmProductionState",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_PmProductionPlan_ProductId",
                table: "PmProductionPlan",
                column: "ProductId");

            // Restore foreign keys for ProductId
            migrationBuilder.AddForeignKey(
                name: "FK_PmProductionPlan_PmProducts_ProductId",
                table: "PmProductionPlan",
                column: "ProductId",
                principalTable: "PmProducts",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_PmProductionState_PmProducts_ProductId",
                table: "PmProductionState",
                column: "ProductId",
                principalTable: "PmProducts",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_PmProductionStep_PmProducts_ProductId",
                table: "PmProductionStep",
                column: "ProductId",
                principalTable: "PmProducts",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_PmProductionStepWorkPieceVariantCost_PmProducts_ProductId",
                table: "PmProductionStepWorkPieceVariantCost",
                column: "ProductId",
                principalTable: "PmProducts",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_PmProductProducer_PmProducts_ProductId",
                table: "PmProductProducer",
                column: "ProductId",
                principalTable: "PmProducts",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

    }
}
