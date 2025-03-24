using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMHelmutSchmidtPortal.Migrations
{
    /// <inheritdoc />
    public partial class AddProductNumberGeneration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "dbo");

            migrationBuilder.CreateSequence<int>(
                name: "ProductNumberSequence",
                schema: "dbo",
                startValue: 1000000L);

            migrationBuilder.AlterColumn<int>(
                name: "ProductNumber",
                table: "PmProducts",
                type: "int",
                nullable: false,
                defaultValueSql: "NEXT VALUE FOR dbo.ProductNumberSequence",
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_PmProducts_ProductNumber",
                table: "PmProducts",
                column: "ProductNumber",
                unique: true);

            migrationBuilder.AddCheckConstraint(
                name: "CK_ProductNumberRange",
                table: "PmProducts",
                sql: "[ProductNumber] >= 1000000");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_PmProducts_ProductNumber",
                table: "PmProducts");

            migrationBuilder.DropCheckConstraint(
                name: "CK_ProductNumberRange",
                table: "PmProducts");

            migrationBuilder.DropSequence(
                name: "ProductNumberSequence",
                schema: "dbo");

            migrationBuilder.AlterColumn<int>(
                name: "ProductNumber",
                table: "PmProducts",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldDefaultValueSql: "NEXT VALUE FOR dbo.ProductNumberSequence");
        }
    }
}
