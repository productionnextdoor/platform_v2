namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ValueChainPlanner
{
    public class VcpRequestContentDto
    {
        public VcpDataOutputDto InputJsonData { get; set; }
        public string CallbackUrl { get; set; }
        public int MaxCost { get; set; }
        public string OutputParam { get; set; }
    }
}