using System.Linq;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.EntityFrameworkCore;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUsers;
using PMHelmutSchmidtPortal.HSUPortal.Users;

namespace PMHelmutSchmidtPortal.Migrations.Seed.HSU.DefaultCreators;

public class DefaultRatingTypesCreator
{
    private readonly PMHelmutSchmidtPortalDbContext _context;

    public DefaultRatingTypesCreator(PMHelmutSchmidtPortalDbContext context)
    {
        _context = context;
    }
    
    public void Create()
    {
        CreateRatingTypes();
    }

    private void CreateRatingTypes()
    {
        _ = _context.RatingTypes.IgnoreQueryFilters()
            .FirstOrDefault(rt => rt.Name == StaticProducerProfileProperties.ProducerRatings.SocialCommitment) ?? _context.RatingTypes.Add(
            new RatingType
            {
                Name = StaticProducerProfileProperties.ProducerRatings.SocialCommitment

            }).Entity;

        _ = _context.RatingTypes.IgnoreQueryFilters()
            .FirstOrDefault(rt => rt.Name == StaticProducerProfileProperties.ProducerRatings.Sustainability) ?? _context.RatingTypes.Add(
            new RatingType
            {
                Name = StaticProducerProfileProperties.ProducerRatings.Sustainability

            }).Entity;

        _ = _context.RatingTypes.IgnoreQueryFilters()
            .FirstOrDefault(rt => rt.Name == StaticProducerProfileProperties.ProducerRatings.FamilyFriendly) ?? _context.RatingTypes.Add(
            new RatingType
            {
                Name = StaticProducerProfileProperties.ProducerRatings.FamilyFriendly

            }).Entity;

        _context.SaveChanges();
    }
}