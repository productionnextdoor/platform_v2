using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMHelmutSchmidtPortal.Migrations
{
    /// <inheritdoc />
    public partial class AddStateLock : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "LockTime",
                table: "PmProductionState",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "LockedByUserId",
                table: "PmProductionState",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PmProductionState_LockedByUserId",
                table: "PmProductionState",
                column: "LockedByUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_PmProductionState_AbpUsers_LockedByUserId",
                table: "PmProductionState",
                column: "LockedByUserId",
                principalTable: "AbpUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PmProductionState_AbpUsers_LockedByUserId",
                table: "PmProductionState");

            migrationBuilder.DropIndex(
                name: "IX_PmProductionState_LockedByUserId",
                table: "PmProductionState");

            migrationBuilder.DropColumn(
                name: "LockTime",
                table: "PmProductionState");

            migrationBuilder.DropColumn(
                name: "LockedByUserId",
                table: "PmProductionState");
        }
    }
}
