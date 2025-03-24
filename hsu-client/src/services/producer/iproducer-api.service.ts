import { Observable } from 'rxjs';
import { PagedResultDtoOfProducerOverviewOutput } from '../../shared/service-proxies/service-proxies';
import { IProducerFilter } from './producer-api.service';

export abstract class IProducerApiService {
  public abstract getFilteredProducers(producerFilter: IProducerFilter): Observable<PagedResultDtoOfProducerOverviewOutput>;
}
