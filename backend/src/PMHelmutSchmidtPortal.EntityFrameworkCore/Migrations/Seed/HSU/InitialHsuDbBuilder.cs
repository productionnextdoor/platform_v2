using PMHelmutSchmidtPortal.EntityFrameworkCore;
using PMHelmutSchmidtPortal.Migrations.Seed.HSU.InitialCreators;

namespace PMHelmutSchmidtPortal.Migrations.Seed.HSU;

public class InitialHsuDbBuilder
{
    private readonly PMHelmutSchmidtPortalDbContext _context;

    public InitialHsuDbBuilder(PMHelmutSchmidtPortalDbContext context)
    {
        _context = context;
    }

    public void Create()
    {
        new InitialPlatformDeveloperUserCreator(_context).Create();
        new InitialPlatformProducerUserCreator(_context).Create();
        new InitialProductCreator(_context).Create();
        _context.SaveChanges();
    }
}