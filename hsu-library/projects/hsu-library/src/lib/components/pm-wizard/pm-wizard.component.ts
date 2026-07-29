import {
  Component,
  ContentChildren,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { ButtonType, IconPosition } from '../pm-button/pm-button.component';
import { Icon } from '../pm-icon/pm-icon.shared';
import { PopupType } from '../pm-popup/pm-popup.component';
import { IStepItem } from '../pm-steps/pm-steps.shared';
import {
  IPmWizardLocalisations,
  IPmWizardStepData,
  wizardLocalisations
} from './pm-wizard.shared';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'pm-wizard',
  templateUrl: './pm-wizard.component.html',
  styleUrls: ['./pm-wizard.component.scss']
})
export class PmWizardComponent implements OnInit {
  protected readonly PopupType: typeof PopupType = PopupType;
  protected readonly ButtonType: typeof ButtonType = ButtonType;
  protected readonly Icon: typeof Icon = Icon;
  protected readonly IconPosition: typeof IconPosition = IconPosition;

  @Input()
  public context: string = '';

  @Input()
  public title: string = '';

  @Input()
  steps: string[] = [];

  @Input()
  step: number = 0;

  @Input()
  progress: number = 0;

  @Input()
  disableNext: boolean = false;

  @Input()
  disableSave: boolean = false;

  @Input()
  isValid: boolean = false;

  @Input()
  localisations: IPmWizardLocalisations = wizardLocalisations;

  @Input()
  processingNextStepSuccess!: Observable<boolean>;

  @Input()
  isAdminView: boolean = false;

  @Input()
  ignoreStepSaving: boolean = false;

  @Input()
  wizardSize: PopupType = PopupType.LARGE;

  @Output()
  onCancel: EventEmitter<number> = new EventEmitter();

  @Output()
  onStepChange: EventEmitter<IPmWizardStepData> = new EventEmitter();

  @Output()
  onSave: EventEmitter<number> = new EventEmitter();

  @Output()
  onFinalize: EventEmitter<number> = new EventEmitter();

  @ContentChildren(TemplateRef)
  protected stepTemplates: QueryList<TemplateRef<Element>> = new QueryList<TemplateRef<Element>>();

  /** @ignore */
  protected nextLabel: string = '';

  /** @ignore */
  protected prevLabel: string = '';

  /** @ignore */
  protected stepsData: IStepItem[] = [];

  /** @ignore */
  protected showCancelConfirmation: boolean = false;

  /** @ignore */
  protected dirty: boolean = false;

  /** @ignore */
  protected showConfirmPopup: boolean = false;

  private nextStep: number = -1;

  private beforeSubmit = false;

  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.updateStepsData();
    this.processingNextStepSuccess
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((success: boolean): void => {
        this.finishProcessingNextStep(success);
      })
  }

  ngOnChanges(): void {
    this.updateStepsData();
  }

  /** @ignore */
  protected setStep(step: number): void {
    const isForwardNavigation: boolean = step > this.step;
    if ((isForwardNavigation && !this.isValid) || step === this.step) {
      return;
    }

    this.nextStep = step;
    this.setStepSavingProcess(isForwardNavigation);
    this.onStepChange.emit({
      step: step,
      isForwardNavigation: isForwardNavigation
    });
  }

  private setStepSavingProcess(isForwardNavigation: boolean) {
    this.dirty && isForwardNavigation && !this.ignoreStepSaving
      ? this.onSaveClick()
      : this.finishProcessingNextStep(true);
  }

  /** @ignore */
  protected onSetStep(step: string): void {
    this.setStep(Number(step));
  }

  protected finishProcessingNextStep(success: boolean): void {
    if (success && this.beforeSubmit && !this.isAdminView) {
      this.showConfirmPopup = true;
      return;
    }

    if (success && this.nextStep >= 0) {
      this.step = this.nextStep;
      this.updateStepsData();
    }

    this.nextStep = -1;
  }

  /** @ignore */
  updateStepsData(): void {
    this.progress = Math.max(this.progress, this.step);
    this.stepsData = this.steps.map((step: string, index: number): IStepItem => {
      return {
        title: step,
        value: String(index),
        active: index === this.step,
        disabled: index > this.progress
      };
    });

    const currentStep: number = this.step + 1;
    this.nextLabel = this.localisations.nextStep.replace('{step}', String(currentStep + 1));
    this.prevLabel = this.localisations.prevStep.replace('{step}', String(currentStep - 1));
  }

  onInputChange(): void {
    this.dirty = true;
  }

  onCancelClick(): void {
    if (this.dirty) {
      this.showCancelConfirmation = true;
      return;
    }

    this.onCancel.emit(this.step);
  }

  onSaveClick(): void {
    if (!this.isValid) {
      return;
    }

    this.onSave.emit(this.step);
    this.dirty = false;
  }

  onFinalizeClick(): void {
    this.beforeSubmit = true;
    this.ignoreStepSaving ? this.finishProcessingNextStep(true) : this.onSave.emit(this.step);
  }

  onConfirmFinalizeClick(): void {
    this.showConfirmPopup = false;

    if (!this.isValid) {
      return;
    }

    this.onFinalize.emit(this.step);
    this.dirty = false;
  }

  onConfirmCancelClick(): void {
    this.showConfirmPopup = false;
    this.beforeSubmit = false;
  }

  onCancelAbortClick(): void {
    this.showCancelConfirmation = false;
  }

  onCancelConfirmClick(): void {
    this.showCancelConfirmation = false;

    this.onCancel.emit(this.step);
  }
}
