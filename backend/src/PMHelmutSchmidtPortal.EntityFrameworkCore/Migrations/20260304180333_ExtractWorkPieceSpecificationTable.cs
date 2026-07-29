using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMHelmutSchmidtPortal.Migrations
{
    /// <inheritdoc />
    public partial class ExtractWorkPieceSpecificationTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PmWorkPiece_PmSpecification_SpecificationId",
                table: "PmWorkPiece");

            migrationBuilder.DropIndex(
                name: "IX_PmWorkPiece_SpecificationId",
                table: "PmWorkPiece");

            migrationBuilder.DropColumn(
                name: "SpecificationId",
                table: "PmWorkPiece");

            migrationBuilder.CreateTable(
                name: "PmWorkPieceSpecification",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WorkPieceId = table.Column<int>(type: "int", nullable: false),
                    SpecificationId = table.Column<int>(type: "int", nullable: false),
                    SpecificationName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
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
                    table.PrimaryKey("PK_PmWorkPieceSpecification", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PmWorkPieceSpecification_PmSpecification_SpecificationId",
                        column: x => x.SpecificationId,
                        principalTable: "PmSpecification",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PmWorkPieceSpecification_PmWorkPiece_WorkPieceId",
                        column: x => x.WorkPieceId,
                        principalTable: "PmWorkPiece",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PmWorkPieceSpecification_SpecificationId",
                table: "PmWorkPieceSpecification",
                column: "SpecificationId");

            migrationBuilder.CreateIndex(
                name: "IX_PmWorkPieceSpecification_WorkPieceId",
                table: "PmWorkPieceSpecification",
                column: "WorkPieceId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PmWorkPieceSpecification");

            migrationBuilder.AddColumn<int>(
                name: "SpecificationId",
                table: "PmWorkPiece",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_PmWorkPiece_SpecificationId",
                table: "PmWorkPiece",
                column: "SpecificationId");

            migrationBuilder.AddForeignKey(
                name: "FK_PmWorkPiece_PmSpecification_SpecificationId",
                table: "PmWorkPiece",
                column: "SpecificationId",
                principalTable: "PmSpecification",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
