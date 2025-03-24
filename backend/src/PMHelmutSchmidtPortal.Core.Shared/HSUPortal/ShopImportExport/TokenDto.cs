using System;

namespace PMHelmutSchmidtPortal.HSUPortal.ShopImportExport;

public class TokenDto
{
    public string TokenType { get; set; }

    private DateTime _expiresIn;

    public int ExpiresIn
    {
        set => _expiresIn = DateTime.Now.Add(TimeSpan.FromSeconds(value) - TimeSpan.FromSeconds(30));
    }

    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }

    public bool IsTokenValid()
    {
        return _expiresIn > DateTime.Now;
    }
}