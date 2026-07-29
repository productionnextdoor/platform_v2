import { PmCheckboxState } from '../../components/pm-checkbox/pm-checkbox.shared';

export enum EWorkstepType {
  DEFAULT,
  MAX,
  MIN
}

export interface IWorkstepMaterialDescription {
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
  measurementVariantType: EWorkstepType;
  workPieceVariantsCost: IWorkPieceVariantsCost[];
  canProduce?: PmCheckboxState;
}

export interface IWorkPieceVariantsCost {
  workPieceVariantCostId: number;
  workPieceId: number;
  workPieceVariantId: number;
  isStandard: boolean;
  materialCost: number;
  workCost: number;
  canProduce: PmCheckboxState;
  description: IWorkstepMaterialDescription;
}

/**
 * Fill mode options for the fill assistant
 */
export enum EFillMode {
  MANUAL = 'manual',
  COPY = 'copy',
  PERCENTAGE = 'percentage'
}

/**
 * Defines how a row or column should be auto-filled
 */
export interface IFillRule {
  mode: EFillMode;
  sourceId?: string;       // rowId or columnId of the source
  percentage?: number;     // e.g. 110 for 110%
}

/**
 * Represents an available source option for the fill assistant dropdown
 */
export interface IFillSourceOption {
  sourceId: string;
  label: string;
}

/**
 * Represents a single cell in the matrix
 */
export interface IMatrixCell {
  value: number;
  isEditable: boolean;
  isRequired: boolean;
  measurementId: number;
  workPieceVariantId?: number;
  workPieceId?: number;
}

/**
 * Represents a row in the matrix
 */
export interface IMatrixRow {
  rowId: string;
  rowType: EMatrixRowType;
  label: string;
  cells: IMatrixCell[];
  workPieceVariantCostId?: number;
  description?: {
    material: string;
    group: string;
  };
  isStandard?: boolean;
  canProduce?: PmCheckboxState;
  fillRule?: IFillRule;
}

/**
 * Represents a column in the matrix (Measurement variant)
 */
export interface IMatrixColumn {
  columnId: string;
  measurementId: number;
  measurementName: string;
  measurementType: EWorkstepType;
  isStandard: boolean;
  canProduce: PmCheckboxState;
  fillRule?: IFillRule;
}

/**
 * Main matrix data structure
 */
export interface IWorkstepMatrixData {
  columns: IMatrixColumn[];
  rows: IMatrixRow[];
}

/**
 * Row types in the matrix
 */
export enum EMatrixRowType {
  MATERIAL_VARIANT = 'material_variant',
  WORK_COST = 'work_cost',
  WORK_HOURS = 'work_hours',
  TRANSPORT_COST = 'transport_cost',
  PROCESSING_TIME = 'processing_time'
}

/**
 * Localisations for the fill assistant popover
 */
export interface IFillAssistantLocalisations {
  title: string;
  manualOption: string;
  copyOption: string;
  percentageOption: string;
  sourceLabel: string;
  percentageLabel: string;
  applyButton: string;
  cancelButton: string;
}

/**
 * Localisations for the matrix component
 */
export interface IWorkstepMatrixLocalisations {
  workCostLabel: string;
  workHoursLabel: string;
  transportCostLabel: string;
  processingTimeLabel: string;
  materialCostLabel: string;
  checkboxLabel: string;
  sizeCheckboxLabel: string;
  inputUnit: string;
  hourlyInputUnit: string;
  weeklyInputUnit: string;
  requiredFieldIndicator: string;
  fillAssistant: IFillAssistantLocalisations;
  validationMessages: IWorkstepMatrixValidationMessages;
}

export interface IWorkstepMatrixValidationMessages {
  workHoursRequired: string;
  processingTimeRequired: string;
  workCostRequired: string;
  transportCostRequired: string;
}

export const FillAssistantLocalisations: IFillAssistantLocalisations = {
  title: '',
  manualOption: '',
  copyOption: '',
  percentageOption: '',
  sourceLabel: '',
  percentageLabel: '',
  applyButton: '',
  cancelButton: ''
};

export const WorkstepMatrixValidationMessages: IWorkstepMatrixValidationMessages = {
  workHoursRequired: '',
  processingTimeRequired: '',
  workCostRequired: '',
  transportCostRequired: ''
};

export const WorkstepMatrixLocalisations: IWorkstepMatrixLocalisations = {
  workCostLabel: '',
  workHoursLabel: '',
  transportCostLabel: '',
  processingTimeLabel: '',
  materialCostLabel: '',
  checkboxLabel: '',
  sizeCheckboxLabel: '',
  inputUnit: '',
  hourlyInputUnit: '',
  weeklyInputUnit: '',
  requiredFieldIndicator: '',
  fillAssistant: FillAssistantLocalisations,
  validationMessages: WorkstepMatrixValidationMessages
};
