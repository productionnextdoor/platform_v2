using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMHelmutSchmidtPortal.Migrations
{
    /// <inheritdoc />
    public partial class MoveProcessingDeadLine : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProcessingDeadline",
                table: "PmProductProducer");

            migrationBuilder.AddColumn<DateTime>(
                name: "ProcessingDeadline",
                table: "PmProducts",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProcessingDeadline",
                table: "PmProducts");

            migrationBuilder.AddColumn<DateTime>(
                name: "ProcessingDeadline",
                table: "PmProductProducer",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
