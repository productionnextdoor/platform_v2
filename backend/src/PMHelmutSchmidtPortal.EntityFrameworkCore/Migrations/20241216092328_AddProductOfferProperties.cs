using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMHelmutSchmidtPortal.Migrations
{
    /// <inheritdoc />
    public partial class AddProductOfferProperties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "OfferDeadline",
                table: "PmProducts",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ProductionDeadLine",
                table: "PmProducts",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "PmProducts",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OfferDeadline",
                table: "PmProducts");

            migrationBuilder.DropColumn(
                name: "ProductionDeadLine",
                table: "PmProducts");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "PmProducts");
        }
    }
}
