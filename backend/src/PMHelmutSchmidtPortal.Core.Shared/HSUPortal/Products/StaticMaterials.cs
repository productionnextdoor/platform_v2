namespace PMHelmutSchmidtPortal.HSUPortal.Products;

public class StaticMaterials
{
    public static class Groups
    {
        public const string Wood = "Wood";
            
        public const string Metal = "Metal";
        
        public const string Glass = "Glass";

    }
    
    public static class Surfaces
    {
         public static class Wood
         {
             public const string Oiled = "Oiled";
             public const string Waxed = "Waxed";
             public const string Painted = "Painted";
             public const string Glazed = "Glazed";
             public const string Stained = "Stained";
             public const string Veneered = "Veneered";
             public const string SolidColored  = "SolidColored";
             public const string Coated = "Coated";
             public const string WithPrimerFilm = "WithPrimerFilm";
         }

         public static class Metal
         {
             public const string Polished = "Polished";
             public const string Matt = "Matt";
             public const string Brushed = "Brushed";
             public const string Coated = "Coated";
         }
         
         public static class Glass
         {
             public const string Smooth = "Smooth";
             public const string Painted = "Painted";
             public const string Etched = "Etched";
             public const string Sandblasted = "Sandblasted";
             public const string Sanded = "Sanded";
         }
    }
}