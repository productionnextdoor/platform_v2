using System.Threading.Tasks;

namespace PMHelmutSchmidtPortal.HSUPortal.ProductionPlanningFinalizing
{
    public interface IProductionPlanningFinalizingAppService
    {
        Task FinalizeProductPlanning(int productId);

        Task SelectPlanForProduction(int planId);
    }
}