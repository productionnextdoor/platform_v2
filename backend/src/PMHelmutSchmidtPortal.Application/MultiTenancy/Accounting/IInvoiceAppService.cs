using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using PMHelmutSchmidtPortal.MultiTenancy.Accounting.Dto;

namespace PMHelmutSchmidtPortal.MultiTenancy.Accounting
{
    public interface IInvoiceAppService
    {
        Task<InvoiceDto> GetInvoiceInfo(EntityDto<long> input);

        Task CreateInvoice(CreateInvoiceDto input);
    }
}
