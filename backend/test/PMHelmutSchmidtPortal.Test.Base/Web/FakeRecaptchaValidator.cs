using System.Threading.Tasks;
using PMHelmutSchmidtPortal.Security.Recaptcha;

namespace PMHelmutSchmidtPortal.Test.Base.Web
{
    public class FakeRecaptchaValidator : IRecaptchaValidator
    {
        public Task ValidateAsync(string captchaResponse)
        {
            return Task.CompletedTask;
        }
    }
}
