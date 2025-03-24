using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMHelmutSchmidtPortal.Migrations
{
    /// <inheritdoc />
    public partial class AlterCustomerInfoShopOrderIdToNullable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PmCustomerInfo_PmShopOrder_ShopOrderId",
                table: "PmCustomerInfo");

            migrationBuilder.DropIndex(
                name: "IX_PmCustomerInfo_ShopOrderId",
                table: "PmCustomerInfo");

            migrationBuilder.AlterColumn<int>(
                name: "ShopOrderId",
                table: "PmCustomerInfo",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_PmCustomerInfo_ShopOrderId",
                table: "PmCustomerInfo",
                column: "ShopOrderId",
                unique: true,
                filter: "[ShopOrderId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_PmCustomerInfo_PmShopOrder_ShopOrderId",
                table: "PmCustomerInfo",
                column: "ShopOrderId",
                principalTable: "PmShopOrder",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PmCustomerInfo_PmShopOrder_ShopOrderId",
                table: "PmCustomerInfo");

            migrationBuilder.DropIndex(
                name: "IX_PmCustomerInfo_ShopOrderId",
                table: "PmCustomerInfo");

            migrationBuilder.AlterColumn<int>(
                name: "ShopOrderId",
                table: "PmCustomerInfo",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PmCustomerInfo_ShopOrderId",
                table: "PmCustomerInfo",
                column: "ShopOrderId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_PmCustomerInfo_PmShopOrder_ShopOrderId",
                table: "PmCustomerInfo",
                column: "ShopOrderId",
                principalTable: "PmShopOrder",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
