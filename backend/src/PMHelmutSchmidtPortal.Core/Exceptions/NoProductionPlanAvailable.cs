using System;

namespace PMHelmutSchmidtPortal.Exceptions;

public class NoProductionPlanAvailable : Exception
{
    private new const string Message = "No production plan available";
    public NoProductionPlanAvailable() : base(Message)
    {
    }

    public NoProductionPlanAvailable(string message) : base(message)
    {
    }
}