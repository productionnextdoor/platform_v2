using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMHelmutSchmidtPortal.Migrations
{
    /// <inheritdoc />
    public partial class AddProductMaterials : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PmMaterialGroup",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    table.PrimaryKey("PK_PmMaterialGroup", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PmSurfaceFinish",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    table.PrimaryKey("PK_PmSurfaceFinish", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PmSurfaceFinish_PmMaterialGroup_MaterialGroupId",
                        column: x => x.MaterialGroupId,
                        principalTable: "PmMaterialGroup",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PmWorkPiece",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(type: "int", nullable: true),
                    MaterialGroupId = table.Column<int>(type: "int", nullable: true),
                    SurfaceFinishId = table.Column<int>(type: "int", nullable: true),
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
                    table.PrimaryKey("PK_PmWorkPiece", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PmWorkPiece_PmMaterialGroup_MaterialGroupId",
                        column: x => x.MaterialGroupId,
                        principalTable: "PmMaterialGroup",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PmWorkPiece_PmProducts_ProductId",
                        column: x => x.ProductId,
                        principalTable: "PmProducts",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PmWorkPiece_PmSurfaceFinish_SurfaceFinishId",
                        column: x => x.SurfaceFinishId,
                        principalTable: "PmSurfaceFinish",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PmProductionState",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NextStateId = table.Column<int>(type: "int", nullable: true),
                    WorkPieceId = table.Column<int>(type: "int", nullable: true),
                    ProductId = table.Column<int>(type: "int", nullable: true),
                    StateType = table.Column<int>(type: "int", nullable: false),
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
                    table.PrimaryKey("PK_PmProductionState", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PmProductionState_PmProductionState_NextStateId",
                        column: x => x.NextStateId,
                        principalTable: "PmProductionState",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PmProductionState_PmProducts_ProductId",
                        column: x => x.ProductId,
                        principalTable: "PmProducts",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PmProductionState_PmWorkPiece_WorkPieceId",
                        column: x => x.WorkPieceId,
                        principalTable: "PmWorkPiece",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_PmProductionState_NextStateId",
                table: "PmProductionState",
                column: "NextStateId");

            migrationBuilder.CreateIndex(
                name: "IX_PmProductionState_ProductId",
                table: "PmProductionState",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_PmProductionState_WorkPieceId",
                table: "PmProductionState",
                column: "WorkPieceId");

            migrationBuilder.CreateIndex(
                name: "IX_PmSurfaceFinish_MaterialGroupId",
                table: "PmSurfaceFinish",
                column: "MaterialGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_PmWorkPiece_MaterialGroupId",
                table: "PmWorkPiece",
                column: "MaterialGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_PmWorkPiece_ProductId",
                table: "PmWorkPiece",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_PmWorkPiece_SurfaceFinishId",
                table: "PmWorkPiece",
                column: "SurfaceFinishId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PmProductionState");

            migrationBuilder.DropTable(
                name: "PmWorkPiece");

            migrationBuilder.DropTable(
                name: "PmSurfaceFinish");

            migrationBuilder.DropTable(
                name: "PmMaterialGroup");
        }
    }
}
