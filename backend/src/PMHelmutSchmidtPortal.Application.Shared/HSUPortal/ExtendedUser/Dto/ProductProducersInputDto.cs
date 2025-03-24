using System.ComponentModel.DataAnnotations;
using Abp.Extensions;
using Abp.Runtime.Validation;
using PMHelmutSchmidtPortal.Dto;

namespace PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto
{
    public class ProductProducersInputDto : PagedAndSortedInputDto, IShouldNormalize
    {
        [Required]
        [Range(1, long.MaxValue)]
        public int ProductId { get; set; }
        
        [Required]
        [Range(1, long.MaxValue)]
        public int ProductionDetailsId { get; set; }
        
        public void Normalize()
        {
            if (Sorting.IsNullOrEmpty())
            {
                Sorting = "status ASC";
            }
        }
    }
}