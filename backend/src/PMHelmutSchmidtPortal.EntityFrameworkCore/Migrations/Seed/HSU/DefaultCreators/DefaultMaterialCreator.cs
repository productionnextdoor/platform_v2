using System.Collections.Generic;
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

    public void Create(bool createSurfaces = true)
    {
        CreateMaterialGroups(createSurfaces);
    }

    private void CreateMaterialGroups(bool createSurfaces)
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
        
        MaterialGroup other = _context.MaterialGroups.IgnoreQueryFilters()
            .FirstOrDefault(mg => mg.Name == StaticMaterials.Groups.Other);
        if (other == null)
        {
            other = _context.MaterialGroups.Add(
                new MaterialGroup()
                {
                    Name = StaticMaterials.Groups.Other
                }
            ).Entity;
            _context.SaveChanges();
        }

        if (!createSurfaces)
        {
            return;
        }
        
        CreateGlassSurfaces(glass);
        CreateMetalSurfaces(metal);
        CreateWoodSurfaces(wood);
    }

    private void CreateGlassSurfaces(MaterialGroup glass)
    {
        SurfaceFinish smooth = _context.SurfaceFinishes
            .IgnoreQueryFilters()
            .FirstOrDefault(surf => surf.Name == StaticMaterials.Surfaces.Glass.Smooth);
        if (smooth == null)
        {
            _context.SurfaceFinishes.Add(
                new SurfaceFinish()
                {
                    Name = StaticMaterials.Surfaces.Glass.Smooth,
                    MaterialGroup = glass
                }
            );
        }

        SurfaceFinish painted = _context.SurfaceFinishes
            .IgnoreQueryFilters()
            .FirstOrDefault(surf => surf.Name == StaticMaterials.Surfaces.Glass.Painted);
        if (painted == null)
        {
            _context.SurfaceFinishes.Add(
                new SurfaceFinish()
                {
                    Name = StaticMaterials.Surfaces.Glass.Painted,
                    MaterialGroup = glass
                }
            );
        }

        SurfaceFinish etched = _context.SurfaceFinishes
            .IgnoreQueryFilters()
            .FirstOrDefault(surf => surf.Name == StaticMaterials.Surfaces.Glass.Etched);
        if (etched == null)
        {
            _context.SurfaceFinishes.Add(
                new SurfaceFinish()
                {
                    Name = StaticMaterials.Surfaces.Glass.Etched,
                    MaterialGroup = glass
                }
            );
        }

        SurfaceFinish sandblasted = _context.SurfaceFinishes
            .IgnoreQueryFilters()
            .FirstOrDefault(surf => surf.Name == StaticMaterials.Surfaces.Glass.Sandblasted);
        if (sandblasted == null)
        {
            _context.SurfaceFinishes.Add(
                new SurfaceFinish()
                {
                    Name = StaticMaterials.Surfaces.Glass.Sandblasted,
                    MaterialGroup = glass
                }
            );
        }

        SurfaceFinish sanded = _context.SurfaceFinishes
            .IgnoreQueryFilters()
            .FirstOrDefault(surf => surf.Name == StaticMaterials.Surfaces.Glass.Sanded);
        if (sanded == null)
        {
            _context.SurfaceFinishes.Add(
                new SurfaceFinish()
                {
                    Name = StaticMaterials.Surfaces.Glass.Sanded,
                    MaterialGroup = glass
                }
            );
        }

        _context.SaveChanges();
    }

    private void CreateMetalSurfaces(MaterialGroup metal)
    {
        SurfaceFinish brushed = _context.SurfaceFinishes
            .IgnoreQueryFilters()
            .FirstOrDefault(surf => surf.Name == StaticMaterials.Surfaces.Metal.Brushed);
        if (brushed == null)
        {
            _context.SurfaceFinishes.Add(
                new SurfaceFinish()
                {
                    Name = StaticMaterials.Surfaces.Metal.Brushed,
                    MaterialGroup = metal
                }
            );
        }

        SurfaceFinish polished = _context.SurfaceFinishes
            .IgnoreQueryFilters()
            .FirstOrDefault(surf => surf.Name == StaticMaterials.Surfaces.Metal.Polished);
        if (polished == null)
        {
            _context.SurfaceFinishes.Add(
                new SurfaceFinish()
                {
                    Name = StaticMaterials.Surfaces.Metal.Polished,
                    MaterialGroup = metal
                }
            );
        }

        SurfaceFinish coated = _context.SurfaceFinishes
            .IgnoreQueryFilters()
            .FirstOrDefault(surf => surf.Name == StaticMaterials.Surfaces.Metal.Coated);
        if (coated == null)
        {
            _context.SurfaceFinishes.Add(
                new SurfaceFinish()
                {
                    Name = StaticMaterials.Surfaces.Metal.Coated,
                    MaterialGroup = metal
                }
            );
        }

        SurfaceFinish matt = _context.SurfaceFinishes
            .IgnoreQueryFilters()
            .FirstOrDefault(surf => surf.Name == StaticMaterials.Surfaces.Metal.Matt);
        if (matt == null)
        {
            _context.SurfaceFinishes.Add(
                new SurfaceFinish()
                {
                    Name = StaticMaterials.Surfaces.Metal.Matt,
                    MaterialGroup = metal
                }
            );
        }

        _context.SaveChanges();
    }

    private void CreateWoodSurfaces(MaterialGroup wood)
    {
        SurfaceFinish painted = _context.SurfaceFinishes
            .IgnoreQueryFilters()
            .FirstOrDefault(surf => surf.Name == StaticMaterials.Surfaces.Wood.Painted);
        if (painted == null)
        {
            _context.SurfaceFinishes.Add(
                new SurfaceFinish()
                {
                    Name = StaticMaterials.Surfaces.Wood.Painted,
                    MaterialGroup = wood
                }
            );
        }

        SurfaceFinish coated = _context.SurfaceFinishes
            .IgnoreQueryFilters()
            .FirstOrDefault(surf => surf.Name == StaticMaterials.Surfaces.Wood.Coated);
        if (coated == null)
        {
            _context.SurfaceFinishes.Add(
                new SurfaceFinish()
                {
                    Name = StaticMaterials.Surfaces.Wood.Coated,
                    MaterialGroup = wood
                }
            );
        }

        SurfaceFinish waxed = _context.SurfaceFinishes
            .IgnoreQueryFilters()
            .FirstOrDefault(surf => surf.Name == StaticMaterials.Surfaces.Wood.Waxed);
        if (waxed == null)
        {
            _context.SurfaceFinishes.Add(
                new SurfaceFinish()
                {
                    Name = StaticMaterials.Surfaces.Wood.Waxed,
                    MaterialGroup = wood
                }
            );
        }

        SurfaceFinish veneered = _context.SurfaceFinishes
            .IgnoreQueryFilters()
            .FirstOrDefault(surf => surf.Name == StaticMaterials.Surfaces.Wood.Veneered);
        if (veneered == null)
        {
            _context.SurfaceFinishes.Add(
                new SurfaceFinish()
                {
                    Name = StaticMaterials.Surfaces.Wood.Veneered,
                    MaterialGroup = wood
                }
            );
        }

        SurfaceFinish solidColored = _context.SurfaceFinishes
            .IgnoreQueryFilters()
            .FirstOrDefault(surf => surf.Name == StaticMaterials.Surfaces.Wood.SolidColored);
        if (solidColored == null)
        {
            _context.SurfaceFinishes.Add(
                new SurfaceFinish()
                {
                    Name = StaticMaterials.Surfaces.Wood.SolidColored,
                    MaterialGroup = wood
                }
            );
        }

        SurfaceFinish glazed = _context.SurfaceFinishes
            .IgnoreQueryFilters()
            .FirstOrDefault(surf => surf.Name == StaticMaterials.Surfaces.Wood.Glazed);
        if (glazed == null)
        {
            _context.SurfaceFinishes.Add(
                new SurfaceFinish()
                {
                    Name = StaticMaterials.Surfaces.Wood.Glazed,
                    MaterialGroup = wood
                }
            );
        }

        SurfaceFinish oiled = _context.SurfaceFinishes
            .IgnoreQueryFilters()
            .FirstOrDefault(surf => surf.Name == StaticMaterials.Surfaces.Wood.Oiled);
        if (oiled == null)
        {
            _context.SurfaceFinishes.Add(
                new SurfaceFinish()
                {
                    Name = StaticMaterials.Surfaces.Wood.Oiled,
                    MaterialGroup = wood
                }
            );
        }

        SurfaceFinish stained = _context.SurfaceFinishes
            .IgnoreQueryFilters()
            .FirstOrDefault(surf => surf.Name == StaticMaterials.Surfaces.Wood.Stained);
        if (stained == null)
        {
            _context.SurfaceFinishes.Add(
                new SurfaceFinish()
                {
                    Name = StaticMaterials.Surfaces.Wood.Stained,
                    MaterialGroup = wood
                }
            );
        }

        SurfaceFinish withPrimerFilm = _context.SurfaceFinishes
            .IgnoreQueryFilters()
            .FirstOrDefault(surf => surf.Name == StaticMaterials.Surfaces.Wood.WithPrimerFilm);
        if (withPrimerFilm == null)
        {
            _context.SurfaceFinishes.Add(
                new SurfaceFinish()
                {
                    Name = StaticMaterials.Surfaces.Wood.WithPrimerFilm,
                    MaterialGroup = wood
                }
            );
        }

        _context.SaveChanges();
    }
}
