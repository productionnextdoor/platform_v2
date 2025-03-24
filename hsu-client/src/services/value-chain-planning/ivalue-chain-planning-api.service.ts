import { Observable } from 'rxjs';
import {
  IProductionStepCreateOrUpdateDto,
  ProductGraphDataDto,
  ProductionStateType,
  ProductionStepForEditOutput,
} from '../../shared/service-proxies/service-proxies';
import {
  EProductStateType,
} from 'hsu-library';

export abstract class IValueChainPlanningApiService {
  abstract getProductGraphData(productionDetailsId: number): Observable<ProductGraphDataDto>
  abstract getStateType(stateType:ProductionStateType):EProductStateType
  abstract getProductionStepForEdit(productId: number, stepId?: number, startStateId?: number, endStateId?: number): Observable<ProductionStepForEditOutput>;
  abstract createOrUpdateProductionStep(productionStep: IProductionStepCreateOrUpdateDto): Observable<void>
  abstract deleteProductionStep(stepId: number): Observable<void>
}
