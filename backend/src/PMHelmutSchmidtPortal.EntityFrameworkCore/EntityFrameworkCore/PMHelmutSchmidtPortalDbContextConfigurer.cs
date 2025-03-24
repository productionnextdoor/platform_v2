using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace PMHelmutSchmidtPortal.EntityFrameworkCore
{
    public static class PMHelmutSchmidtPortalDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<PMHelmutSchmidtPortalDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<PMHelmutSchmidtPortalDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}