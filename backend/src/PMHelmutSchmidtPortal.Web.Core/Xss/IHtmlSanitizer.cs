using Abp.Dependency;

namespace PMHelmutSchmidtPortal.Web.Xss
{
    public interface IHtmlSanitizer: ITransientDependency
    {
        string Sanitize(string html);
    }
}