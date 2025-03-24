import {
  Component, EventEmitter, Input, OnInit, Output
} from '@angular/core';
import {
  IWorkstepWizardService
} from '../../../services/value-chain-planning/workstep-wizard/iworkstep-wizard.service';
import {
  IWorkstepWizardLocalisations,
  WorkstepWizardLocalisations,
  IStepMeasurementVariants,
  IProductGraphState,
  EProductStateType
} from 'hsu-library';
import { IStepData } from './workstep-wizard.shared';


@Component({
  selector: 'workstep-wizard',
  templateUrl: './workstep-wizard.component.html',
})
export class WorkstepWizardComponent implements OnInit {


  @Input()
  productionDetailsId: number = 0;

  @Input()
  startState?: IProductGraphState;

  @Input()
  endState?: IProductGraphState;

  @Input()
  productFinalWorkPiecesCount: number = 0;

  @Input()
  stepId: number = 0;

  @Input()
  readonly: boolean = false;

  @Output()
  onClose: EventEmitter<void> = new EventEmitter();

  localisations: IWorkstepWizardLocalisations = WorkstepWizardLocalisations;

  productStepsData: IStepMeasurementVariants[] = [];
  loading: boolean = true;

  protected readonly EProductStateType: typeof EProductStateType = EProductStateType;

  constructor(
    private readonly workstepWizardService: IWorkstepWizardService
  ) {
  }

  ngOnInit() {
    this.localisations = this.workstepWizardService.getWorkstepWizardLocalisationStrings();
    this.setStepsData();
  }

  onFinalize(productStepsData: IStepMeasurementVariants[]) {
    this.workstepWizardService
      .createOrUpdateProductionStep(this.productionDetailsId, productStepsData, this.stepId, this.startState?.stateId, this.endState?.stateId)
      .subscribe(() => this.onClose.emit());
  }

  private setStepsData(): IStepMeasurementVariants[] {
    this.loading = true
    this.workstepWizardService
      .getProductionStepForEdit(this.productionDetailsId, this.stepId, this.startState?.stateId ?? 0, this.endState?.stateId ?? 0)
      .subscribe({
        next: (result: IStepData) => {
          this.stepId = result.stepId;
          this.startState = result.startState;
          this.endState = result.endState;
          this.productStepsData = result.stepMeasurementVariants;
          this.loading = false;
        }
      });
    return [];
  }

  onDelete(stepId: number) {
    this.workstepWizardService.deleteProductionStep(stepId).subscribe(() => this.onClose.emit())
  }

}
