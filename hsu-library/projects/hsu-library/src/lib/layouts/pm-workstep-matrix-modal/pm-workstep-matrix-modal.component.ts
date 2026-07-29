import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { ButtonType } from '../../components/pm-button/pm-button.component';
import { PopupType } from '../../components/pm-popup/pm-popup.component';
import {
  IStepMeasurementVariants
} from '../pm-workstep-matrix/pm-workstep-matrix.shared';
import {
  IWorkstepMatrixModalLocalisations,
  WorkstepMatrixModalLocalisations
} from './pm-workstep-matrix-modal.shared';

@Component({
  selector: 'pm-workstep-matrix-modal',
  templateUrl: './pm-workstep-matrix-modal.component.html',
  styleUrls: ['./pm-workstep-matrix-modal.component.scss']
})
export class PmWorkstepMatrixModalComponent {
  protected readonly ButtonType = ButtonType;
  protected readonly PopupType = PopupType;

  @Input()
  localisations: IWorkstepMatrixModalLocalisations = WorkstepMatrixModalLocalisations;

  @Input()
  stepId: number = 0;

  @Input()
  startStateName: string = '';

  @Input()
  finalStateName: string = '';

  @Input()
  stepMeasurementVariants: IStepMeasurementVariants[] = [];

  @Input()
  readonly: boolean = false;

  @Input()
  showDeleteButton: boolean = false;

  showConfirmDelete: boolean = false;

  isValid: boolean = true;
  private currentData: IStepMeasurementVariants[] = [];

  @Output()
  onClose: EventEmitter<void> = new EventEmitter();

  @Output()
  onFinalize: EventEmitter<IStepMeasurementVariants[]> = new EventEmitter<IStepMeasurementVariants[]>();

  @Output()
  onDelete: EventEmitter<number> = new EventEmitter<number>();


  onDataChange(stepMeasurements: IStepMeasurementVariants[]): void {
    // Store the current data for saving, but don't update the input
    // This prevents re-rendering and focus loss
    this.currentData = stepMeasurements;
  }

  onSave(): void {
    if (this.isValid) {
      // Use current data from matrix component, fallback to input if empty
      const measurementsToSave: IStepMeasurementVariants[] = this.currentData.length > 0 ? this.currentData : this.stepMeasurementVariants;
      this.onFinalize.emit(measurementsToSave);
    }
  }

  onValidationChange(isValid: boolean): void {
    this.isValid = isValid;
  }

  onDeleteClick(): void {
    this.showConfirmDelete = true;
  }

  onDeleteConfirm(): void {
    this.onDelete.emit(this.stepId);
    this.showConfirmDelete = false;
  }

  onDeleteCancel(): void {
    this.showConfirmDelete = false;
  }

  onCloseHandler(): void {
    if (!this.showConfirmDelete) {
      this.onClose.emit();
    }
  }
}
