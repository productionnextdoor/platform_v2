using System;

namespace PMHelmutSchmidtPortal.Exceptions;

public class CantCancelProductionException : Exception
{
    private new const string Message = "Can't cancel production. Production was already canceled or has been started";

    public CantCancelProductionException() : base(Message)
    {
    }

    public CantCancelProductionException(string message) : base(message)
    {
    }
}