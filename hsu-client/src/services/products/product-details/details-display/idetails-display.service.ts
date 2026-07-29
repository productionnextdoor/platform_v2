import { ProductDetailsOverviewDto } from '../../../../shared/service-proxies/service-proxies';
import { Observable } from 'rxjs';
import {
  IPropertyGroup,
  IPropertySection
} from 'hsu-library';

export abstract class IDetailsDisplayService {
  public abstract getProductDetailsData (productId: number): Observable<ProductDetailsOverviewDto>;
  public abstract getProductDetailsDataByOrderId(orderId: number): Observable<ProductDetailsOverviewDto>;
  public abstract mapFromProductDetailsOverviewDto(productData: ProductDetailsOverviewDto): IPropertySection[];
  public abstract getGeneralInformationDeveloper (productData: ProductDetailsOverviewDto): IPropertyGroup;
  public abstract getImageURL(fileId: number): Observable<string>;
  public abstract downloadAllProductFiles(productId: number, fileName: string): void;
  public abstract getUploadCategories(): {[key: string]: string};
  public abstract mapToDeveloperDetails(productData: ProductDetailsOverviewDto): IPropertySection[];
}
