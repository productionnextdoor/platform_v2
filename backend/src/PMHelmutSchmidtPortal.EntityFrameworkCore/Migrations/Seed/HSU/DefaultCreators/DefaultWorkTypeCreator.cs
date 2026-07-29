using System.Linq;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.EntityFrameworkCore;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUsers;
using PMHelmutSchmidtPortal.HSUPortal.Users;

namespace PMHelmutSchmidtPortal.Migrations.Seed.HSU.DefaultCreators;

public class DefaultWorkTypeCreator
{
    private readonly PMHelmutSchmidtPortalDbContext _context;

    public DefaultWorkTypeCreator(PMHelmutSchmidtPortalDbContext context)
    {
        _context = context;
    }
    
    public void Create()
    {
        CreateWorkTypes();
    }

    private void CreateWorkTypes()
    {
        _ = _context.WorkTypes.IgnoreQueryFilters()
            .FirstOrDefault(wt => wt.Name == StaticProducerProfileProperties.ProducerTrades.Carpentry) ?? _context.WorkTypes.Add(
            new TradeType
            {
                Name = StaticProducerProfileProperties.ProducerTrades.Carpentry

            }).Entity;
        
        _ = _context.WorkTypes.IgnoreQueryFilters()
            .FirstOrDefault(wt => wt.Name == StaticProducerProfileProperties.ProducerTrades.GlassWork) ?? _context.WorkTypes.Add(
            new TradeType
            {
                Name = StaticProducerProfileProperties.ProducerTrades.GlassWork

            }).Entity;
        
        _ = _context.WorkTypes.IgnoreQueryFilters()
            .FirstOrDefault(wt => wt.Name == StaticProducerProfileProperties.ProducerTrades.MetalWork) ?? _context.WorkTypes.Add(
            new TradeType
            {
                Name = StaticProducerProfileProperties.ProducerTrades.MetalWork

            }).Entity;

        _context.SaveChanges();
    }
}