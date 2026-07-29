import {
  IStepMeasurementVariants,
  IWorkstepMatrixModalLocalisations
} from 'hsu-library';
import { Observable } from 'rxjs';
import { IStepData } from '../../../app/value-chain-planning/workstep-matrix/workstep-matrix.shared';

export abstract class IWorkstepMatrixService {

  abstract getProductionStepForEdit(productId: number, stepId?: number, startStateId?: number, endStateId?: number): Observable<IStepData>
  abstract createOrUpdateProductionStep(productionDetailsId: number, stepMeasurementVariants: IStepMeasurementVariants[], stepId?: number, startStateId?: number, endStateId?: number): Observable<void>
  abstract getWorkstepMatrixModalLocalisationStrings(): IWorkstepMatrixModalLocalisations
  abstract deleteProductionStep(stepId: number): Observable<void>
}
