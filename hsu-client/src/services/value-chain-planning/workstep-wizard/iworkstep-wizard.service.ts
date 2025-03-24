import {
  IStepMeasurementVariants,
  IWorkstepWizardLocalisations
} from 'hsu-library';
import { Observable } from 'rxjs';
import { IStepData } from '../../../app/value-chain-planning/workstep-wizard/workstep-wizard.shared';

export abstract class IWorkstepWizardService {

  abstract getProductionStepForEdit(productId: number, stepId?: number, startStateId?: number, endStateId?: number): Observable<IStepData>
  abstract createOrUpdateProductionStep(productionDetailsId: number, stepMeasurementVariants: IStepMeasurementVariants[], stepId?: number, startStateId?: number, endStateId?: number): Observable<void>
  abstract getWorkstepWizardLocalisationStrings(): IWorkstepWizardLocalisations
  abstract deleteProductionStep(stepId: number): Observable<void>
}
