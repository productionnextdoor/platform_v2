namespace PMHelmutSchmidtPortal.HSUPortal.ShopImportExport;

public class RequestTokenDto
{
    public string GrantType { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    public string ClientId { get; set; }
    public string ClientSecret { get; set; }
}
