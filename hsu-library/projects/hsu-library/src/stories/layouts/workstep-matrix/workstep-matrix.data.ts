import {
  EWorkstepType,
  IStepMeasurementVariants,
  IWorkstepMatrixLocalisations
} from '../../../lib/layouts/pm-workstep-matrix/pm-workstep-matrix.shared';
import { PmCheckboxState } from '../../../lib/components/pm-checkbox/pm-checkbox.shared';

export interface IWorkstepMatrixData {
  stepMeasurementVariants: IStepMeasurementVariants[];
  localisations: IWorkstepMatrixLocalisations;
  readonly: boolean;
}

const localisations: IWorkstepMatrixLocalisations = {
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
      },
      {
        workPieceVariantCostId: 4,
        workPieceId: 10,
        workPieceVariantId: 2,
        isStandard: false,
        materialCost: 1100,
        workCost: 4500,
        canProduce: PmCheckboxState.DEFAULT,
        description: {
          group: 'Holz',
          material: 'Buche furniert'
        }
      }
    ]
  },
  {
    stepMeasurementVariantsId: 3,
    measurementId: 102,
    measurementsName: 'Minimalgröße',
    orderProcessingTime: 3,
    workHours: 80,
    supplyOtherCraftsInWeeks: 1,
    transportAndAssemblyCost: 300,
    additionalCosts: 0,
    measurementVariantType: EWorkstepType.MIN,
    workPieceVariantsCost: [
      {
        workPieceVariantCostId: 5,
        workPieceId: 10,
        workPieceVariantId: 1,
        isStandard: true,
        materialCost: 900,
        workCost: 2500,
        canProduce: PmCheckboxState.DEFAULT,
        description: {
          group: 'Holz',
          material: 'Eiche massiv'
        }
      },
      {
        workPieceVariantCostId: 6,
        workPieceId: 10,
        workPieceVariantId: 2,
        isStandard: false,
        materialCost: 600,
        workCost: 2500,
        canProduce: PmCheckboxState.DEFAULT,
        description: {
          group: 'Holz',
          material: 'Buche furniert'
        }
      }
    ]
  }
];

export const workstepMatrixDefault: IWorkstepMatrixData = {
  stepMeasurementVariants,
  localisations,
  readonly: false
};

export const workstepMatrixReadonly: IWorkstepMatrixData = {
  stepMeasurementVariants,
  localisations,
  readonly: true
};
