using System.ComponentModel.DataAnnotations;
using Abp.Extensions;
using Abp.Runtime.Validation;
using PMHelmutSchmidtPortal.Dto;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Dto
{
    public class ProductInputDto : PagedSortedAndFilteredInputDto, IShouldNormalize
    {
        [EnumDataType(typeof(ProductState))] 
        public ProductState? State { get; set; }

        public void Normalize()
        {
            if (Sorting.IsNullOrEmpty())
            {
                Sorting = "ProductNumber ASC";
            }
        }
    }
}