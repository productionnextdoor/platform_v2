import {
  Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  IWorkstepMatrixService
} from '../../../services/value-chain-planning/workstep-matrix/iworkstep-matrix.service';
import {
  IWorkstepMatrixModalLocalisations,
  WorkstepMatrixModalLocalisations,
  IStepMeasurementVariants,
  IProductGraphState,
  EProductStateType
} from 'hsu-library';
import { IStepData } from './workstep-matrix.shared';


@Component({
  selector: 'workstep-matrix',
  templateUrl: './workstep-matrix.component.html',
})
export class WorkstepMatrixComponent implements OnInit {

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

  localisations: IWorkstepMatrixModalLocalisations = WorkstepMatrixModalLocalisations;

  productStepsData: IStepMeasurementVariants[] = [];
  loading: boolean = true;

  protected readonly EProductStateType: typeof EProductStateType = EProductStateType;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private readonly workstepMatrixService: IWorkstepMatrixService
  ) {
  }

  ngOnInit() {
    this.localisations = this.workstepMatrixService.getWorkstepMatrixModalLocalisationStrings();
    this.setStepsData();
  }

  onFinalize(productStepsData: IStepMeasurementVariants[]) {
    this.workstepMatrixService
      .createOrUpdateProductionStep(this.productionDetailsId, productStepsData, this.stepId, this.startState?.stateId, this.endState?.stateId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.onClose.emit());
  }

  private setStepsData(): void {
    this.loading = true;
    this.workstepMatrixService
      .getProductionStepForEdit(this.productionDetailsId, this.stepId, this.startState?.stateId ?? 0, this.endState?.stateId ?? 0)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (result: IStepData) => {
          this.stepId = result.stepId;
          this.startState = result.startState;
          this.endState = result.endState;
          this.productStepsData = result.stepMeasurementVariants;
        },
        complete: () => this.loading = false
      });
  }

  onDelete(stepId: number) {
    this.workstepMatrixService.deleteProductionStep(stepId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.onClose.emit())
  }


}
