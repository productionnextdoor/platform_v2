using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMHelmutSchmidtPortal.Migrations
{
    /// <inheritdoc />
    public partial class AddValueChainParamToOrder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ValueChainParameterId",
                table: "PmShopOrder",
                type: "int",
                nullable: true,
                defaultValue: null); 

            migrationBuilder.Sql(@"
                                    UPDATE PmShopOrder
                                    SET ValueChainParameterId = (
                                        SELECT TOP 1 Id
                                        FROM PmRatingType
                                        ORDER BY Id
                                    )
                                    WHERE ValueChainParameterId IS NULL
                                ");

            migrationBuilder.AlterColumn<int>(
                name: "ValueChainParameterId",
                table: "PmShopOrder",
                type: "int",
                nullable: false,
                defaultValue: 1);  

            migrationBuilder.CreateIndex(
                name: "IX_PmShopOrder_ValueChainParameterId",
                table: "PmShopOrder",
                column: "ValueChainParameterId");

            migrationBuilder.AddForeignKey(
                name: "FK_PmShopOrder_PmRatingType_ValueChainParameterId",
                table: "PmShopOrder",
                column: "ValueChainParameterId",
                principalTable: "PmRatingType",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PmShopOrder_PmRatingType_ValueChainParameterId",
                table: "PmShopOrder");

            migrationBuilder.DropIndex(
                name: "IX_PmShopOrder_ValueChainParameterId",
                table: "PmShopOrder");

            migrationBuilder.DropColumn(
                name: "ValueChainParameterId",
                table: "PmShopOrder");
        }
    }
}
