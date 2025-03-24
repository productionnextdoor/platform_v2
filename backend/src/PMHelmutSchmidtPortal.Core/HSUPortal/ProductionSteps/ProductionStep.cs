using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using PMHelmutSchmidtPortal.HSUPortal.Products;
using PMHelmutSchmidtPortal.HSUPortal.Products.Details;
using PMHelmutSchmidtPortal.HSUPortal.Users;

namespace PMHelmutSchmidtPortal.HSUPortal.ProductionSteps;

[Table("PmProductionStep")]
public class ProductionStep: FullAuditedEntity
{
    public ProductionDetails ProductionDetails { get; set; }
    public int ProductionDetailsId { get; set; }
    public int ProducerInfoId { get; set; }
    public ProducerInfo ProducerInfo { get; set; }
    public ProductionState StartState { get; set; }
    
    // MSQL can't handle multiple cascading pathes
    // that's why this FK is set to nullable, although there shouldn't be any ProductionStep without StartState
    // in our business logic we make sure, that it's not possible to delete a ProductionState, when there are 
    // referenced ProductionSteps
    // see these Stack Overflow Articles for more information:
    // https://stackoverflow.com/questions/51281497/fk-constraints-may-cause-cycles-or-multiple-cascade-paths
    // https://stackoverflow.com/questions/64987006/ef-core-how-to-allow-multiple-cascade-paths-for-foreign-key-deletion
    public int? StartStateId { get; set; }
    public ProductionState EndState { get; set; }
    
    // MSQL can't handle multiple cascading pathes
    // that's why this FK is set to nullable, although there shouldn't be any ProductionStep without StartState
    // in our business logic we make sure, that it's not possible to delete a ProductionState, when there are 
    // referenced ProductionSteps
    // see these Stack Overflow Articles for more information:
    // https://stackoverflow.com/questions/51281497/fk-constraints-may-cause-cycles-or-multiple-cascade-paths
    // https://stackoverflow.com/questions/64987006/ef-core-how-to-allow-multiple-cascade-paths-for-foreign-key-deletion
    public int? EndStateId { get; set; }
    public ICollection<ProductionStepMeasurementVariant> StepMeasurementVariants { get; set; }
}
