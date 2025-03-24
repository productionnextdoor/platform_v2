using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto;

namespace PMHelmutSchmidtPortal.HSUPortal.Products;

public interface IProductEmailer
{
    Task SendNewProductNotificationToDeveloper(User user, Product product);

    Task SendProcessingDeadlineUpdate(ProfileBase producer, ProductListDto product);

    Task SendProductProducerRequest(ProfileBase user, ProductListDto product);
}