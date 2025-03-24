using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace PMHelmutSchmidtPortal.HSUPortal.Statistics.Dto
{
    public class StatisticsInputDto: IValidatableObject
    {
        [Required]
        public StatisticsDataType DataType { get; set; }
        
        [StringLength(200)]
        public string FilterVar { get; set; }
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
        
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (DateFrom.HasValue && DateTo.HasValue && DateFrom.Value.CompareTo(DateTo.Value) > 0 )
            {
                yield return new ValidationResult(
                    "DateFrom can't be later than DateTo",
                    new[] { "DateTo" }
                );
            }
        }
    }
}