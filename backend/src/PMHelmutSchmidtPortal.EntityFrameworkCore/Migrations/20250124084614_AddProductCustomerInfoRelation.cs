using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMHelmutSchmidtPortal.Migrations
{
    /// <inheritdoc />
    public partial class AddProductCustomerInfoRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProductCustomerInfoId",
                table: "PmCustomerInfo",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "PmProductCustomerInfo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    CustomerInfoId = table.Column<int>(type: "int", nullable: true),
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
                    table.PrimaryKey("PK_PmProductCustomerInfo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PmProductCustomerInfo_PmCustomerInfo_CustomerInfoId",
                        column: x => x.CustomerInfoId,
                        principalTable: "PmCustomerInfo",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PmProductCustomerInfo_PmProducts_ProductId",
                        column: x => x.ProductId,
                        principalTable: "PmProducts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PmProductCustomerInfo_CustomerInfoId",
                table: "PmProductCustomerInfo",
                column: "CustomerInfoId",
                unique: true,
                filter: "[CustomerInfoId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_PmProductCustomerInfo_ProductId",
                table: "PmProductCustomerInfo",
                column: "ProductId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PmProductCustomerInfo");

            migrationBuilder.DropColumn(
                name: "ProductCustomerInfoId",
                table: "PmCustomerInfo");
        }
    }
}
