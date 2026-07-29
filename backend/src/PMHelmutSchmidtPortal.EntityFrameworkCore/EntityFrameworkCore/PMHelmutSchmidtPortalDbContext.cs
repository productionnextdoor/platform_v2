using System;
using Abp.Zero.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using PMHelmutSchmidtPortal.Authorization.Delegation;
using PMHelmutSchmidtPortal.Authorization.Roles;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.Chat;
using PMHelmutSchmidtPortal.Editions;
using PMHelmutSchmidtPortal.Friendships;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUsers;
using PMHelmutSchmidtPortal.HSUPortal.ProductCosts;
using PMHelmutSchmidtPortal.HSUPortal.ProductionSteps;
using PMHelmutSchmidtPortal.HSUPortal.Products;
using PMHelmutSchmidtPortal.HSUPortal.Products.Details;
using PMHelmutSchmidtPortal.HSUPortal.ProductVariants;
using PMHelmutSchmidtPortal.HSUPortal.ShopOrders;
using PMHelmutSchmidtPortal.HSUPortal.Users;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning;
using PMHelmutSchmidtPortal.MultiTenancy;
using PMHelmutSchmidtPortal.MultiTenancy.Accounting;
using PMHelmutSchmidtPortal.MultiTenancy.Payments;
using PMHelmutSchmidtPortal.Storage;

namespace PMHelmutSchmidtPortal.EntityFrameworkCore
{
    public class PMHelmutSchmidtPortalDbContext : AbpZeroDbContext<Tenant, Role, User, PMHelmutSchmidtPortalDbContext>
    {
        /* Define an IDbSet for each entity of the application */

        public virtual DbSet<BinaryObject> BinaryObjects { get; set; }

        public virtual DbSet<Friendship> Friendships { get; set; }

        public virtual DbSet<ChatMessage> ChatMessages { get; set; }

        public virtual DbSet<SubscribableEdition> SubscribableEditions { get; set; }

        public virtual DbSet<SubscriptionPayment> SubscriptionPayments { get; set; }

        public virtual DbSet<Invoice> Invoices { get; set; }


        public virtual DbSet<SubscriptionPaymentExtensionData> SubscriptionPaymentExtensionDatas { get; set; }

        public virtual DbSet<UserDelegation> UserDelegations { get; set; }

        public virtual DbSet<RecentPassword> RecentPasswords { get; set; }

        public virtual DbSet<Product> Products { get; set; }

        public virtual DbSet<ProductMeasurement> ProductMeasurements { get; set; }

        public virtual DbSet<MaterialGroup> MaterialGroups { get; set; }

        public virtual DbSet<Specification> Specifications { get; set; }

        public virtual DbSet<SpecificationGroup> SpecificationGroups { get; set; }

        public virtual DbSet<WorkPiece> WorkPieces { get; set; }

        public virtual DbSet<WorkPieceSpecification> WorkPieceSpecifications { get; set; }

        public virtual DbSet<ProductionState> ProductionStates { get; set; }

        public virtual DbSet<WorkPieceVariant> WorkPieceVariants { get; set; }

        public virtual DbSet<ProductFile> ProductFiles { get; set; }

        public virtual DbSet<UserAddress> UserAddresses { get; set; }
        
        public virtual DbSet<ProductProducer> ProductProducer { get; set; }

        public virtual DbSet<ProducerInfo> ProducerInfos { get; set; }
        
        public virtual DbSet<ProducerRating> ProducerRatings { get; set; }
        
        public virtual DbSet<TradeType> WorkTypes { get; set; }
        
        public virtual DbSet<RatingType> RatingTypes { get; set; }

        public virtual DbSet<ProductionStep> ProductionSteps { get; set; }
        
        public virtual DbSet<ProductionStepMeasurementVariant> ProductionStepMeasurementVariants { get; set; }
        
        public virtual DbSet<ProductionStepWorkPieceVariantCost> ProductionStepWorkPieceVariantCosts { get; set; }
        
        public virtual DbSet<ProductionPlan> ProductionPlans { get; set; }
        
        public virtual DbSet<ProductionPlanAction> ProductionPlanActions { get; set; }
        
        public virtual DbSet<ProductionPlanActionPreconditionState> ActionsPreconditionStates { get; set; }
        
        public virtual DbSet<ProductionPlanRating> ProductionPlanRatings { get; set; }
        
        public virtual DbSet<ProductVariant> ProductVariants { get; set; }
        
        public virtual DbSet<ShopOrder> ShopOrders { get; set; }
        
        public virtual DbSet<CustomerInfo> CustomerInfos { get; set; }
        public virtual DbSet<TaxesAndRoyalties> TaxesAndRoyalties { get; set; }
        
        public virtual DbSet<OrderProductionPlan> OrderProductionPlans { get; set; }
        
        public virtual DbSet<OrderProductionPlanAction> OrderProductionPlansActions { get; set; }
        
        public virtual DbSet<OrderDeliveryDocument> OrderDeliveryDocuments { get; set; }
        
        public virtual DbSet<WizardStep> WizardSteps { get; set; }
        
        public virtual DbSet<VariantProductionPlanActionCost> VariantProductionPlanActionCosts { get; set; }
        
        public virtual DbSet<ProductionDetails> ProductionDetails { get; set; }

        public PMHelmutSchmidtPortalDbContext(DbContextOptions<PMHelmutSchmidtPortalDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<BinaryObject>(b => { b.HasIndex(e => new { e.TenantId }); });

            modelBuilder.Entity<ChatMessage>(b =>
            {
                b.HasIndex(e => new { e.TenantId, e.UserId, e.ReadState });
                b.HasIndex(e => new { e.TenantId, e.TargetUserId, e.ReadState });
                b.HasIndex(e => new { e.TargetTenantId, e.TargetUserId, e.ReadState });
                b.HasIndex(e => new { e.TargetTenantId, e.UserId, e.ReadState });
            });

            modelBuilder.Entity<Friendship>(b =>
            {
                b.HasIndex(e => new { e.TenantId, e.UserId });
                b.HasIndex(e => new { e.TenantId, e.FriendUserId });
                b.HasIndex(e => new { e.FriendTenantId, e.UserId });
                b.HasIndex(e => new { e.FriendTenantId, e.FriendUserId });
            });

            modelBuilder.Entity<Tenant>(b =>
            {
                b.HasIndex(e => new { e.SubscriptionEndDateUtc });
                b.HasIndex(e => new { e.CreationTime });
            });

            modelBuilder.Entity<SubscriptionPayment>(b =>
            {
                b.HasIndex(e => new { e.Status, e.CreationTime });
                b.HasIndex(e => new { PaymentId = e.ExternalPaymentId, e.Gateway });
            });

            modelBuilder.Entity<SubscriptionPaymentExtensionData>(b =>
            {
                b.HasQueryFilter(m => !m.IsDeleted)
                    .HasIndex(e => new { e.SubscriptionPaymentId, e.Key, e.IsDeleted })
                    .IsUnique()
                    .HasFilter("[IsDeleted] = 0");
            });

            modelBuilder.Entity<UserDelegation>(b =>
            {
                b.HasIndex(e => new { e.TenantId, e.SourceUserId });
                b.HasIndex(e => new { e.TenantId, e.TargetUserId });
            });

            modelBuilder.Entity<Product>().Property<int>("ProductNumber")
                .IsRequired()
                .ValueGeneratedOnAdd()
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.None);

            modelBuilder.HasSequence<int>("ProductNumberSequence", schema: "dbo")
                .StartsAt(1000000)
                .IncrementsBy(1);

            // Configure ProductNumber to use the sequence
            modelBuilder.Entity<Product>().Property<int>("ProductNumber")
                .HasDefaultValueSql("NEXT VALUE FOR dbo.ProductNumberSequence");

            // Add an index on ProductNumber and ensure it's unique
            modelBuilder.Entity<Product>().HasIndex("ProductNumber").IsUnique();

            // Set the check constraint to limit the range
            modelBuilder.Entity<Product>()
                .ToTable("PmProducts", t =>
                    t.HasCheckConstraint("CK_ProductNumberRange", "[ProductNumber] >= 1000000"));

            modelBuilder.Entity<Product>()
                .Property(e => e.State).HasConversion(
                    v => v.ToString(),
                    v => (ProductState)Enum.Parse(typeof(ProductState), v));

            modelBuilder.Entity<Product>().HasOne(p => p.AssignedDeveloper).WithMany().HasForeignKey(p => p.AssignedDeveloperId).OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<WorkPiece>().HasOne(wp => wp.Product)
                .WithMany(p => p.WorkPieces).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<WorkPiece>().HasOne(wp => wp.MaterialGroup)
                .WithMany().HasForeignKey(wp => wp.MaterialGroupId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<WorkPieceSpecification>().HasOne(wps => wps.WorkPiece)
                .WithMany(wp => wp.WorkPieceSpecifications).HasForeignKey(wps => wps.WorkPieceId).OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<WorkPieceSpecification>().HasOne(wps => wps.Specification)
                .WithMany().HasForeignKey(wps => wps.SpecificationId).OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ProductionState>().HasOne(ps => ps.ProductionDetails)
                .WithMany(p => p.ProductionStates).OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<WorkPieceVariant>().HasOne(wpv => wpv.WorkPiece)
                .WithMany(wp => wp.WorkPieceVariants).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<WorkPieceVariant>().Property(wpv => wpv.Description).IsRequired();
            
            modelBuilder.Entity<ProductionState>()
                .Property(e => e.StateType).HasConversion(
                    v => v.ToString(),
                    v => (ProductionStateType)Enum.Parse(typeof(ProductionStateType), v));

            modelBuilder.Entity<ProductFile>()
                .Property(e => e.FileCategory).HasConversion(
                    v => v.ToString(),
                    v => (ProductFileCategory)Enum.Parse(typeof(ProductFileCategory), v));
            
            modelBuilder.Entity<ProductProducer>()
                .Property(e => e.AssignmentStatus).HasConversion(
                    v => v.ToString(),
                    v => (ProducerAssignmentStatus)Enum.Parse(typeof(ProducerAssignmentStatus), v));

            modelBuilder.Entity<ProducerInfo>().HasIndex("UserId").IsUnique();
            modelBuilder.Entity<UserAddress>().HasIndex("UserId").IsUnique();
            
            modelBuilder.Entity<User>()
                .Property(e => e.Status).HasConversion(
                    v => v.ToString(),
                    v => (UserStatus)Enum.Parse(typeof(UserStatus), v));

            modelBuilder.Entity<ProductionPlanAction>()
                .HasOne(e => e.ProductionStep)
                .WithMany()
                .HasForeignKey(e => e.ProductionStepId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<ProductionPlanActionPreconditionState>()
                .HasOne(e => e.Action)
                .WithMany()
                .HasForeignKey(e => e.ActionId)
                .OnDelete(DeleteBehavior.NoAction);
            
            modelBuilder.Entity<ProductionPlanActionPreconditionState>()
                .HasOne(e => e.State)
                .WithMany()
                .HasForeignKey(e => e.StateId)
                .OnDelete(DeleteBehavior.NoAction);
            
            modelBuilder.Entity<ShopOrder>()
                .Property(e => e.Status).HasConversion(
                    v => v.ToString(),
                    v => (OrderStatus)Enum.Parse(typeof(OrderStatus), v));
            
            modelBuilder.Entity<TaxesAndRoyalties>()
                .Property(e => e.TaxType).HasConversion(
                    v => v.ToString(),
                    v => (TaxType)Enum.Parse(typeof(TaxType), v));
            
            modelBuilder.Entity<ProductVariant>()
                .HasOne(e => e.Tax)
                .WithMany()
                .HasForeignKey(e => e.TaxId)
                .OnDelete(DeleteBehavior.NoAction);
            
            modelBuilder.Entity<ProductVariant>()
                .HasOne(e => e.DeveloperRoyalty)
                .WithMany()
                .HasForeignKey(e => e.DeveloperRoyaltyId)
                .OnDelete(DeleteBehavior.NoAction);
            
            modelBuilder.Entity<ProductVariant>()
                .HasOne(e => e.PlatformRoyalty)
                .WithMany()
                .HasForeignKey(e => e.PlatformRoyaltyId)
                .OnDelete(DeleteBehavior.NoAction);
            
            modelBuilder.Entity<ShopOrder>()
                .HasOne(e => e.ValueChainParameter)
                .WithMany()
                .HasForeignKey(e => e.ValueChainParameterId)
                .OnDelete(DeleteBehavior.NoAction);
            
            modelBuilder.Entity<OrderProductionPlan>()
                .HasOne(e => e.ShopOrder)
                .WithMany(e => e.OrderProductionPlans)
                .HasForeignKey(e => e.ShopOrderId)
                .OnDelete(DeleteBehavior.NoAction);
            
            modelBuilder.Entity<OrderProductionPlan>()
                .HasOne(e => e.ProductionPlan)
                .WithMany()
                .HasForeignKey(e => e.ProductionPlanId)
                .OnDelete(DeleteBehavior.NoAction);
            
            modelBuilder.Entity<OrderProductionPlanAction>()
                .HasOne(e => e.OrderProductionPlan)
                .WithMany(e => e.OrderProductionPlanActions)
                .HasForeignKey(e => e.OrderProductionPlanId)
                .OnDelete(DeleteBehavior.NoAction);
            
            modelBuilder.Entity<OrderProductionPlanAction>()
                .HasOne(e => e.PlanAction)
                .WithMany()
                .HasForeignKey(e => e.PlanActionId)
                .OnDelete(DeleteBehavior.NoAction);
            
            modelBuilder.Entity<OrderProductionPlan>()
                .Property(e => e.ProductionStatus).HasConversion(
                    v => v.ToString(),
                    v => (ProductionStatus)Enum.Parse(typeof(ProductionStatus), v));
            
            modelBuilder.Entity<OrderProductionPlanAction>()
                .Property(e => e.ActionStatus).HasConversion(
                    v => v.ToString(),
                    v => (ActionStatus)Enum.Parse(typeof(ActionStatus), v));

            modelBuilder.Entity<ProductionStepMeasurementVariant>()
                .HasOne(e => e.ProductionStep)
                .WithMany(x => x.StepMeasurementVariants)
                .HasForeignKey(e => e.ProductionStepId)
                .OnDelete(DeleteBehavior.NoAction);
            
            modelBuilder.Entity<ProductionDetails>()
                .Property(e => e.ProductionDetailsType).HasConversion(
                    v => v.ToString(),
                    v => (ProductionDetailsType)Enum.Parse(typeof(ProductionDetailsType), v));
            
            modelBuilder.Entity<WizardStep>()
                .HasKey(ws => ws.Id);
            
            modelBuilder.Entity<WizardStep>()
                .HasOne(ws => ws.Product)
                .WithOne()
                .HasForeignKey<WizardStep>(ws => ws.Id)
                .OnDelete(DeleteBehavior.Cascade);

        }
    }
}
