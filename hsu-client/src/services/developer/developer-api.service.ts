import { Injectable } from '@angular/core';
import { IDeveloperApiService } from './ideveloper-api.service';
import {
  IDeveloperRevenueDto,
  PagedResultDtoOfDeveloperOverviewOutput,
  UserExtendedServiceProxy,
  UserRevenueServiceProxy
} from '../../shared/service-proxies/service-proxies';
import { Observable, map } from 'rxjs';
import { IDeveloperRevenueInfo } from 'hsu-library';

export interface IDeveloperFilter {
  maxResultCount: number;
  skipCount: number;
  sortOrder: string;
  searchInput: string;
}


@Injectable()
export class DeveloperApiService extends IDeveloperApiService {
  constructor(
    private readonly userExtendedService: UserExtendedServiceProxy,
    private readonly userRevenueService: UserRevenueServiceProxy
  ) {
    super();
  }

  public getFilteredDevelopers(developerFilter: IDeveloperFilter):
    Observable<PagedResultDtoOfDeveloperOverviewOutput> {
    return this.userExtendedService.getDevelopersFiltered(developerFilter.searchInput, developerFilter.sortOrder, developerFilter.maxResultCount, developerFilter.skipCount);
  }

  public getDeveloperRevenueInfo(productId: number): Observable<IDeveloperRevenueInfo> {
    return this.userRevenueService.getDeveloperRevenueInfo(productId).pipe(
      map(this.mapDeveloperRevenueInfo.bind(this))
    );
  }

  private mapDeveloperRevenueInfo(developerRevenueDto: IDeveloperRevenueDto): IDeveloperRevenueInfo {
    return {
      totalOrders: developerRevenueDto.numberOfProductOrders,
      priceRange: developerRevenueDto.productPriceRange ?? '',
      royaltyRate: Math.trunc(developerRevenueDto.royaltyRate * 100),
      totalRevenue: developerRevenueDto.totalRevenue
    };
  }
}
