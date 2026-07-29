using System.Text;
using System.Threading.Tasks;
using Abp.Extensions;
using Abp.Net.Mail;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto;
using PMHelmutSchmidtPortal.Net.Emailing;
using PMHelmutSchmidtPortal.Url;

namespace PMHelmutSchmidtPortal.HSUPortal.Products;

public class ProductEmailer : BaseEmailer, IProductEmailer
{

    private readonly IWebUrlService _webUrlService;

    public ProductEmailer(
        IWebUrlService webUrlService,
        IEmailTemplateProvider emailTemplateProvider, 
        IEmailSender emailSender) : base(emailTemplateProvider,emailSender)
    {
        _webUrlService = webUrlService;
    }

    public async Task SendNewProductNotificationToDeveloper(User user, Product product)
    {
        StringBuilder emailTemplate = GetTemplateWithTitle(
            L("ProductEmail.NewProductNotificationToDeveloper.Title"),
            L("ProductEmail.NewProductNotificationToDeveloper.ButtonText"),
            _webUrlService.GetSiteRootAddress().EnsureEndsWith('/') + "products" 
        );

        StringBuilder mailMessage = new();


        mailMessage.AppendLine(L("ProductEmail.NewProductNotificationToDeveloper.Introduction") + " " + user.Name + ",<br /><br />");
        mailMessage.AppendLine(L("ProductEmail.NewProductNotificationToDeveloper.BodyText", product.Name) + "<br /><br />");

        await ReplaceBodyAndSendAsync(user.EmailAddress, L("ProductEmail.NewProductNotificationToDeveloper.Title"), emailTemplate,
            mailMessage);
    }

    public async Task SendProcessingDeadlineUpdate(ProfileBase producer, ProductListDto product)
    {
        StringBuilder emailTemplate = GetTemplateWithTitle(
            L("ProductEmail.ProcessingDeadlineUpdate.Title"),
            L("ProductEmail.ProcessingDeadlineUpdate.ButtonText"),
            _webUrlService.GetSiteRootAddress().EnsureEndsWith('/') + $"product-details/{product.Id}" 
        );

        StringBuilder mailMessage = new();


        mailMessage.AppendLine(L("ProductEmail.ProcessingDeadlineUpdate.Introduction") + " " + producer.ContactPersonFullName + ",<br /><br />");
        mailMessage.AppendLine(L("ProductEmail.ProcessingDeadlineUpdate.BodyText.P1", product.Name, product.ProcessingDeadline?.ToString("d.MM.yyyy")) + "<br /><br />");
        mailMessage.AppendLine(L("ProductEmail.ProcessingDeadlineUpdate.BodyText.P2", product.Name) + "<br /><br />");

        await ReplaceBodyAndSendAsync(producer.Email, L("ProductEmail.ProcessingDeadlineUpdate.Subject"), emailTemplate,
            mailMessage);
    }

    public async Task SendProductProducerRequest(ProfileBase user, ProductListDto product)
    {
        StringBuilder emailTemplate = GetTemplateWithTitle(
            L("ProductEmail.NewProductNotificationToProducer.Title"),
            L("ProductEmail.NewProductNotificationToProducer.ButtonText"),
            _webUrlService.GetSiteRootAddress().EnsureEndsWith('/') +  $"product-details/{product.Id}"
        );

        StringBuilder mailMessage = new();


        mailMessage.AppendLine(L("ProductEmail.NewProductNotificationToProducer.Introduction") + " " + user.ContactPersonFullName + ",<br /><br />");
        mailMessage.AppendLine(L("ProductEmail.NewProductNotificationToProducer.BodyText", product.Name, product.ProcessingDeadline?.ToString("d.MM.yyyy")) + "<br /><br />");

        await ReplaceBodyAndSendAsync(user.Email, L("ProductEmail.NewProductNotificationToProducer.Title"), emailTemplate,
            mailMessage);
    }
    
}