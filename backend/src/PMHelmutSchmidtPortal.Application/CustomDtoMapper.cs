using System.Linq;
using Abp.Application.Editions;
using Abp.Application.Features;
using Abp.Auditing;
using Abp.Authorization;
using Abp.Authorization.Users;
using Abp.DynamicEntityProperties;
using Abp.EntityHistory;
using Abp.Extensions;
using Abp.Localization;
using Abp.Notifications;
using Abp.Organizations;
using Abp.UI.Inputs;
using Abp.Webhooks;
using AutoMapper;
using PMHelmutSchmidtPortal.Auditing.Dto;
using PMHelmutSchmidtPortal.Authorization.Accounts.Dto;
using PMHelmutSchmidtPortal.Authorization.Delegation;
using PMHelmutSchmidtPortal.Authorization.Permissions.Dto;
using PMHelmutSchmidtPortal.Authorization.Roles;
using PMHelmutSchmidtPortal.Authorization.Roles.Dto;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.Authorization.Users.Delegation.Dto;
using PMHelmutSchmidtPortal.Authorization.Users.Dto;
using PMHelmutSchmidtPortal.Authorization.Users.Importing.Dto;
using PMHelmutSchmidtPortal.Authorization.Users.Profile.Dto;
using PMHelmutSchmidtPortal.Chat;
using PMHelmutSchmidtPortal.Chat.Dto;
using PMHelmutSchmidtPortal.DynamicEntityProperties.Dto;
using PMHelmutSchmidtPortal.Editions;
using PMHelmutSchmidtPortal.Editions.Dto;
using PMHelmutSchmidtPortal.Friendships;
using PMHelmutSchmidtPortal.Friendships.Cache;
using PMHelmutSchmidtPortal.Friendships.Dto;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto;
using MaterialAdminDto = PMHelmutSchmidtPortal.HSUPortal.Materials.Dto;
using PMHelmutSchmidtPortal.HSUPortal.Orders.Dto;
using PMHelmutSchmidtPortal.HSUPortal.Orders.Dto.Details;
using PMHelmutSchmidtPortal.HSUPortal.ProductionSteps;
using PMHelmutSchmidtPortal.HSUPortal.Products;
using PMHelmutSchmidtPortal.HSUPortal.Products.Details;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.GeneralInfoStep;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.MaterialGroupStep;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductDetailsOverview;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductFilesStep;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductVariantStep;
using PMHelmutSchmidtPortal.HSUPortal.ShopOrders;
using PMHelmutSchmidtPortal.HSUPortal.Users;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ProductionPlan;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ProductionState;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ProductionSteps;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ValueChainPlanner;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Extensions;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.ProductionSteps;
using PMHelmutSchmidtPortal.Localization.Dto;
using PMHelmutSchmidtPortal.MultiTenancy;
using PMHelmutSchmidtPortal.MultiTenancy.Dto;
using PMHelmutSchmidtPortal.MultiTenancy.HostDashboard.Dto;
using PMHelmutSchmidtPortal.MultiTenancy.Payments;
using PMHelmutSchmidtPortal.MultiTenancy.Payments.Dto;
using PMHelmutSchmidtPortal.Notifications.Dto;
using PMHelmutSchmidtPortal.Organizations.Dto;
using PMHelmutSchmidtPortal.Sessions.Dto;
using PMHelmutSchmidtPortal.WebHooks.Dto;

namespace PMHelmutSchmidtPortal;

internal static class CustomDtoMapper
{
    public static void CreateMappings(IMapperConfigurationExpression configuration)
    {
        //Inputs
        configuration.CreateMap<CheckboxInputType, FeatureInputTypeDto>();
        configuration.CreateMap<SingleLineStringInputType, FeatureInputTypeDto>();
        configuration.CreateMap<ComboboxInputType, FeatureInputTypeDto>();
        configuration.CreateMap<IInputType, FeatureInputTypeDto>()
            .Include<CheckboxInputType, FeatureInputTypeDto>()
            .Include<SingleLineStringInputType, FeatureInputTypeDto>()
            .Include<ComboboxInputType, FeatureInputTypeDto>();
        configuration.CreateMap<StaticLocalizableComboboxItemSource, LocalizableComboboxItemSourceDto>();
        configuration.CreateMap<ILocalizableComboboxItemSource, LocalizableComboboxItemSourceDto>()
            .Include<StaticLocalizableComboboxItemSource, LocalizableComboboxItemSourceDto>();
        configuration.CreateMap<LocalizableComboboxItem, LocalizableComboboxItemDto>();
        configuration.CreateMap<ILocalizableComboboxItem, LocalizableComboboxItemDto>()
            .Include<LocalizableComboboxItem, LocalizableComboboxItemDto>();

        //Chat
        configuration.CreateMap<ChatMessage, ChatMessageDto>();
        configuration.CreateMap<ChatMessage, ChatMessageExportDto>();

        //Feature
        configuration.CreateMap<FlatFeatureSelectDto, Feature>().ReverseMap();
        configuration.CreateMap<Feature, FlatFeatureDto>();

        //Role
        configuration.CreateMap<RoleEditDto, Role>().ReverseMap();
        configuration.CreateMap<Role, RoleListDto>();
        configuration.CreateMap<UserRole, UserListRoleDto>();


        //Edition
        configuration.CreateMap<EditionEditDto, SubscribableEdition>().ReverseMap();
        configuration.CreateMap<EditionCreateDto, SubscribableEdition>();
        configuration.CreateMap<EditionSelectDto, SubscribableEdition>().ReverseMap();
        configuration.CreateMap<SubscribableEdition, EditionInfoDto>();

        configuration.CreateMap<Edition, EditionInfoDto>().Include<SubscribableEdition, EditionInfoDto>();

        configuration.CreateMap<SubscribableEdition, EditionListDto>();
        configuration.CreateMap<Edition, EditionEditDto>();
        configuration.CreateMap<Edition, SubscribableEdition>();
        configuration.CreateMap<Edition, EditionSelectDto>();


        //Payment
        configuration.CreateMap<SubscriptionPaymentDto, SubscriptionPayment>().ReverseMap();
        configuration.CreateMap<SubscriptionPaymentListDto, SubscriptionPayment>().ReverseMap();
        configuration.CreateMap<SubscriptionPayment, SubscriptionPaymentInfoDto>();

        //Permission
        configuration.CreateMap<Permission, FlatPermissionDto>();
        configuration.CreateMap<Permission, FlatPermissionWithLevelDto>();

        //Language
        configuration.CreateMap<ApplicationLanguage, ApplicationLanguageEditDto>();
        configuration.CreateMap<ApplicationLanguage, ApplicationLanguageListDto>();
        configuration.CreateMap<NotificationDefinition, NotificationSubscriptionWithDisplayNameDto>();
        configuration.CreateMap<ApplicationLanguage, ApplicationLanguageEditDto>()
            .ForMember(ldto => ldto.IsEnabled, options => options.MapFrom(l => !l.IsDisabled));

        //Tenant
        configuration.CreateMap<Tenant, RecentTenant>();
        configuration.CreateMap<Tenant, TenantLoginInfoDto>();
        configuration.CreateMap<Tenant, TenantListDto>();
        configuration.CreateMap<TenantEditDto, Tenant>().ReverseMap();
        configuration.CreateMap<CurrentTenantInfoDto, Tenant>().ReverseMap();

        //User
        configuration.CreateMap<User, UserEditDto>()
            .ForMember(dto => dto.Password, options => options.Ignore())
            .ReverseMap()
            .ForMember(user => user.Password, options => options.Ignore());
        configuration.CreateMap<User, UserLoginInfoDto>();
        configuration.CreateMap<User, UserListDto>();
        configuration.CreateMap<User, ChatUserDto>();
        configuration.CreateMap<User, OrganizationUnitUserListDto>();
        configuration.CreateMap<Role, OrganizationUnitRoleListDto>();
        configuration.CreateMap<CurrentUserProfileEditDto, User>().ReverseMap();
        configuration.CreateMap<UserLoginAttemptDto, UserLoginAttempt>().ReverseMap();
        configuration.CreateMap<ImportUserDto, User>();

        //AuditLog
        configuration.CreateMap<AuditLog, AuditLogListDto>();
        configuration.CreateMap<EntityChange, EntityChangeListDto>();
        configuration.CreateMap<EntityPropertyChange, EntityPropertyChangeDto>();

        //Friendship
        configuration.CreateMap<Friendship, FriendDto>();
        configuration.CreateMap<FriendCacheItem, FriendDto>();

        //OrganizationUnit
        configuration.CreateMap<OrganizationUnit, OrganizationUnitDto>();

        //Webhooks
        configuration.CreateMap<WebhookSubscription, GetAllSubscriptionsOutput>();
        configuration.CreateMap<WebhookSendAttempt, GetAllSendAttemptsOutput>()
            .ForMember(webhookSendAttemptListDto => webhookSendAttemptListDto.WebhookName,
                options => options.MapFrom(l => l.WebhookEvent.WebhookName))
            .ForMember(webhookSendAttemptListDto => webhookSendAttemptListDto.Data,
                options => options.MapFrom(l => l.WebhookEvent.Data));

        configuration.CreateMap<WebhookSendAttempt, GetAllSendAttemptsOfWebhookEventOutput>();

        configuration.CreateMap<DynamicProperty, DynamicPropertyDto>().ReverseMap();
        configuration.CreateMap<DynamicPropertyValue, DynamicPropertyValueDto>().ReverseMap();
        configuration.CreateMap<DynamicEntityProperty, DynamicEntityPropertyDto>()
            .ForMember(dto => dto.DynamicPropertyName,
                options => options.MapFrom(entity => entity.DynamicProperty.DisplayName.IsNullOrEmpty() ? entity.DynamicProperty.PropertyName : entity.DynamicProperty.DisplayName));
        configuration.CreateMap<DynamicEntityPropertyDto, DynamicEntityProperty>();

        configuration.CreateMap<DynamicEntityPropertyValue, DynamicEntityPropertyValueDto>().ReverseMap();

        //User Delegations
        configuration.CreateMap<CreateUserDelegationDto, UserDelegation>();


        /* ADD YOUR OWN CUSTOM AUTOMAPPER MAPPINGS HERE */
        //Products
        //Base product overview
        configuration.CreateMap<Product, ProductListDto>()
            .ForMember(productDto => productDto.Developer,
                options => options.MapFrom(product => product.AssignedDeveloper));

        //Product details overview
        configuration.CreateMap<Product, ProductDetailsOverviewDto>()
            .ForMember(productDto => productDto.ProductId,
                options => options.MapFrom(product => product.Id))
            .ForMember(productDto => productDto.ProductName,
                options => options.MapFrom(product => product.Name))
            .ForMember(productDto => productDto.Description,
                options => options.MapFrom(product => product.DescriptionFromDev))
            .ForMember(productDto => productDto.ProductState,
                options => options.MapFrom(product => product.State))
            .ForMember(productDto => productDto.Developer,
                options => options.MapFrom(product => product.AssignedDeveloper))
            .ForMember(productDto => productDto.CreatedAt,
                options => options.MapFrom(product => product.CreationTime))
            .ForMember(productDto => productDto.UpdatedAt,
                options => options.MapFrom(product => product.LastModificationTime))
            .ForMember(productDto => productDto.DefaultMeasurement,
                options => options.MapFrom(product => product.ProductMeasurements.SingleOrDefault(pm => pm.IsDefault)))
            .ForMember(productDto => productDto.Measurements,
                options => options.MapFrom(product => product.ProductMeasurements.Where(pm => !pm.IsDefault)))
            .ForMember(productDto => productDto.Files,
                options => options.MapFrom(product => product.ProductFiles))
            .ForMember(productDto => productDto.WorkPieceVariants, options =>
                options.MapFrom(product => product.WorkPieces.SelectMany(wp => wp.WorkPieceVariants)));

        //Product details general step
        configuration.CreateMap<Product, GeneralInfoOutputDto>()
            .ForMember(product => product.ProductId,
                options => options.MapFrom(product => product.Id))
            .ForMember(product => product.ProductName,
                options => options.MapFrom(product => product.Name));

        configuration.CreateMap<ProductMeasurement, GeneralInfoOutputDto>()
            .ForMember(pm => pm.CreationTime,
                options => options.Ignore())
            .ForMember(pm => pm.ProductName,
                options => options.Ignore());

        configuration.CreateMap<GeneralInfoInputDto, ProductMeasurement>();

        //Product details 
        configuration.CreateMap<MaterialGroup, MaterialGroupBaseDto>()
            .ForMember(materialGroupDto => materialGroupDto.MaterialGroupId,
                options =>
                    options.MapFrom(materialGroup => materialGroup.Id));

        configuration.CreateMap<MaterialGroup, MaterialGroupDto>()
            .IncludeBase<MaterialGroup, MaterialGroupBaseDto>()
            .ForMember(materialGroupDto => materialGroupDto.Surfaces,
                options =>
                    options.MapFrom(materialGroup => materialGroup.Specifications));

        configuration.CreateMap<Specification, SurfaceDto>()
            .ForMember(surfaceDto => surfaceDto.SpecificationId,
                option => option.MapFrom(specification => specification.Id))
            .ForMember(surfaceDto => surfaceDto.SpecificationGroupName,
                option => option.MapFrom(specification => specification.SpecificationGroup != null ? specification.SpecificationGroup.Name : null));

        configuration.CreateMap<MaterialGroup, MaterialAdminDto.MaterialDto>()
            .ForMember(dto => dto.Specifications,
                options => options.MapFrom(mg => mg.Specifications))
            .ForMember(dto => dto.SpecificationGroups,
                options => options.MapFrom(mg => mg.SpecificationGroups));

        configuration.CreateMap<Specification, MaterialAdminDto.SpecificationDto>();

        configuration.CreateMap<SpecificationGroup, MaterialAdminDto.SpecificationGroupDto>();

        configuration.CreateMap<WorkPiece, WorkPieceDto>()
            .ForMember(workPieceDto => workPieceDto.WorkPieceId,
                option => option.MapFrom(workPiece => workPiece.Id))
            .ForMember(workPieceDto => workPieceDto.SpecificationIds, options =>
                options.MapFrom(workPiece => workPiece.WorkPieceSpecifications.Select(wps => wps.SpecificationId).ToList()))
            .ForMember(workPieceDto => workPieceDto.Name, options =>
                options.MapFrom(workPiece => workPiece.ProductionStates.First(ps => ps.StateType == ProductionStateType.WorkPieceStart).Description))
            .ForMember(workPieceDto => workPieceDto.FinishedState, options =>
                options.MapFrom(workPiece => workPiece.ProductionStates.First(ps => ps.StateType == ProductionStateType.WorkPieceFinal).Description));

        configuration.CreateMap<WorkPiece, WorkPieceWithMaterialDto>()
            .IncludeBase<WorkPiece, WorkPieceDto>()
            .ForMember(workPieceDto => workPieceDto.MaterialGroupName, options =>
                options.MapFrom(workPiece => workPiece.MaterialGroup.Name));

        configuration.CreateMap<WorkPiece, WorkPieceOverview>()
            .IncludeBase<WorkPiece, WorkPieceDto>()
            .ForMember(workPieceDto => workPieceDto.MaterialGroup, options =>
                options.MapFrom(workPiece => workPiece.MaterialGroup))
            .ForMember(workPieceDto => workPieceDto.Specifications, options =>
                options.MapFrom(workPiece => workPiece.WorkPieceSpecifications.Select(wps => new MaterialAdminDto.SpecificationDto
                {
                    Id = wps.SpecificationId,
                    Name = wps.SpecificationName
                }).ToList()));

        configuration.CreateMap<ProductMeasurement, MeasurementDto>()
            .ForMember(measurementDto => measurementDto.MeasurementId,
                option => option.MapFrom(measurement => measurement.Id))
            .ForMember(measurementDto => measurementDto.IsDefault,
                option => option.MapFrom(measurement => measurement.IsDefault));

        configuration.CreateMap<WorkPieceVariant, WorkPieceVariantDto>()
            .ForMember(workPieceVariantDto => workPieceVariantDto.WorkPieceVariantId,
                option => option.MapFrom(workPieceVariant => workPieceVariant.Id));

        configuration.CreateMap<ProductFile, ProductFileDto>()
            .ForMember(productFileDto => productFileDto.FileId,
                option => option.MapFrom(productFile => productFile.Id));


        configuration.CreateMap<Product, ProductFilesStepOutput>()
            .ForMember(productFileDto => productFileDto.ProductId,
                option =>
                    option.MapFrom(product => product.Id))
            .ForMember(productFileDto => productFileDto.ProductDescription,
                option =>
                    option.MapFrom(product => product.DescriptionFromDev));

        //Profiles
        configuration.CreateMap<User, DeveloperListDto>()
            .ForMember(developerDto => developerDto.DeveloperId,
                options => options.MapFrom(user => user.Id));

        //Base profiles
        configuration.CreateMap<User, ProfileBase>()
            .ForMember(profileDto => profileDto.Email,
                option => option.MapFrom(user => user.EmailAddress))
            .ForMember(profileDto => profileDto.ContactPersonFullName,
                option => option.MapFrom(user => user.FullName));

        configuration.CreateMap<UserAddress, ProfileBase>();

        configuration.CreateMap<User, FullProfileUserBase>()
            .IncludeBase<User, ProfileBase>()
            .ForMember(profileDto => profileDto.UserId,
                option => option.MapFrom(user => user.Id));

        configuration.CreateMap<User, FullProfileBase>()
            .IncludeBase<User, FullProfileUserBase>();

        configuration.CreateMap<UserAddress, FullProfileBase>()
            .ForMember(profileDto => profileDto.CompanyName,
                option => option.MapFrom(address => address.Name))
            .ForMember(profileDto => profileDto.Note,
                option => option.MapFrom(address => address.AdminNote));

        //PortalAdmin profile
        configuration.CreateMap<User, AdminProfileDto>();

        //Developer profiles
        configuration.CreateMap<User, DeveloperProfile>()
            .IncludeBase<User, ProfileBase>();

        configuration.CreateMap<User, DeveloperProfileOutput>()
            .IncludeBase<User, DeveloperProfile>();

        configuration.CreateMap<FullDeveloperProfileOutput, DeveloperProfileOutput>();

        configuration.CreateMap<IDeveloperAddress, UserAddress>();
        configuration.CreateMap<IProducerAddress, UserAddress>()
            .ForMember(address => address.Name,
                option => option.MapFrom(addressDto => addressDto.CompanyName));

        configuration.CreateMap<UserAddress, DeveloperProfileOutput>()
            .IncludeBase<UserAddress, ProfileBase>()
            .ForMember(profileDto => profileDto.CompanyName,
                option => option.MapFrom(address => address.Name));

        configuration.CreateMap<User, FullDeveloperProfileOutput>()
            .IncludeBase<User, FullProfileBase>();

        configuration.CreateMap<UserAddress, FullDeveloperProfileOutput>()
            .IncludeBase<UserAddress, FullProfileBase>();

        configuration.CreateMap<User, DeveloperOverviewOutput>()
            .IncludeBase<User, FullProfileUserBase>()
            .ForMember(devDto => devDto.Street, options =>
                options.MapFrom(user => user.UserAddress.Street))
            .ForMember(devDto => devDto.City, options =>
                options.MapFrom(user => user.UserAddress.City))
            .ForMember(devDto => devDto.ZipCode, options =>
                options.MapFrom(user => user.UserAddress.ZipCode));

        //Producer profiles
        configuration.CreateMap<User, ProducerProfileOutput>()
            .IncludeBase<User, ProfileBase>()
            .ForMember(profileDto => profileDto.IsActive,
                option => option.MapFrom(user => user.IsActive));

        configuration.CreateMap<UserAddress, ProducerProfileOutput>()
            .IncludeBase<UserAddress, ProfileBase>()
            .ForMember(profileDto => profileDto.CompanyName, options =>
                options.MapFrom(ua => ua.Name));

        configuration.CreateMap<ProducerInfo, ProducerProfileOutput>()
            .ForMember(producerProfileDto => producerProfileDto.Trade, option =>
                option.MapFrom(producerInfo => producerInfo.TradeType));

        configuration.CreateMap<User, FullProducerProfileOutput>()
            .IncludeBase<User, FullProfileBase>();

        configuration.CreateMap<UserAddress, FullProducerProfileOutput>()
            .IncludeBase<UserAddress, FullProfileBase>();

        configuration.CreateMap<ProducerInfo, FullProducerProfileOutput>()
            .ForMember(producerProfileDto => producerProfileDto.Trade, option =>
                option.MapFrom(producerInfo => producerInfo.TradeType));

        configuration.CreateMap<User, ProducerRegistrationOutput>()
            .IncludeBase<User, ProfileBase>();
        configuration.CreateMap<UserAddress, ProducerRegistrationOutput>()
            .IncludeBase<UserAddress, ProfileBase>()
            .ForMember(addressDto => addressDto.CompanyName, option =>
                option.MapFrom(address => address.Name));

        configuration.CreateMap<ProducerInfo, ProducerRegistrationOutput>();

        configuration.CreateMap<TradeType, TradeTypeDto>()
            .ForMember(tradeTypeDto => tradeTypeDto.TradeTypeId,
                option => option.MapFrom(tradeType => tradeType.Id))
            .ForMember(tradeTypeDto => tradeTypeDto.TradeTypeName,
                option => option.MapFrom(tradeType => tradeType.Name));

        configuration.CreateMap<ProducerRating, ProducerRatingDto>()
            .ForMember(producerRatingDto => producerRatingDto.RatingId,
                option => option.MapFrom(producerRating => producerRating.Id))
            .ForMember(producerRatingDto => producerRatingDto.RatingType,
                option => option.MapFrom(producerRating => producerRating.RatingType.Name));

        configuration.CreateMap<RatingType, PlanRatingTypesDto>()
            .ForMember(ratingTypeDto => ratingTypeDto.RatingTypeId, options
                => options.MapFrom(ratingType => ratingType.Id))
            .ForMember(ratingTypeDto => ratingTypeDto.RatingTypeName, options
                => options.MapFrom(ratingType => ratingType.Name));

        //Value chain planning
        configuration.CreateMap<ProductionState, ProductionStateDto>()
            .ForMember(stateDto => stateDto.StateId, option =>
                option.MapFrom(state => state.Id))
            .ForMember(stateDto => stateDto.ProductionDetailsId, option =>
                option.MapFrom(state => state.ProductionDetailsId));

        configuration.CreateMap<ProductionStep, ProductionStepDto>()
            .ForMember(stepDto => stepDto.StepId, option =>
                option.MapFrom(step => step.Id))
            .ForMember(stepDto => stepDto.StartStateId, option =>
                option.MapFrom(step => step.StartState.Id))
            .ForMember(stepDto => stepDto.EndStateId, option =>
                option.MapFrom(step => step.EndState.Id))
            .ForMember(stepDto => stepDto.ProducerId, option =>
                option.MapFrom(step => step.ProducerInfo.UserId))
            .ForMember(stepDto => stepDto.ProductionDetailsId, option =>
                option.MapFrom(step => step.ProductionDetailsId));

        configuration.CreateMap<ProductionStep, ProductionStepListDto>()
            .ForMember(stepListDto => stepListDto.ProductionStepId,
                option => option.MapFrom(step => step.Id))
            .ForMember(stepListDto => stepListDto.StartState,
                option => option.MapFrom(step => step.StartState.Description))
            .ForMember(stepListDto => stepListDto.EndState,
                option => option.MapFrom(step => step.EndState.Description))
            .ForMember(stepListDto => stepListDto.ProducerName,
                option => option.MapFrom(step => step.ProducerInfo.User.UserAddress.Name))
            .ForMember(stepListDto => stepListDto.Trade,
                option => option.MapFrom(step => step.ProducerInfo.TradeType))
            .ForMember(stepListDto => stepListDto.DefaultCost,
                option => option.MapFrom<ProductionStepDefaultCostResolver>());

        configuration.CreateMap<ProductionStep, ProductionStepOverviewDto>()
            .IncludeBase<ProductionStep, ProductionStepListDto>();
        
        configuration.CreateMap<ProductionStepMeasurementVariant, StepMeasurementVariantsDto>()
            .ForMember(mvariantDto => mvariantDto.StepMeasurementVariantsId, option =>
                option.MapFrom(smvariant => smvariant.Id))
            .ForMember(mvariantDto => mvariantDto.MeasurementId, option =>
                option.MapFrom(smvariant => smvariant.ProductMeasurement.Id))
            .ForMember(mvariantDto => mvariantDto.AdditionalCosts, option =>
                option.MapFrom(smvariant => smvariant.AdditionalCost))
            .ForMember(mvariantDto => mvariantDto.WorkPieceVariantsCost, option =>
                option.MapFrom(smvariant => smvariant.StepWorkPieceVariantCosts));

        configuration.CreateMap<ProductionStepWorkPieceVariantCost, WorkPieceVariantCostDto>()
            .ForMember(workPieceVariantDto => workPieceVariantDto.WorkPieceVariantCostId, option =>
                option.MapFrom(workPieceVariant => workPieceVariant.Id))
            .ForMember(workPieceVariantDto => workPieceVariantDto.WorkPieceVariantId, option =>
                option.MapFrom(workPieceVariant => workPieceVariant.Variant.Id));

        configuration.CreateMap<ProductionStep, FullProductionStepDto>()
            .IncludeBase<ProductionStep, ProductionStepDto>();

        configuration.CreateMap<ProducerInfo, VcpProducerDto>()
            .ForMember(producerDto => producerDto.Id, option
                => option.MapFrom(producer => producer.User.Id))
            .ForMember(producerDto => producerDto.Name, option
                => option.MapFrom(producer => producer.User.UserAddress.Name))
            .ForMember(producerDto => producerDto.Trade, option
                => option.MapFrom(producer => producer.TradeType.Name))
            .ForMember(producerDto => producerDto.ValueChainParameters, option
                => option.MapFrom(producer => producer.ProducerRatings
                    .ToDictionary(pr => pr.RatingType.Name, pr => pr.Rating)));

        configuration.CreateMap<ProductionState, VcpProductionStateDto>()
            .ForMember(stateDto => stateDto.Name, option
                => option.MapFrom(state => state.Description))
            .ForMember(stateDto => stateDto.IsStartState, option
                => option.MapFrom(state => state.StateType == ProductionStateType.WorkPieceStart))
            .ForMember(stateDto => stateDto.IsFinalState, option
                => option.MapFrom(state => state.StateType == ProductionStateType.ProductFinal));

        configuration.CreateMap<ProductionState, VcpStepPreconditionDto>()
            .ForMember(stateDto => stateDto.DeliveryTimeLatestInWeeks, option
                => option.MapFrom(state => 0));

        configuration.CreateMap<ProductionPlan, PlanListDto>()
            .ForMember(planDto => planDto.PlanId, option
                => option.MapFrom(plan => plan.Id))
            .ForMember(planDto => planDto.ProducersList, options
                => options.MapFrom(plan => plan.GetProducerList()));

        configuration.CreateMap<ProductionPlanRating, PlanRatingDto>();
        
        //Order management
        configuration.CreateMap<ShopOrder, OrderListDto>()
            .ForMember(orderDto => orderDto.OrderId, option
                => option.MapFrom(order => order.Id))
            .ForMember(orderDto => orderDto.ProductNumber, option
                => option.MapFrom(order => order.ProductVariant.Product.ProductNumber))
            .ForMember(orderDto => orderDto.ProductName, option
                => option.MapFrom(order => order.ProductVariant.Product.Name));

        configuration.CreateMap<ShopOrder, OrderListAdminDto>()
            .IncludeBase<ShopOrder, OrderListDto>();
        
        configuration.CreateMap<ShopOrder, OrderListProducerDto>()
            .IncludeBase<ShopOrder, OrderListDto>();

        configuration.CreateMap<CustomerInfo, CustomerInfoDto>();


    }
}