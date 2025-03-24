using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMHelmutSchmidtPortal.Migrations
{
    /// <inheritdoc />
    public partial class ChangeProductionStateTypeAlterOnDeleteRestrictions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PmProductionState_PmProducts_ProductId",
                table: "PmProductionState");

            migrationBuilder.DropForeignKey(
                name: "FK_PmProducts_AbpUsers_AssignedDeveloperId",
                table: "PmProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_PmWorkPiece_PmMaterialGroup_MaterialGroupId",
                table: "PmWorkPiece");

            migrationBuilder.DropForeignKey(
                name: "FK_PmWorkPiece_PmProducts_ProductId",
                table: "PmWorkPiece");

            migrationBuilder.DropForeignKey(
                name: "FK_PmWorkPiece_PmSurfaceFinish_SurfaceFinishId",
                table: "PmWorkPiece");

            migrationBuilder.AlterColumn<int>(
                name: "SurfaceFinishId",
                table: "PmWorkPiece",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "PmWorkPiece",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "MaterialGroupId",
                table: "PmWorkPiece",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "AssignedDeveloperId",
                table: "PmProducts",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "StateType",
                table: "PmProductionState",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "PmProductionState",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_PmProductionState_PmProducts_ProductId",
                table: "PmProductionState",
                column: "ProductId",
                principalTable: "PmProducts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PmProducts_AbpUsers_AssignedDeveloperId",
                table: "PmProducts",
                column: "AssignedDeveloperId",
                principalTable: "AbpUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PmWorkPiece_PmMaterialGroup_MaterialGroupId",
                table: "PmWorkPiece",
                column: "MaterialGroupId",
                principalTable: "PmMaterialGroup",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PmWorkPiece_PmProducts_ProductId",
                table: "PmWorkPiece",
                column: "ProductId",
                principalTable: "PmProducts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PmWorkPiece_PmSurfaceFinish_SurfaceFinishId",
                table: "PmWorkPiece",
                column: "SurfaceFinishId",
                principalTable: "PmSurfaceFinish",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PmProductionState_PmProducts_ProductId",
                table: "PmProductionState");

            migrationBuilder.DropForeignKey(
                name: "FK_PmProducts_AbpUsers_AssignedDeveloperId",
                table: "PmProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_PmWorkPiece_PmMaterialGroup_MaterialGroupId",
                table: "PmWorkPiece");

            migrationBuilder.DropForeignKey(
                name: "FK_PmWorkPiece_PmProducts_ProductId",
                table: "PmWorkPiece");

            migrationBuilder.DropForeignKey(
                name: "FK_PmWorkPiece_PmSurfaceFinish_SurfaceFinishId",
                table: "PmWorkPiece");

            migrationBuilder.AlterColumn<int>(
                name: "SurfaceFinishId",
                table: "PmWorkPiece",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "PmWorkPiece",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "MaterialGroupId",
                table: "PmWorkPiece",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<long>(
                name: "AssignedDeveloperId",
                table: "PmProducts",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<int>(
                name: "StateType",
                table: "PmProductionState",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "PmProductionState",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_PmProductionState_PmProducts_ProductId",
                table: "PmProductionState",
                column: "ProductId",
                principalTable: "PmProducts",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PmProducts_AbpUsers_AssignedDeveloperId",
                table: "PmProducts",
                column: "AssignedDeveloperId",
                principalTable: "AbpUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PmWorkPiece_PmMaterialGroup_MaterialGroupId",
                table: "PmWorkPiece",
                column: "MaterialGroupId",
                principalTable: "PmMaterialGroup",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PmWorkPiece_PmProducts_ProductId",
                table: "PmWorkPiece",
                column: "ProductId",
                principalTable: "PmProducts",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PmWorkPiece_PmSurfaceFinish_SurfaceFinishId",
                table: "PmWorkPiece",
                column: "SurfaceFinishId",
                principalTable: "PmSurfaceFinish",
                principalColumn: "Id");
        }
    }
}
