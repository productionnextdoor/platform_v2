using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMHelmutSchmidtPortal.Migrations
{
    /// <inheritdoc />
    public partial class RenameSurfaceFinishToSpecification : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PmWorkPiece_PmSurfaceFinish_SurfaceFinishId",
                table: "PmWorkPiece");

            migrationBuilder.DropForeignKey(
                name: "FK_PmSurfaceFinish_PmMaterialGroup_MaterialGroupId",
                table: "PmSurfaceFinish");

            migrationBuilder.RenameTable(
                name: "PmSurfaceFinish",
                newName: "PmSpecification");

            migrationBuilder.RenameColumn(
                name: "SurfaceFinishId",
                table: "PmWorkPiece",
                newName: "SpecificationId");

            migrationBuilder.RenameIndex(
                name: "IX_PmWorkPiece_SurfaceFinishId",
                table: "PmWorkPiece",
                newName: "IX_PmWorkPiece_SpecificationId");

            migrationBuilder.RenameIndex(
                name: "IX_PmSurfaceFinish_MaterialGroupId",
                table: "PmSpecification",
                newName: "IX_PmSpecification_MaterialGroupId");

            migrationBuilder.RenameIndex(
                name: "PK_PmSurfaceFinish",
                table: "PmSpecification",
                newName: "PK_PmSpecification");

            migrationBuilder.AddForeignKey(
                name: "FK_PmSpecification_PmMaterialGroup_MaterialGroupId",
                table: "PmSpecification",
                column: "MaterialGroupId",
                principalTable: "PmMaterialGroup",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PmWorkPiece_PmSpecification_SpecificationId",
                table: "PmWorkPiece",
                column: "SpecificationId",
                principalTable: "PmSpecification",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PmWorkPiece_PmSpecification_SpecificationId",
                table: "PmWorkPiece");

            migrationBuilder.DropForeignKey(
                name: "FK_PmSpecification_PmMaterialGroup_MaterialGroupId",
                table: "PmSpecification");

            migrationBuilder.RenameIndex(
                name: "PK_PmSpecification",
                table: "PmSpecification",
                newName: "PK_PmSurfaceFinish");

            migrationBuilder.RenameIndex(
                name: "IX_PmSpecification_MaterialGroupId",
                table: "PmSpecification",
                newName: "IX_PmSurfaceFinish_MaterialGroupId");

            migrationBuilder.RenameTable(
                name: "PmSpecification",
                newName: "PmSurfaceFinish");

            migrationBuilder.RenameColumn(
                name: "SpecificationId",
                table: "PmWorkPiece",
                newName: "SurfaceFinishId");

            migrationBuilder.RenameIndex(
                name: "IX_PmWorkPiece_SpecificationId",
                table: "PmWorkPiece",
                newName: "IX_PmWorkPiece_SurfaceFinishId");

            migrationBuilder.AddForeignKey(
                name: "FK_PmSurfaceFinish_PmMaterialGroup_MaterialGroupId",
                table: "PmSurfaceFinish",
                column: "MaterialGroupId",
                principalTable: "PmMaterialGroup",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PmWorkPiece_PmSurfaceFinish_SurfaceFinishId",
                table: "PmWorkPiece",
                column: "SurfaceFinishId",
                principalTable: "PmSurfaceFinish",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
