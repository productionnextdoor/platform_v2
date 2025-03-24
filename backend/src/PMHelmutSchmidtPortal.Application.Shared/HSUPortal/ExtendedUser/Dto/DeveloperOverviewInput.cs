using Abp.Extensions;
using Abp.Runtime.Validation;
using PMHelmutSchmidtPortal.Dto;

namespace PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto
{
    public class DeveloperOverviewInput: PagedSortedAndFilteredInputDto, IShouldNormalize
    {
        public void Normalize()
        {
            if (Sorting.IsNullOrEmpty())
            {
                Sorting = "Name ASC";
            }
        }
    }
}