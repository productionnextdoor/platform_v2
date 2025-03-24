import {
  IProductGraphData,
} from 'hsu-library';
import { Observable } from 'rxjs';

export abstract class IProductGraphService {
  public abstract getProductGraphData(productionDetailsId: number): Observable<IProductGraphData>
}
