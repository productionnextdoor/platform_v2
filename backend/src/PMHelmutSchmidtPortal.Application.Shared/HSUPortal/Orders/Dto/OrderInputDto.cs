using Abp.Extensions;
using Abp.Runtime.Validation;
using PMHelmutSchmidtPortal.Dto;

namespace PMHelmutSchmidtPortal.HSUPortal.Orders.Dto
{
    public class OrderInputDto : PagedSortedAndFilteredInputDto, IShouldNormalize
    {
        public void Normalize()
        {
            if (Sorting.IsNullOrEmpty())
            {
                Sorting = "orderDate ASC";
            }
        }
    }
}