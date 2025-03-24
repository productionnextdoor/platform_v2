import { IProductFilter } from '../products/product-table/product-table-base.service';
import { Observable } from 'rxjs';
import {
  PagedResultDtoOfDeveloperOverviewOutput
} from '../../shared/service-proxies/service-proxies';
import { IDeveloperRevenueInfo } from 'hsu-library';

export abstract class IDeveloperApiService {
  public abstract getFilteredDevelopers(developerFilter: IProductFilter): Observable<PagedResultDtoOfDeveloperOverviewOutput>;
  public abstract getDeveloperRevenueInfo(productId: number): Observable<IDeveloperRevenueInfo>;
}
