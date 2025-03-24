using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMHelmutSchmidtPortal.Migrations
{
    /// <inheritdoc />
    public partial class RemoveSurfaces : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("UPDATE PmWorkPiece SET SurfaceFinishId = NULL;");
            migrationBuilder.Sql("DELETE FROM dbo.PmSurfaceFinish; DBCC CHECKIDENT('dbo.PmProducerRating', RESEED, 1);" );   
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //This is ireversable migration
        }
    }
}
