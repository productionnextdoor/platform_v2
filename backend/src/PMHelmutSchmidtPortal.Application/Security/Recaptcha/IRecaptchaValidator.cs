using System.Threading.Tasks;

namespace PMHelmutSchmidtPortal.Security.Recaptcha
{
    public interface IRecaptchaValidator
    {
        Task ValidateAsync(string captchaResponse);
    }
}