using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMHelmutSchmidtPortal.Migrations
{
    /// <inheritdoc />
    public partial class RenameActionPreconditionState : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PmActionPreconditionState_PmProductionPlanAction_ActionId",
                table: "PmActionPreconditionState");

            migrationBuilder.DropForeignKey(
                name: "FK_PmActionPreconditionState_PmProductionPlanAction_ProductionPlanActionId",
                table: "PmActionPreconditionState");

            migrationBuilder.DropForeignKey(
                name: "FK_PmActionPreconditionState_PmProductionState_StateId",
                table: "PmActionPreconditionState");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PmActionPreconditionState",
                table: "PmActionPreconditionState");

            migrationBuilder.RenameTable(
                name: "PmActionPreconditionState",
                newName: "PmProductionPlanActionPreconditionState");

            migrationBuilder.RenameIndex(
                name: "IX_PmActionPreconditionState_StateId",
                table: "PmProductionPlanActionPreconditionState",
                newName: "IX_PmProductionPlanActionPreconditionState_StateId");

            migrationBuilder.RenameIndex(
                name: "IX_PmActionPreconditionState_ProductionPlanActionId",
                table: "PmProductionPlanActionPreconditionState",
                newName: "IX_PmProductionPlanActionPreconditionState_ProductionPlanActionId");

            migrationBuilder.RenameIndex(
                name: "IX_PmActionPreconditionState_ActionId",
                table: "PmProductionPlanActionPreconditionState",
                newName: "IX_PmProductionPlanActionPreconditionState_ActionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PmProductionPlanActionPreconditionState",
                table: "PmProductionPlanActionPreconditionState",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PmProductionPlanActionPreconditionState_PmProductionPlanAction_ActionId",
                table: "PmProductionPlanActionPreconditionState",
                column: "ActionId",
                principalTable: "PmProductionPlanAction",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PmProductionPlanActionPreconditionState_PmProductionPlanAction_ProductionPlanActionId",
                table: "PmProductionPlanActionPreconditionState",
                column: "ProductionPlanActionId",
                principalTable: "PmProductionPlanAction",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PmProductionPlanActionPreconditionState_PmProductionState_StateId",
                table: "PmProductionPlanActionPreconditionState",
                column: "StateId",
                principalTable: "PmProductionState",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PmProductionPlanActionPreconditionState_PmProductionPlanAction_ActionId",
                table: "PmProductionPlanActionPreconditionState");

            migrationBuilder.DropForeignKey(
                name: "FK_PmProductionPlanActionPreconditionState_PmProductionPlanAction_ProductionPlanActionId",
                table: "PmProductionPlanActionPreconditionState");

            migrationBuilder.DropForeignKey(
                name: "FK_PmProductionPlanActionPreconditionState_PmProductionState_StateId",
                table: "PmProductionPlanActionPreconditionState");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PmProductionPlanActionPreconditionState",
                table: "PmProductionPlanActionPreconditionState");

            migrationBuilder.RenameTable(
                name: "PmProductionPlanActionPreconditionState",
                newName: "PmActionPreconditionState");

            migrationBuilder.RenameIndex(
                name: "IX_PmProductionPlanActionPreconditionState_StateId",
                table: "PmActionPreconditionState",
                newName: "IX_PmActionPreconditionState_StateId");

            migrationBuilder.RenameIndex(
                name: "IX_PmProductionPlanActionPreconditionState_ProductionPlanActionId",
                table: "PmActionPreconditionState",
                newName: "IX_PmActionPreconditionState_ProductionPlanActionId");

            migrationBuilder.RenameIndex(
                name: "IX_PmProductionPlanActionPreconditionState_ActionId",
                table: "PmActionPreconditionState",
                newName: "IX_PmActionPreconditionState_ActionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PmActionPreconditionState",
                table: "PmActionPreconditionState",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PmActionPreconditionState_PmProductionPlanAction_ActionId",
                table: "PmActionPreconditionState",
                column: "ActionId",
                principalTable: "PmProductionPlanAction",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PmActionPreconditionState_PmProductionPlanAction_ProductionPlanActionId",
                table: "PmActionPreconditionState",
                column: "ProductionPlanActionId",
                principalTable: "PmProductionPlanAction",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PmActionPreconditionState_PmProductionState_StateId",
                table: "PmActionPreconditionState",
                column: "StateId",
                principalTable: "PmProductionState",
                principalColumn: "Id");
        }
    }
}
