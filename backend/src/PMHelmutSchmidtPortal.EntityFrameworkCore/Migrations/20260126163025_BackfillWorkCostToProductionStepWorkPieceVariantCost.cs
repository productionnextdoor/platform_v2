using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PMHelmutSchmidtPortal.Migrations
{
    /// <inheritdoc />
    public partial class BackfillWorkCostToProductionStepWorkPieceVariantCost : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                UPDATE pp
                SET pp.WorkCost = smv.WorkHours * pi.Rate
                FROM PmProductionStepWorkPieceVariantCost pp
                INNER JOIN PmProductionStepMeasurementVariant smv ON pp.MeasurementVariantId = smv.Id
                INNER JOIN PmProducerInfo pi ON pp.ProducerInfoId = pi.Id
                WHERE pp.MeasurementVariantId IS NOT NULL
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
