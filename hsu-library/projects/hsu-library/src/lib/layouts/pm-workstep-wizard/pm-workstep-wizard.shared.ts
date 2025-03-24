import {
  IPmWizardLocalisations,
  wizardLocalisations
} from '../../components/pm-wizard/pm-wizard.shared';
import {
  IWorkstepDataLocalisations,
  WorkstepDataLocalisations
} from './pm-workstep-data/pm-workstep-data.shared';
import { PmCheckboxState } from '../../components/pm-checkbox/pm-checkbox.shared';
import {
  IPmConfirmPopupLocalisations,
  pmConfirmPopupLocalisations
} from '../pm-confirm-popup/pm-confirm-popup.shared';

export enum EWorkstepType {
  DEFAULT,
  MAX,
  MIN
}

export interface IWorkstepWizardLocalisations {
  context: string;
  steps: IWorkstepWizardStepsLocalisations;
  wizard: IPmWizardLocalisations;
  workstepData: IWorkstepDataLocalisations;
  infoBanner: string;
  deleteBtn: string
  confirmDeletePopup: IPmConfirmPopupLocalisations;
}

export interface IWorkstepWizardStepsLocalisations {
  default: string;
  max: string;
  min: string;
}

export interface IWorkstepWizardMaterialDescription {
  material: string;
  group: string;
}

export interface IStepMeasurementVariants {
  stepMeasurementVariantsId: number;
  measurementId: number;
  measurementsName: string;
  orderProcessingTime: number;
  workHours: number;
  supplyOtherCraftsInWeeks: number;
  transportAndAssemblyCost: number;
  additionalCosts: number;
  measurementVariantType: EWorkstepType
  workPieceVariantsCost: IWorkPieceVariantsCost[];
}

export interface IWorkPieceVariantsCost {
  workPieceVariantCostId: number;
  workPieceId: number;
  workPieceVariantId: number;
  isStandard: boolean;
  materialCost: number;
  canProduce: PmCheckboxState;
  description: IWorkstepWizardMaterialDescription
}

export const WorkstepWizardStepsLocalisations: IWorkstepWizardStepsLocalisations = {
  default: '',
  max: '',
  min: ''
}

export const WorkstepWizardLocalisations: IWorkstepWizardLocalisations = {
  context: '',
  steps: WorkstepWizardStepsLocalisations,
  wizard: wizardLocalisations,
  workstepData: WorkstepDataLocalisations,
  infoBanner: '',
  deleteBtn: '',
  confirmDeletePopup: pmConfirmPopupLocalisations
}

export class WorkstepMaterialDescriptions implements IWorkstepWizardMaterialDescription {
  material: string = '';
  group: string = '';
}

export class WorkPieceVariantsCost implements IWorkPieceVariantsCost {
  workPieceVariantCostId: number = 0;
  workPieceId: number = 0;
  workPieceVariantId: number = 0;
  isStandard: boolean = true;
  materialCost: number = 0;
  canProduce: PmCheckboxState = PmCheckboxState.DEFAULT;
  description: IWorkstepWizardMaterialDescription = new WorkstepMaterialDescriptions();
}

export class StepMeasurementVariants implements IStepMeasurementVariants {
  stepMeasurementVariantsId: number = 0;
  measurementId: number = 0;
  measurementsName: string = '';
  orderProcessingTime: number = 0;
  workHours: number = 0;
  supplyOtherCraftsInWeeks: number = 0;
  transportAndAssemblyCost: number = 0;
  additionalCosts: number = 0;
  measurementVariantType: EWorkstepType = EWorkstepType.DEFAULT;
  workPieceVariantsCost: IWorkPieceVariantsCost[] = [new WorkPieceVariantsCost()];
}


