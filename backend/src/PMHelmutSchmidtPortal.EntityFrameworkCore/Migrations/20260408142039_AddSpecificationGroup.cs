using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMHelmutSchmidtPortal.Migrations
{
    /// <inheritdoc />
    public partial class AddSpecificationGroup : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SpecificationGroupId",
                table: "PmSpecification",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "PmSpecificationGroup",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    MaterialGroupId = table.Column<int>(type: "int", nullable: false),
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
                    table.PrimaryKey("PK_PmSpecificationGroup", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PmSpecificationGroup_PmMaterialGroup_MaterialGroupId",
                        column: x => x.MaterialGroupId,
                        principalTable: "PmMaterialGroup",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PmSpecification_SpecificationGroupId",
                table: "PmSpecification",
                column: "SpecificationGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_PmSpecificationGroup_MaterialGroupId",
                table: "PmSpecificationGroup",
                column: "MaterialGroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_PmSpecification_PmSpecificationGroup_SpecificationGroupId",
                table: "PmSpecification",
                column: "SpecificationGroupId",
                principalTable: "PmSpecificationGroup",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PmSpecification_PmSpecificationGroup_SpecificationGroupId",
                table: "PmSpecification");

            migrationBuilder.DropTable(
                name: "PmSpecificationGroup");

            migrationBuilder.DropIndex(
                name: "IX_PmSpecification_SpecificationGroupId",
                table: "PmSpecification");

            migrationBuilder.DropColumn(
                name: "SpecificationGroupId",
                table: "PmSpecification");
        }
    }
}
