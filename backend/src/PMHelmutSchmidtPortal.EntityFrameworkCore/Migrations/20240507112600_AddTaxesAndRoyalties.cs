using System;
using System.Linq;
using Microsoft.EntityFrameworkCore.Migrations;
using PMHelmutSchmidtPortal.Migrations.Seed.HSU;

#nullable disable

namespace PMHelmutSchmidtPortal.Migrations
{
    /// <inheritdoc />
    public partial class AddTaxesAndRoyalties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TaxId",
                table: "PmProductVariant",
                type: "int",
                nullable: false,
                defaultValue: DefaultTaxesAndRoyalties.DefaultTax.Id);
            
            migrationBuilder.AddColumn<int>(
                name: "DeveloperRoyaltyId",
                table: "PmProductVariant",
                type: "int",
                nullable: false,
                defaultValue: DefaultTaxesAndRoyalties.DefaultDeveloperRoyalty.Id);

            migrationBuilder.AddColumn<int>(
                name: "PlatformRoyaltyId",
                table: "PmProductVariant",
                type: "int",
                nullable: false,
                defaultValue: DefaultTaxesAndRoyalties.DefaultPlatformRoyalty.Id);

            migrationBuilder.CreateTable(
                name: "PmTaxesAndRoyalties",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    Percentage = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TaxType = table.Column<string>(type: "nvarchar(max)", nullable: false),
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
                    table.PrimaryKey("PK_PmTaxesAndRoyalties", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PmProductVariant_DeveloperRoyaltyId",
                table: "PmProductVariant",
                column: "DeveloperRoyaltyId");

            migrationBuilder.CreateIndex(
                name: "IX_PmProductVariant_PlatformRoyaltyId",
                table: "PmProductVariant",
                column: "PlatformRoyaltyId");

            migrationBuilder.CreateIndex(
                name: "IX_PmProductVariant_TaxId",
                table: "PmProductVariant",
                column: "TaxId");
            
            migrationBuilder.InsertData(
                table: "PmTaxesAndRoyalties",
                columns: new [] {"Id", "IsActive", "Percentage", "TaxType", "CreationTime", "IsDeleted"},
                values: new object[]
                {
                    DefaultTaxesAndRoyalties.DefaultTax.Id,
                    DefaultTaxesAndRoyalties.DefaultTax.IsActive,
                    DefaultTaxesAndRoyalties.DefaultTax.Percentage,
                    DefaultTaxesAndRoyalties.DefaultTax.TaxType.ToString(),
                    DateTime.Now,
                    false
                });
            
            migrationBuilder.InsertData(
                table: "PmTaxesAndRoyalties",
                columns: new [] {"Id", "IsActive", "Percentage", "TaxType", "CreationTime", "IsDeleted"},
                values: new object[]
                {
                    DefaultTaxesAndRoyalties.DefaultDeveloperRoyalty.Id,
                    DefaultTaxesAndRoyalties.DefaultDeveloperRoyalty.IsActive,
                    DefaultTaxesAndRoyalties.DefaultDeveloperRoyalty.Percentage,
                    DefaultTaxesAndRoyalties.DefaultDeveloperRoyalty.TaxType.ToString(),
                    DateTime.Now,
                    false
                });
            
            migrationBuilder.InsertData(
                table: "PmTaxesAndRoyalties",
                columns: new [] {"Id", "IsActive", "Percentage", "TaxType", "CreationTime", "IsDeleted"},
                values: new object[]
                {
                    DefaultTaxesAndRoyalties.DefaultPlatformRoyalty.Id,
                    DefaultTaxesAndRoyalties.DefaultPlatformRoyalty.IsActive,
                    DefaultTaxesAndRoyalties.DefaultPlatformRoyalty.Percentage,
                    DefaultTaxesAndRoyalties.DefaultPlatformRoyalty.TaxType.ToString(),
                    DateTime.Now,
                    false
                });

            migrationBuilder.AddForeignKey(
                name: "FK_PmProductVariant_PmTaxesAndRoyalties_DeveloperRoyaltyId",
                table: "PmProductVariant",
                column: "DeveloperRoyaltyId",
                principalTable: "PmTaxesAndRoyalties",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PmProductVariant_PmTaxesAndRoyalties_PlatformRoyaltyId",
                table: "PmProductVariant",
                column: "PlatformRoyaltyId",
                principalTable: "PmTaxesAndRoyalties",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PmProductVariant_PmTaxesAndRoyalties_TaxId",
                table: "PmProductVariant",
                column: "TaxId",
                principalTable: "PmTaxesAndRoyalties",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PmProductVariant_PmTaxesAndRoyalties_DeveloperRoyaltyId",
                table: "PmProductVariant");

            migrationBuilder.DropForeignKey(
                name: "FK_PmProductVariant_PmTaxesAndRoyalties_PlatformRoyaltyId",
                table: "PmProductVariant");

            migrationBuilder.DropForeignKey(
                name: "FK_PmProductVariant_PmTaxesAndRoyalties_TaxId",
                table: "PmProductVariant");

            migrationBuilder.DropTable(
                name: "PmTaxesAndRoyalties");

            migrationBuilder.DropIndex(
                name: "IX_PmProductVariant_DeveloperRoyaltyId",
                table: "PmProductVariant");

            migrationBuilder.DropIndex(
                name: "IX_PmProductVariant_PlatformRoyaltyId",
                table: "PmProductVariant");

            migrationBuilder.DropIndex(
                name: "IX_PmProductVariant_TaxId",
                table: "PmProductVariant");

            migrationBuilder.DropColumn(
                name: "DeveloperRoyaltyId",
                table: "PmProductVariant");

            migrationBuilder.DropColumn(
                name: "PlatformRoyaltyId",
                table: "PmProductVariant");

            migrationBuilder.DropColumn(
                name: "TaxId",
                table: "PmProductVariant");
        }
    }
}
