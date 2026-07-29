import {
  IWorkstepMatrixModalLocalisations
} from '../../../lib/layouts/pm-workstep-matrix-modal/pm-workstep-matrix-modal.shared';
import {
  EWorkstepType,
  IStepMeasurementVariants
} from '../../../lib/layouts/pm-workstep-matrix/pm-workstep-matrix.shared';
import { PmCheckboxState } from '../../../lib/components/pm-checkbox/pm-checkbox.shared';

export interface IWorkstepMatrixModalData {
  localisations: IWorkstepMatrixModalLocalisations;
  stepId: number;
  startStateName: string;
  finalStateName: string;
  stepMeasurementVariants: IStepMeasurementVariants[];
  readonly: boolean;
  showDeleteButton: boolean;
}

const localisations: IWorkstepMatrixModalLocalisations = {
  context: 'Produktionsschritt bearbeiten',
  title: 'Kostenmatrix',
  cancel: 'Abbrechen',
  save: 'Speichern',
  delete: 'Löschen',
  matrix: {
    workCostLabel: 'Arbeitskosten',
    workHoursLabel: 'Arbeitsstunden',
    transportCostLabel: 'Transport- & Montagekosten',
    processingTimeLabel: 'Bearbeitungszeit',
    materialCostLabel: 'Materialkosten',
    checkboxLabel: 'Kann nicht produziert werden',
    sizeCheckboxLabel: 'Kann nicht produziert werden',
    inputUnit: '€',
    hourlyInputUnit: 'Std.',
    weeklyInputUnit: 'Wochen',
    requiredFieldIndicator: '*',
    fillAssistant: {
      title: 'Befüllungsassistent',
      manualOption: 'Manuell eingeben',
      copyOption: 'Werte kopieren von',
      percentageOption: 'Prozentual berechnen',
      sourceLabel: 'Quelle',
      percentageLabel: 'Prozent',
      applyButton: 'Anwenden',
      cancelButton: 'Abbrechen'
    },
    validationMessages: {
      workHoursRequired: 'Arbeitsstunden sind erforderlich',
      processingTimeRequired: 'Bearbeitungszeit ist erforderlich',
      workCostRequired: 'Arbeitskosten sind erforderlich',
      transportCostRequired: 'Transportkosten sind erforderlich'
    }
  },
  confirmDeletePopup: {
    title: 'Schritt löschen',
    description: 'Möchten Sie diesen Produktionsschritt wirklich löschen?',
    confirm: 'Löschen',
    cancel: 'Abbrechen'
  }
};

const stepMeasurementVariants: IStepMeasurementVariants[] = [
  {
    stepMeasurementVariantsId: 1,
    measurementId: 100,
    measurementsName: 'Standardgröße',
    orderProcessingTime: 4,
    workHours: 120,
    supplyOtherCraftsInWeeks: 2,
    transportAndAssemblyCost: 500,
    additionalCosts: 0,
    measurementVariantType: EWorkstepType.DEFAULT,
    workPieceVariantsCost: [
      {
        workPieceVariantCostId: 1,
        workPieceId: 10,
        workPieceVariantId: 1,
        isStandard: true,
        materialCost: 1200,
        workCost: 3500,
        canProduce: PmCheckboxState.DEFAULT,
        description: {
          group: 'Holz',
          material: 'Eiche massiv'
        }
      },
      {
        workPieceVariantCostId: 2,
        workPieceId: 10,
        workPieceVariantId: 2,
        isStandard: false,
        materialCost: 800,
        workCost: 3500,
        canProduce: PmCheckboxState.DEFAULT,
        description: {
          group: 'Holz',
          material: 'Buche furniert'
        }
      }
    ]
  },
  {
    stepMeasurementVariantsId: 2,
    measurementId: 101,
    measurementsName: 'Maximalgröße',
    orderProcessingTime: 6,
    workHours: 160,
    supplyOtherCraftsInWeeks: 3,
    transportAndAssemblyCost: 750,
    additionalCosts: 0,
    measurementVariantType: EWorkstepType.MAX,
    workPieceVariantsCost: [
      {
        workPieceVariantCostId: 3,
        workPieceId: 10,
        workPieceVariantId: 1,
        isStandard: true,
        materialCost: 1800,
        workCost: 4500,
        canProduce: PmCheckboxState.DEFAULT,
        description: {
          group: 'Holz',
          material: 'Eiche massiv'
        }
      }
    ]
  }
];

export const workstepMatrixModalDefault: IWorkstepMatrixModalData = {
  localisations,
  stepId: 1,
  startStateName: 'Rohholz',
  finalStateName: 'Zugeschnitten',
  stepMeasurementVariants,
  readonly: false,
  showDeleteButton: true
};

export const workstepMatrixModalReadonly: IWorkstepMatrixModalData = {
  localisations,
  stepId: 1,
  startStateName: 'Rohholz',
  finalStateName: 'Zugeschnitten',
  stepMeasurementVariants,
  readonly: true,
  showDeleteButton: false
};
