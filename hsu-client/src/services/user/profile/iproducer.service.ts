import { IProducer } from 'hsu-library';
import { Observable } from 'rxjs';

export abstract class IProducerService {

  abstract getCurrentProducer(): Observable<IProducer>;

  abstract getProducerById(producerId: number): Observable<IProducer>;

  abstract updateCurrentProducer(producer: IProducer): Observable<IProducer>

  abstract updateProducer(producer: IProducer): Observable<IProducer>;
}
