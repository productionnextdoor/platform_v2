using System;
using Abp.UI;

namespace PMHelmutSchmidtPortal.Extensions;

public static class ExceptionExtensions
{
    public static UserFriendlyException ToUserFriendlyException(this Exception exception, int errorCode)
    {
        return new UserFriendlyException(errorCode, exception.Message);
    }
}