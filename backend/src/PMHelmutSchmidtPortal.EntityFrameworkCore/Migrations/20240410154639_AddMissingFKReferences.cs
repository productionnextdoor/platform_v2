using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMHelmutSchmidtPortal.Migrations
{
    /// <inheritdoc />
    public partial class AddMissingFKReferences : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PmProductionStepWorkPieceVariantCost_PmWorkPiece_WorkPieceId",
                table: "PmProductionStepWorkPieceVariantCost");

            migrationBuilder.AlterColumn<int>(
                name: "WorkPieceId",
                table: "PmProductionStepWorkPieceVariantCost",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_PmProductionStepWorkPieceVariantCost_PmWorkPiece_WorkPieceId",
                table: "PmProductionStepWorkPieceVariantCost",
                column: "WorkPieceId",
                principalTable: "PmWorkPiece",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PmProductionStepWorkPieceVariantCost_PmWorkPiece_WorkPieceId",
                table: "PmProductionStepWorkPieceVariantCost");

            migrationBuilder.AlterColumn<int>(
                name: "WorkPieceId",
                table: "PmProductionStepWorkPieceVariantCost",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_PmProductionStepWorkPieceVariantCost_PmWorkPiece_WorkPieceId",
                table: "PmProductionStepWorkPieceVariantCost",
                column: "WorkPieceId",
                principalTable: "PmWorkPiece",
                principalColumn: "Id");
        }
    }
}
