using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Extensions;
using Abp.Net.Mail;
using PMHelmutSchmidtPortal.HSUPortal.Users;
using PMHelmutSchmidtPortal.HSUPortal.Utilities;
using PMHelmutSchmidtPortal.Net.Emailing;
using PMHelmutSchmidtPortal.Url;

namespace PMHelmutSchmidtPortal.HSUPortal.ShopOrders;

public class OrderEmailer: BaseEmailer, IOrderEmailer
{
    private readonly IWebUrlService _webUrlService;
    private readonly UserManagerExtended _userManager;
    private readonly CustomConfigService _configService;

    public OrderEmailer(
        IWebUrlService webUrlService,
        IEmailTemplateProvider emailTemplateProvider,
        UserManagerExtended userManager,
        IEmailSender emailSender,
        CustomConfigService configService
    ) : base(emailTemplateProvider,emailSender)
    {
        _webUrlService = webUrlService;
        _userManager = userManager;
        _configService = configService;
    }

    public async Task SendProductionRequestToProducer(string producerName, string producerEmail, string productName, int orderId)
    {
        StringBuilder emailTemplate = GetTemplateWithTitle(
            L("OrderManagement.ProducerRequest.Title"),
            L("OrderManagement.ProducerRequest.ButtonText"),
            _webUrlService.GetSiteRootAddress().EnsureEndsWith('/') + $"order-details/{orderId}" 
        );

        StringBuilder mailMessage = new();

        mailMessage.AppendLine(L("OrderManagement.ProducerRequest.Introduction") + " " + producerName + ",<br /><br />");
        mailMessage.AppendLine(L("OrderManagement.ProducerRequest.BodyText", productName) + "<br /><br />");

        await ReplaceBodyAndSendAsync(producerEmail, L("OrderManagement.ProducerRequest.Subject"), emailTemplate,
            mailMessage);
    }
    
    public async Task SendProductionCommissionedToProducer(string producerName, string producerEmail, string productName, int orderId)
    {
        string translationPrefix = _configService.IsOffer() ? "ProducerOfferCommissioned" : "ProducerCommissioned";
        StringBuilder emailTemplate = GetTemplateWithTitle(
            L($"OrderManagement.{translationPrefix}.Title"),
            L($"OrderManagement.{translationPrefix}.ButtonText"),
            _webUrlService.GetSiteRootAddress().EnsureEndsWith('/') + $"order-details/{orderId}" 
        );

        StringBuilder mailMessage = new();

        mailMessage.AppendLine(L($"OrderManagement.{translationPrefix}.Text", producerName, productName)
            .Replace("\n", "<br />") + "<br /><br />");

        await ReplaceBodyAndSendAsync(producerEmail, L($"OrderManagement.{translationPrefix}.Subject"), emailTemplate,
            mailMessage);
    }
    
    public async Task SendProductNotProducibleToPlatformAdmins(int orderId, string orderNumber, string productName, DateTime orderDate)
    {
        StringBuilder emailTemplate = GetTemplateWithTitle(
            L("OrderManagement.ProductNotProducibleMail.Admin.Title", orderNumber, productName),
            L("OrderManagement.ProductNotProducibleMail.Admin.ButtonText"),
            _webUrlService.GetSiteRootAddress().EnsureEndsWith('/') + $"order-details/{orderId}" 
        );

        StringBuilder mailMessage = new();

        mailMessage.AppendLine(L("OrderManagement.ProductNotProducibleMail.Admin.Introduction") + "<br /><br />");
        mailMessage.AppendLine(L("OrderManagement.ProductNotProducibleMail.Admin.BodyText", orderNumber, productName, orderDate.ToString("dd.MM.yyyy")) + "<br /><br /><br />");
        mailMessage.AppendLine(L("OrderManagement.ProductNotProducibleMail.Admin.Greeting").Replace("\n", "<br />") + "<br /><br />");

        await ReplaceBodyAndSendAsync(null, L("OrderManagement.ProductNotProducibleMail.Admin.Subject", orderNumber, productName), emailTemplate,
            mailMessage, GetPlatformAdminEmails());
    }
    
    public async Task SendOrderCompletedToPlatformAdmins(int orderId, string orderNumber)
    {
        StringBuilder emailTemplate = GetTemplateWithTitle(
            L("OrderManagement.OrderCompleted.Admin.Title", orderNumber),
            L("OrderManagement.OrderCompleted.Admin.ButtonText"),
            _webUrlService.GetSiteRootAddress().EnsureEndsWith('/') + $"order-details/{orderId}" 
        );

        StringBuilder mailMessage = new();

        mailMessage.AppendLine(L("OrderManagement.OrderCompleted.Admin.Introduction") + "<br /><br />");
        mailMessage.AppendLine(L("OrderManagement.OrderCompleted.Admin.BodyText", orderNumber) + "<br /><br /><br />");

        await ReplaceBodyAndSendAsync(null, L("OrderManagement.OrderCompleted.Admin.Subject", orderNumber), emailTemplate,
            mailMessage, GetPlatformAdminEmails());
    }

    private List<string> GetPlatformAdminEmails() => _userManager.GetAllPlatformAdmins().Select(u => u.EmailAddress).ToList();
}