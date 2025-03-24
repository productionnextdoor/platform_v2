import {
  Component,
  EventEmitter,
  Input, OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  EWorkstepType,
  IStepMeasurementVariants,
  IWorkPieceVariantsCost,
  IWorkstepWizardLocalisations,
  StepMeasurementVariants,
  WorkstepWizardLocalisations
} from './pm-workstep-wizard.shared';
import { BannerType } from '../../components/pm-banner/pm-banner.shared';
import { IPmWizardStepData } from '../../components/pm-wizard/pm-wizard.shared';
import { Subject } from 'rxjs';
import { PmCheckboxState } from '../../components/pm-checkbox/pm-checkbox.shared';
import { PopupType } from '../../components/pm-popup/pm-popup.component';
import { ButtonType } from '../../components/pm-button/pm-button.component';

@Component({
  selector: 'pm-workstep-wizard',
  templateUrl: './pm-workstep-wizard.component.html',
})
export class PmWorkstepWizardComponent implements OnInit, OnChanges {
  protected isValid!: boolean;

  @Input()
  localisations: IWorkstepWizardLocalisations = WorkstepWizardLocalisations;

  @Input()
  stepId: number = 0

  @Input()
  startStateName: string = '';

  @Input()
  finalStateName: string = '';

  @Input()
  productStepsData: IStepMeasurementVariants[] = [new StepMeasurementVariants()];

  @Input()
  readonly: boolean = false;

  @Input()
  assemblyOnly: boolean = false;

  @Input()
  assemblyInvolved: boolean = false;

  @Input()
  productFinalWorkPiecesCount: number = 0;

  @Output()
  onClose: EventEmitter<void> = new EventEmitter();

  @Output()
  onFinalize: EventEmitter<IStepMeasurementVariants[]> = new EventEmitter<IStepMeasurementVariants[]>();

  @Output()
  onDelete: EventEmitter<number> = new EventEmitter<number>();

  protected wizardStepNames: string[] = [];
  protected shouldCopyStepInfo: boolean = false;
  protected showInfoBanner: boolean = false;
  protected showConfirmOnDelete: boolean = false;

  protected processingNextStepSuccess: Subject<boolean> = new Subject<boolean>();
  protected readonly BannerType = BannerType;
  protected readonly PopupType = PopupType;
  protected readonly ButtonType = ButtonType;

  protected showSupplyOtherCraftsInWeeksInput: boolean = false;

  ngOnInit() {
    this.productStepsData.sort(this.measurementVariantSortCmp)
    this.shouldCopyStepInfo = !this.stepId
    this.initStepNames();
    this.wizardInputValidation(this.productStepsData[EWorkstepType.DEFAULT]);

    this.updateShowSupplyOtherCraftsInWeeksInput();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productFinalWorkPiecesCount']
      || changes['assemblyInvolved']
      || changes['assemblyOnly']
    ) {
      this.updateShowSupplyOtherCraftsInWeeksInput();
    }
  }

  changeStep(stepData: IPmWizardStepData) {
    if (this.shouldCopyStepInfo) {
      this.productStepsData = this.productStepsData.map(productStep => {
        if (productStep.measurementVariantType === EWorkstepType.DEFAULT) {
          return productStep;
        }
        return this.mapStepValuesOnly(productStep)
      })
      this.showInfoBanner = true;
      this.shouldCopyStepInfo = false;
    }
    this.wizardInputValidation(this.productStepsData[stepData.step])
  }

  saveMeasurementVariants() {
    this.onFinalize.emit(this.productStepsData);
  }

  onConfirmDelete() {
    this.showConfirmOnDelete = false;
    this.onDelete.emit(this.stepId);
  }

  protected wizardInputValidation(step: IStepMeasurementVariants) {
    this.isValid = !!step.orderProcessingTime
      && !!step.workHours
      && (!this.showSupplyOtherCraftsInWeeksInput || parseInt(String(step.supplyOtherCraftsInWeeks)) >= 0)
      && this.workpieceValidation(step.workPieceVariantsCost);
  }

  private workpieceValidation(workPieces: IWorkPieceVariantsCost[]): boolean {
    return this.assemblyOnly || workPieces.every(workpiece => {
      return this.checkDefaultWorkpiece(workpiece) || this.checkVariantWorkpiece(workpiece);
    });
  }

  private checkDefaultWorkpiece(workpiece: IWorkPieceVariantsCost): boolean {
    return !!(workpiece.isStandard && workpiece.materialCost);
  }

  private checkVariantWorkpiece(workpiece: IWorkPieceVariantsCost): boolean {
    if (workpiece.canProduce === PmCheckboxState.ACTIVE) {
      return true;
    }

    return !!(workpiece.canProduce === PmCheckboxState.DEFAULT && workpiece.materialCost);
  }

  private initStepNames() {
    this.productStepsData.forEach(step => {
      switch (step.measurementVariantType) {
      case EWorkstepType.MAX:
        this.wizardStepNames.push(this.localisations.steps.max);
        break;
      case EWorkstepType.MIN:
        this.wizardStepNames.push(this.localisations.steps.min);
        break;
      default:
        this.wizardStepNames.push(this.localisations.steps.default);
      }
    });
  }

  private measurementVariantSortCmp(aVariant: IStepMeasurementVariants, bVariant: IStepMeasurementVariants): number {
    if (aVariant.measurementVariantType > bVariant.measurementVariantType) {
      return 1;
    }
    if (aVariant.measurementVariantType < bVariant.measurementVariantType) {
      return -1;
    }
    return 0;
  }

  private mapStepValuesOnly(productStep: IStepMeasurementVariants): IStepMeasurementVariants {
    return {
      ...productStep,
      orderProcessingTime: this.productStepsData[EWorkstepType.DEFAULT].orderProcessingTime,
      workHours: this.productStepsData[EWorkstepType.DEFAULT].workHours,
      supplyOtherCraftsInWeeks: this.productStepsData[EWorkstepType.DEFAULT].supplyOtherCraftsInWeeks,
      transportAndAssemblyCost: this.productStepsData[EWorkstepType.DEFAULT].transportAndAssemblyCost,
      additionalCosts: this.productStepsData[EWorkstepType.DEFAULT].additionalCosts,
      workPieceVariantsCost: productStep.workPieceVariantsCost.map(variantCost => {
        const currentVariant: IWorkPieceVariantsCost | undefined = this.productStepsData[EWorkstepType.DEFAULT]
          .workPieceVariantsCost
          .find(variant =>
            variant.workPieceId === variantCost.workPieceId && variantCost.isStandard && variant.isStandard ||
            variant.workPieceId === variantCost.workPieceId && variant.workPieceVariantId === variantCost.workPieceVariantId
          )

        return {
          ...variantCost,
          canProduce: currentVariant?.canProduce ?? PmCheckboxState.DEFAULT,
          materialCost: currentVariant?.materialCost ?? 0
        }
      })
    }
  }

  private updateShowSupplyOtherCraftsInWeeksInput() {
    this.showSupplyOtherCraftsInWeeksInput = this.productFinalWorkPiecesCount > 1 && this.assemblyInvolved && !this.assemblyOnly;
  }
}
