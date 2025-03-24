using Abp.Extensions;
using Abp.Runtime.Validation;
using PMHelmutSchmidtPortal.Dto;

namespace PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto
{
    public class ProducerOverviewInput : PagedSortedAndFilteredInputDto, IShouldNormalize
    {
        public void Normalize()
        {
            if (Sorting.IsNullOrEmpty())
            {
                Sorting = "status ASC";
            }
        }
    }
}