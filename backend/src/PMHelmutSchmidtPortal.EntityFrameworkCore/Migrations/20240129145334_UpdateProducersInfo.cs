using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMHelmutSchmidtPortal.Migrations
{
    /// <inheritdoc />
    public partial class UpdateProducersInfo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_PmUserAddress_UserId",
                table: "PmUserAddress");

            migrationBuilder.DropIndex(
                name: "IX_PmProducerInfo_UserId",
                table: "PmProducerInfo");

            migrationBuilder.CreateIndex(
                name: "IX_PmUserAddress_UserId",
                table: "PmUserAddress",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PmProducerInfo_UserId",
                table: "PmProducerInfo",
                column: "UserId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_PmUserAddress_UserId",
                table: "PmUserAddress");

            migrationBuilder.DropIndex(
                name: "IX_PmProducerInfo_UserId",
                table: "PmProducerInfo");

            migrationBuilder.CreateIndex(
                name: "IX_PmUserAddress_UserId",
                table: "PmUserAddress",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_PmProducerInfo_UserId",
                table: "PmProducerInfo",
                column: "UserId");
        }
    }
}
