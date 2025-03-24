using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Details;

[Table("PmWizardStep")]
public class WizardStep: Entity<int>
{
    public WizardStepType WizardStepType { get; set; }
    public Product Product { get; set; }
}