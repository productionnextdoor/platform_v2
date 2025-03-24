using System;
using Abp.Application.Services.Dto;

namespace PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto
{
    public class ProductProducerOutput
    {
        public DateTime? ProcessingDeadline { get; set; }
        public PagedResultDto<ProductProducerListDto> Producers { get; set; }
    }
}
