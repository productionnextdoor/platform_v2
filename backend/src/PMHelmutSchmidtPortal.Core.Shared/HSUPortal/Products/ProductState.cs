namespace PMHelmutSchmidtPortal.HSUPortal.Products;

public enum ProductState
{
    Draft = 1,
    InProcessDeveloper = 2,
    ReadyForValueChainPlanning = 3,
    InProcessProducer = 4,
    ProductionReady = 5,
    Live = 6,
    ProductionPlanningFinalized = 7,
    ValueChainWaitingAdminConfirmation = 8,
    CommissionedToProduction = 9,
    InProduction = 10,
    Completed = 11
}