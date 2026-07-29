using System.Linq;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.EntityFrameworkCore;
using PMHelmutSchmidtPortal.HSUPortal.Products;
using PMHelmutSchmidtPortal.HSUPortal.Products.Details;

namespace PMHelmutSchmidtPortal.Migrations.Seed.HSU.DefaultCreators;

public class DefaultMaterialCreator
{
    private readonly PMHelmutSchmidtPortalDbContext _context;

    public DefaultMaterialCreator(PMHelmutSchmidtPortalDbContext context)
    {
        _context = context;
    }

    public void Create()
    {
        CreateMaterialGroups();
    }

    private void CreateMaterialGroups()
    {
        MaterialGroup glass = _context.MaterialGroups.IgnoreQueryFilters()
            .FirstOrDefault(mg => mg.Name == StaticMaterials.Groups.Glass);
        if (glass == null)
        {
            glass = _context.MaterialGroups.Add(
                new MaterialGroup()
                {
                    Name = StaticMaterials.Groups.Glass
                }).Entity;
            _context.SaveChanges();
        }

        CreateGlassSurfaces(glass);

        MaterialGroup metal = _context.MaterialGroups.IgnoreQueryFilters()
            .FirstOrDefault(mg => mg.Name == StaticMaterials.Groups.Metal);
        if (metal == null)
        {
            metal = _context.MaterialGroups.Add(
                new MaterialGroup()
                {
                    Name = StaticMaterials.Groups.Metal
                }).Entity;
            _context.SaveChanges();
        }

        CreateMetalSurfaces(metal);

        MaterialGroup wood = _context.MaterialGroups.IgnoreQueryFilters()
            .FirstOrDefault(mg => mg.Name == StaticMaterials.Groups.Wood);
        if (wood == null)
        {
            wood = _context.MaterialGroups.Add(
                new MaterialGroup()
                {
                    Name = StaticMaterials.Groups.Wood
                }
            ).Entity;
            _context.SaveChanges();
        }

        CreateWoodSurfaces(wood);
    }

    private void CreateGlassSurfaces(MaterialGroup glass)
    {
        CreateSpecificationIfNotExists(StaticMaterials.Surfaces.Glass.Smooth, glass);
        CreateSpecificationIfNotExists(StaticMaterials.Surfaces.Glass.Painted, glass);
        CreateSpecificationIfNotExists(StaticMaterials.Surfaces.Glass.Etched, glass);
        CreateSpecificationIfNotExists(StaticMaterials.Surfaces.Glass.Sandblasted, glass);
        CreateSpecificationIfNotExists(StaticMaterials.Surfaces.Glass.Sanded, glass);
        _context.SaveChanges();
    }

    private void CreateMetalSurfaces(MaterialGroup metal)
    {
        CreateSpecificationIfNotExists(StaticMaterials.Surfaces.Metal.Brushed, metal);
        CreateSpecificationIfNotExists(StaticMaterials.Surfaces.Metal.Polished, metal);
        CreateSpecificationIfNotExists(StaticMaterials.Surfaces.Metal.Coated, metal);
        CreateSpecificationIfNotExists(StaticMaterials.Surfaces.Metal.Matt, metal);
        _context.SaveChanges();
    }

    private void CreateWoodSurfaces(MaterialGroup wood)
    {
        CreateSpecificationIfNotExists(StaticMaterials.Surfaces.Wood.Painted, wood);
        CreateSpecificationIfNotExists(StaticMaterials.Surfaces.Wood.Coated, wood);
        CreateSpecificationIfNotExists(StaticMaterials.Surfaces.Wood.Waxed, wood);
        CreateSpecificationIfNotExists(StaticMaterials.Surfaces.Wood.Veneered, wood);
        CreateSpecificationIfNotExists(StaticMaterials.Surfaces.Wood.SolidColored, wood);
        CreateSpecificationIfNotExists(StaticMaterials.Surfaces.Wood.Glazed, wood);
        CreateSpecificationIfNotExists(StaticMaterials.Surfaces.Wood.Oiled, wood);
        CreateSpecificationIfNotExists(StaticMaterials.Surfaces.Wood.Stained, wood);
        CreateSpecificationIfNotExists(StaticMaterials.Surfaces.Wood.WithPrimerFilm, wood);
        _context.SaveChanges();
    }

    private void CreateSpecificationIfNotExists(string name, MaterialGroup materialGroup)
    {
        bool exists = _context.Specifications
            .IgnoreQueryFilters()
            .Any(s => s.Name == name && s.MaterialGroupId == materialGroup.Id);

        if (!exists)
        {
            _context.Specifications.Add(new Specification
            {
                Name = name,
                MaterialGroup = materialGroup
            });
        }
    }
}