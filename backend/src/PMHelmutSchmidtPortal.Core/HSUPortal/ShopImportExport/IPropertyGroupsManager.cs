using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Services;
using PMHelmutSchmidtPortal.HSUPortal.Products.Details;
using PMHelmutSchmidtPortal.HSUPortal.ShopImportExport.PropertyGroups;
using PMHelmutSchmidtPortal.HSUPortal.Users;

namespace PMHelmutSchmidtPortal.HSUPortal.ShopImportExport;

public interface IPropertyGroupsManager: IDomainService
{
    Task<List<PropertyGroupDto>> GetPropertyGroups(ICollection<ProductMeasurement> productMeasurements, ICollection<WorkPiece> workPieces,ICollection<RatingType> ratingTypes);
}