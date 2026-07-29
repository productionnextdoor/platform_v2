using System;
using System.Collections.Generic;
using System.Linq;
using PMHelmutSchmidtPortal.Authorization.Roles;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.EntityFrameworkCore;
using PMHelmutSchmidtPortal.HSUPortal.Products;

namespace PMHelmutSchmidtPortal.Migrations.Seed.HSU.InitialCreators;

public class InitialProductCreator
{
    private readonly PMHelmutSchmidtPortalDbContext _context;
    private readonly Random _randomizer;


    public InitialProductCreator(PMHelmutSchmidtPortalDbContext context)
    {
        _context = context;
        _randomizer = new Random();
    }

    public void Create()
    {
        CreateProducts();
        AssignDeveloperToProducts();
    }

    private void CreateProducts()
    {
        List<ProductState> productStates = new() { ProductState.Draft, ProductState.InProcessDeveloper };
        Role devRole = _context.Roles.FirstOrDefault(role => role.Name == StaticRoleNames.Host.Developer);
        List<User> devUsers = _context.Users.Where(u => u.Roles.Any(r => r.RoleId == devRole.Id)).ToList();

        for (int i = 1; i <= 35; i++)
        {
            string productName = $"Product {i}";
            if (_context.Products.Any(p => p.Name == productName)) continue;

            ProductState randomState = productStates[_randomizer.Next(productStates.Count)];
            _context.Products.Add(
                new Product
                {
                    Name = productName,
                    DescriptionForDev = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam rutrum neque in enim facilisis, " +
                                        "ac venenatis libero finibus. In faucibus suscipit nisi, vitae sodales purus aliquet eget.",
                    State = randomState,
                    AssignedDeveloper = devUsers[_randomizer.Next(devUsers.Count)]
                });
        }

        _context.SaveChanges();
    }

    private void AssignDeveloperToProducts()
    {
        Role devRole = _context.Roles.FirstOrDefault(role => role.Name == StaticRoleNames.Host.Developer);
        List<User> devUsers = _context.Users.Where(u => u.Roles.Any(r => r.RoleId == devRole.Id)).ToList();
        List<Product> unassignedProducts = _context.Products.Where(p => p.AssignedDeveloper == null).ToList();

        foreach (Product product in unassignedProducts)
        {
            product.AssignedDeveloper = devUsers[_randomizer.Next(devUsers.Count)];
            _context.Products.Update(product);
        }

        _context.SaveChanges();
    }
}