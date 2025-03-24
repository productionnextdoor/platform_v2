using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMHelmutSchmidtPortal.Migrations
{
    /// <inheritdoc />
    public partial class RefactorActionPreconditionState : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "StateId",
                table: "PmActionPreconditionState",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ActionId",
                table: "PmActionPreconditionState",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProductionPlanActionId",
                table: "PmActionPreconditionState",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PmActionPreconditionState_ProductionPlanActionId",
                table: "PmActionPreconditionState",
                column: "ProductionPlanActionId");

            migrationBuilder.AddForeignKey(
                name: "FK_PmActionPreconditionState_PmProductionPlanAction_ProductionPlanActionId",
                table: "PmActionPreconditionState",
                column: "ProductionPlanActionId",
                principalTable: "PmProductionPlanAction",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PmActionPreconditionState_PmProductionPlanAction_ProductionPlanActionId",
                table: "PmActionPreconditionState");

            migrationBuilder.DropIndex(
                name: "IX_PmActionPreconditionState_ProductionPlanActionId",
                table: "PmActionPreconditionState");

            migrationBuilder.DropColumn(
                name: "ProductionPlanActionId",
                table: "PmActionPreconditionState");

            migrationBuilder.AlterColumn<int>(
                name: "StateId",
                table: "PmActionPreconditionState",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "ActionId",
                table: "PmActionPreconditionState",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");
        }
    }
}
