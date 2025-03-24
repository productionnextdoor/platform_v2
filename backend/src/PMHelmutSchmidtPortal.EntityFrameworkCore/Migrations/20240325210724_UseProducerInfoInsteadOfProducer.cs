using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMHelmutSchmidtPortal.Migrations
{
    /// <inheritdoc />
    public partial class UseProducerInfoInsteadOfProducer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PmProductionStep_AbpUsers_ProducerId",
                table: "PmProductionStep");

            migrationBuilder.DropForeignKey(
                name: "FK_PmProductionStepWorkPieceVariantCost_AbpUsers_ProducerId",
                table: "PmProductionStepWorkPieceVariantCost");

            migrationBuilder.DropIndex(
                name: "IX_PmProductionStepWorkPieceVariantCost_ProducerId",
                table: "PmProductionStepWorkPieceVariantCost");

            migrationBuilder.DropIndex(
                name: "IX_PmProductionStep_ProducerId",
                table: "PmProductionStep");

            migrationBuilder.DropColumn(
                name: "ProducerId",
                table: "PmProductionStepWorkPieceVariantCost");

            migrationBuilder.DropColumn(
                name: "ProducerId",
                table: "PmProductionStep");

            migrationBuilder.AddColumn<int>(
                name: "ProducerInfoId",
                table: "PmProductionStepWorkPieceVariantCost",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ProducerInfoId",
                table: "PmProductionStep",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_PmProductionStepWorkPieceVariantCost_ProducerInfoId",
                table: "PmProductionStepWorkPieceVariantCost",
                column: "ProducerInfoId");

            migrationBuilder.CreateIndex(
                name: "IX_PmProductionStep_ProducerInfoId",
                table: "PmProductionStep",
                column: "ProducerInfoId");

            migrationBuilder.AddForeignKey(
                name: "FK_PmProductionStep_PmProducerInfo_ProducerInfoId",
                table: "PmProductionStep",
                column: "ProducerInfoId",
                principalTable: "PmProducerInfo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PmProductionStepWorkPieceVariantCost_PmProducerInfo_ProducerInfoId",
                table: "PmProductionStepWorkPieceVariantCost",
                column: "ProducerInfoId",
                principalTable: "PmProducerInfo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PmProductionStep_PmProducerInfo_ProducerInfoId",
                table: "PmProductionStep");

            migrationBuilder.DropForeignKey(
                name: "FK_PmProductionStepWorkPieceVariantCost_PmProducerInfo_ProducerInfoId",
                table: "PmProductionStepWorkPieceVariantCost");

            migrationBuilder.DropIndex(
                name: "IX_PmProductionStepWorkPieceVariantCost_ProducerInfoId",
                table: "PmProductionStepWorkPieceVariantCost");

            migrationBuilder.DropIndex(
                name: "IX_PmProductionStep_ProducerInfoId",
                table: "PmProductionStep");

            migrationBuilder.DropColumn(
                name: "ProducerInfoId",
                table: "PmProductionStepWorkPieceVariantCost");

            migrationBuilder.DropColumn(
                name: "ProducerInfoId",
                table: "PmProductionStep");

            migrationBuilder.AddColumn<long>(
                name: "ProducerId",
                table: "PmProductionStepWorkPieceVariantCost",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "ProducerId",
                table: "PmProductionStep",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_PmProductionStepWorkPieceVariantCost_ProducerId",
                table: "PmProductionStepWorkPieceVariantCost",
                column: "ProducerId");

            migrationBuilder.CreateIndex(
                name: "IX_PmProductionStep_ProducerId",
                table: "PmProductionStep",
                column: "ProducerId");

            migrationBuilder.AddForeignKey(
                name: "FK_PmProductionStep_AbpUsers_ProducerId",
                table: "PmProductionStep",
                column: "ProducerId",
                principalTable: "AbpUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PmProductionStepWorkPieceVariantCost_AbpUsers_ProducerId",
                table: "PmProductionStepWorkPieceVariantCost",
                column: "ProducerId",
                principalTable: "AbpUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
