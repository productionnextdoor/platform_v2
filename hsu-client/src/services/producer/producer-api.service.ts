import { Injectable } from '@angular/core';
import { IProducerApiService } from './iproducer-api.service';
import {
  PagedResultDtoOfProducerOverviewOutput,
  UserExtendedServiceProxy
} from '../../shared/service-proxies/service-proxies';
import { Observable } from 'rxjs';

export interface IProducerFilter {
  maxResultCount: number;
  skipCount: number;
  sortOrder: string;
  searchInput: string;
}

@Injectable()
export class ProducerApiService extends IProducerApiService {
  constructor(
    private readonly userExtendedService: UserExtendedServiceProxy
  ) {
    super();
  }

  public getFilteredProducers(producerFilter: IProducerFilter): Observable<PagedResultDtoOfProducerOverviewOutput> {
    return this.userExtendedService.getProducersFiltered(producerFilter.searchInput, producerFilter.sortOrder, producerFilter.maxResultCount, producerFilter.skipCount);
  }
}
