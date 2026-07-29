import { Injectable } from '@angular/core';
import { IWorkstepMatrixService } from './iworkstep-matrix.service';
import {
  EWorkstepType,
  IStepMeasurementVariants,
  IWorkPieceVariantsCost,
  IFillAssistantLocalisations,
  IWorkstepMatrixModalLocalisations,
  IWorkstepMatrixValidationMessages,
  IWorkstepMaterialDescription,
  PmCheckboxState,
  IProductGraphState,
} from 'hsu-library';
import { AppLocalizationService } from '../../localization/app-localization.service';
import {
  MeasurementDto,
  ProductionStateDto,
  ProductionStepCreateOrUpdateDto,
  ProductionStepForEditOutput,
  StepMeasurementVariantsDto, WorkPieceOverview,
  WorkPieceVariantCostDto,
  WorkPieceVariantDto
} from '../../../shared/service-proxies/service-proxies';
import { IValueChainPlanningApiService } from '../ivalue-chain-planning-api.service';
import { IStepData } from '../../../app/value-chain-planning/workstep-matrix/workstep-matrix.shared';
import { map, Observable } from 'rxjs';

@Injectable()
export class WorkstepMatrixService extends IWorkstepMatrixService {

  constructor(
    private readonly localizationService: AppLocalizationService,
    private readonly valueChainPlanningService: IValueChainPlanningApiService) {
    super();
  }

  public getProductionStepForEdit(productId: number, stepId?: number, startStateId?: number, endStateId?: number): Observable<IStepData> {
    return this.valueChainPlanningService
      .getProductionStepForEdit(productId, stepId, startStateId, endStateId)
      .pipe(
        map(this.mapStepData.bind(this))
      )
  }

  public createOrUpdateProductionStep(productionDetailsId: number, stepMeasurementVariants: IStepMeasurementVariants[], stepId?: number, startStateId?: number, endStateId?: number): Observable<void> {
    return this.valueChainPlanningService.createOrUpdateProductionStep(new ProductionStepCreateOrUpdateDto({
      productionDetailsId: productionDetailsId,
      stepId: stepId ?? 0,
      startStateId: startStateId ?? 0,
      endStateId: endStateId ?? 0,
      stepMeasurementVariants: this.mapStepMeasurementVariants(stepMeasurementVariants)
    }));
  }

  public deleteProductionStep(stepId: number): Observable<void> {
    return this.valueChainPlanningService.deleteProductionStep(stepId)
  }

  public getWorkstepMatrixModalLocalisationStrings(): IWorkstepMatrixModalLocalisations {
    return {
      context: this.localizationService.loc('ProductDetails.WorkstepWizard.Title'),
      title: '',
      cancel: this.localizationService.loc('ProductDetails.WorkstepWizard.Cancel'),
      save: this.localizationService.loc('ProductDetails.WorkstepWizard.Save'),
      delete: this.localizationService.loc('ProductDetails.WorkstepWizard.DeleteBtn'),
      matrix: {
        workCostLabel: this.localizationService.loc('ProductDetails.WorkstepMatrix.WorkCostLabel'),
        workHoursLabel: this.localizationService.loc('ProductDetails.WorkstepMatrix.WorkHoursLabel'),
        transportCostLabel: this.localizationService.loc('ProductDetails.WorkstepMatrix.TransportCostLabel'),
        processingTimeLabel: this.localizationService.loc('ProductDetails.WorkstepMatrix.ProcessingTimeLabel'),
        materialCostLabel: this.localizationService.loc('ProductDetails.WorkstepMatrix.MaterialCostLabel'),
        checkboxLabel: this.localizationService.loc('ProductDetails.WorkstepMatrix.CheckboxLabel'),
        sizeCheckboxLabel: this.localizationService.loc('ProductDetails.WorkstepMatrix.SizeCheckboxLabel'),
        inputUnit: this.localizationService.loc('ProductDetails.WorkstepMatrix.InputUnit'),
        hourlyInputUnit: this.localizationService.loc('ProductDetails.WorkstepMatrix.HourlyInputUnit'),
        weeklyInputUnit: this.localizationService.loc('ProductDetails.WorkstepMatrix.WeeklyInputUnit'),
        requiredFieldIndicator: this.localizationService.loc('ProductDetails.WorkstepMatrix.RequiredFieldIndicator'),
        fillAssistant: this.getFillAssistantLocalisations(),
        validationMessages: this.getValidationMessageLocalisations()
      },
      confirmDeletePopup: {
        title: this.localizationService.loc('ProductDetails.WorkstepWizard.DeletePopup.Title'),
        description: this.localizationService.loc('ProductDetails.WorkstepWizard.DeletePopup.Description'),
        confirm: this.localizationService.loc('ProductDetails.WorkstepWizard.DeletePopup.Confirm'),
        cancel: this.localizationService.loc('ProductDetails.WorkstepWizard.DeletePopup.Cancel'),
      }
    }
  }

  private getFillAssistantLocalisations(): IFillAssistantLocalisations {
    return {
      title: this.localizationService.loc('ProductDetails.WorkstepMatrix.FillAssistant.Title'),
      manualOption: this.localizationService.loc('ProductDetails.WorkstepMatrix.FillAssistant.ManualOption'),
      copyOption: this.localizationService.loc('ProductDetails.WorkstepMatrix.FillAssistant.CopyOption'),
      percentageOption: this.localizationService.loc('ProductDetails.WorkstepMatrix.FillAssistant.PercentageOption'),
      sourceLabel: this.localizationService.loc('ProductDetails.WorkstepMatrix.FillAssistant.SourceLabel'),
      percentageLabel: this.localizationService.loc('ProductDetails.WorkstepMatrix.FillAssistant.PercentageLabel'),
      applyButton: this.localizationService.loc('ProductDetails.WorkstepMatrix.FillAssistant.ApplyButton'),
      cancelButton: this.localizationService.loc('ProductDetails.WorkstepMatrix.FillAssistant.CancelButton'),
    };
  }

  private getValidationMessageLocalisations(): IWorkstepMatrixValidationMessages {
    return {
      workHoursRequired: this.localizationService.loc('ProductDetails.WorkstepMatrix.Validation.WorkHoursRequired'),
      processingTimeRequired: this.localizationService.loc('ProductDetails.WorkstepMatrix.Validation.ProcessingTimeRequired'),
      workCostRequired: this.localizationService.loc('ProductDetails.WorkstepMatrix.Validation.WorkCostRequired'),
      transportCostRequired: this.localizationService.loc('ProductDetails.WorkstepMatrix.Validation.TransportCostRequired'),
    };
  }

  private buildGroupDescriptionString(materialGroup: string): string {
    const materialLabel: string = this.localizationService.loc('ProductDetails.WorkstepWizard.Workpiece.Material');
    const materialGroupLabel: string = this.localizationService.getLocalizedMaterialGroupName(materialGroup) || '';

    return materialLabel + ' (' + materialGroupLabel + ')';
  }

  private mapStepData(result: ProductionStepForEditOutput): IStepData {
    return {
      stepId: result.productionStep.stepId,
      startState: this.mapState(result.productionStep.startState),
      endState: this.mapState(result.productionStep.endState),
      stepMeasurementVariants: result.productionStep.stepId === 0 ? this.mapNewStepData(result) : this.mapExistingStepData(result)
    }
  }

  private mapExistingStepData(result: ProductionStepForEditOutput): IStepMeasurementVariants[] {
    const standardMeasurement: MeasurementDto | undefined = result.measurements?.find(measurement => measurement.isDefault);
    if (!standardMeasurement) return [];

    return result.productionStep.stepMeasurementVariants?.map(measurementVariantDto => {
      const currentMeasurement: MeasurementDto | undefined = result.measurements?.find(measurement =>
        measurement.measurementId === measurementVariantDto.measurementId);

      if (!currentMeasurement) {
        return null;
      }

      const unit: string = this.localizationService.loc('Measurement.Unit');

      return {
        stepMeasurementVariantsId: measurementVariantDto.stepMeasurementVariantsId,
        measurementId: measurementVariantDto.measurementId,
        measurementsName: `${currentMeasurement.height} ${unit}, ${currentMeasurement.width} ${unit}, ${currentMeasurement.depth} ${unit}`,
        orderProcessingTime: measurementVariantDto.orderProcessingTime,
        workHours: measurementVariantDto.workHours,
        supplyOtherCraftsInWeeks: measurementVariantDto.supplyOtherCraftsInWeeks,
        transportAndAssemblyCost: measurementVariantDto.transportAndAssemblyCost,
        additionalCosts: measurementVariantDto.additionalCosts,
        measurementVariantType: this.getMeasurementVariantType(currentMeasurement, standardMeasurement),
        workPieceVariantsCost: this.mapExitingVariantData(measurementVariantDto, result)
      };
    }).filter((variant): variant is IStepMeasurementVariants => variant !== null) || [];
  }

  private mapExitingVariantData(measurementVariantDto: StepMeasurementVariantsDto, result: ProductionStepForEditOutput): IWorkPieceVariantsCost[] {
    return measurementVariantDto.workPieceVariantsCost?.map(measurementVariant => {
      const variant: WorkPieceVariantDto | undefined = result.workPieceVariants?.find(wpv => wpv.workPieceVariantId === measurementVariant.workPieceVariantId);

      if (!variant && !measurementVariant.isStandard) {
        return null;
      }

      return {
        workPieceVariantCostId: measurementVariant.workPieceVariantCostId,
        workPieceId: measurementVariant.workPieceId,
        workPieceVariantId: measurementVariant.workPieceVariantId,
        isStandard: measurementVariant.isStandard,
        materialCost: measurementVariant.materialCost,
        workCost: measurementVariant.workCost ?? 0,
        canProduce: measurementVariant.canProduce ? PmCheckboxState.DEFAULT : PmCheckboxState.ACTIVE,
        description: this.getVariantDescription(result.workPiece, variant),
      };
    }).filter((variant): variant is IWorkPieceVariantsCost => variant !== null) || [];
  }

  private getVariantDescription(workPiece: WorkPieceOverview, variant?: WorkPieceVariantDto): IWorkstepMaterialDescription {
    const variantName: string = variant?.workPieceVariantId ? variant.description : workPiece.name;
    return {
      group: this.buildGroupDescriptionString(workPiece.materialGroup.name || ''),
      material: workPiece.finishedState + ', ' + variantName
    }
  }

  private mapNewStepData(result: ProductionStepForEditOutput): IStepMeasurementVariants[] {
    const standardMeasurement: MeasurementDto | undefined = result.measurements?.find(measurement => measurement.isDefault);

    if (!standardMeasurement) return [];

    const unit: string = this.localizationService.loc('Measurement.Unit');
    return result.measurements?.map(measurement => {
      return {
        stepMeasurementVariantsId: 0,
        measurementId: measurement.measurementId ?? 0,
        measurementsName: `${measurement.height} ${unit}, ${measurement.width} ${unit}, ${measurement.depth} ${unit}`,
        orderProcessingTime: 0,
        workHours: 0,
        supplyOtherCraftsInWeeks: 0,
        transportAndAssemblyCost: 0,
        additionalCosts: 0,
        measurementVariantType: this.getMeasurementVariantType(measurement, standardMeasurement),
        workPieceVariantsCost: this.mapNewVariantData(result)
      };
    }) || [];
  }

  private mapNewVariantData(result: ProductionStepForEditOutput): IWorkPieceVariantsCost[] {
    const variants: IWorkPieceVariantsCost[] = [];

    variants.push({
      workPieceVariantCostId: 0,
      workPieceId: result.workPiece.workPieceId ?? 0,
      workPieceVariantId: 0,
      isStandard: true,
      materialCost: 0,
      workCost: 0,
      canProduce: PmCheckboxState.DEFAULT,
      description: this.getVariantDescription(result.workPiece)
    });

    return variants.concat(result.workPieceVariants?.map(variant => ({
      workPieceVariantCostId: 0,
      workPieceId: variant.workPieceId,
      workPieceVariantId: variant.workPieceVariantId ?? 0,
      isStandard: false,
      materialCost: 0,
      workCost: 0,
      canProduce: PmCheckboxState.DEFAULT,
      description: this.getVariantDescription(result.workPiece, variant)
    })) || []);
  }

  private getMeasurementVariantType(measurement: MeasurementDto, standardMeasurement: MeasurementDto): EWorkstepType {

    if (measurement.position === undefined || standardMeasurement.position === undefined) {
      return EWorkstepType.DEFAULT;
    }

    if (measurement.position > standardMeasurement.position) {
      return EWorkstepType.MAX;
    }

    if (measurement.position < standardMeasurement.position) {
      return EWorkstepType.MIN;
    }
    return EWorkstepType.DEFAULT;
  }

  private mapStepMeasurementVariants(stepMeasurementVariants: IStepMeasurementVariants[]): StepMeasurementVariantsDto[] {
    return stepMeasurementVariants.map(measurementVariants => {
      return new StepMeasurementVariantsDto({
        stepMeasurementVariantsId: measurementVariants.stepMeasurementVariantsId,
        measurementId: measurementVariants.measurementId,
        orderProcessingTime: measurementVariants.orderProcessingTime,
        workHours: measurementVariants.workHours,
        supplyOtherCraftsInWeeks: measurementVariants.supplyOtherCraftsInWeeks,
        transportAndAssemblyCost: measurementVariants.transportAndAssemblyCost,
        additionalCosts: measurementVariants.additionalCosts,
        workPieceVariantsCost: this.mapVariantsCost(measurementVariants.workPieceVariantsCost)
      })
    })
  }

  private mapVariantsCost(workPieceVariantsCost: IWorkPieceVariantsCost[]): WorkPieceVariantCostDto[] {
    return workPieceVariantsCost.map(variant => {
      return new WorkPieceVariantCostDto({
        workPieceVariantCostId: variant.workPieceVariantCostId,
        workPieceId: variant.workPieceId,
        workPieceVariantId: variant.workPieceVariantId,
        isStandard: variant.isStandard,
        materialCost: variant.materialCost,
        workCost: variant.workCost,
        canProduce: variant.canProduce !== PmCheckboxState.ACTIVE
      });
    });
  }

  private mapState(productState: ProductionStateDto): IProductGraphState {
    return {
      stateId: productState.stateId,
      label: productState.description ?? '',
      nextId: productState.nextStateId,
      type: this.valueChainPlanningService.getStateType(productState.stateType),
      productionDetailsId: productState.productionDetailsId,
    };
  }
}
