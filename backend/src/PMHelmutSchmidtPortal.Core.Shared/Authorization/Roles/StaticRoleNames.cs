namespace PMHelmutSchmidtPortal.Authorization.Roles
{
    public static class StaticRoleNames
    {
        public static class Host
        {
            public const string Admin = "Admin";
            
            public const string PlatformAdmin = "PlatformAdmin";
            
            public const string Producer = "Producer";

            public const string Developer = "Developer";

        }

        public static class Tenants
        {
            public const string Admin = "Admin";

            public const string User = "User";
        }
    }
}