import {
  IFillAssistantLocalisations,
  IFillSourceOption,
  IFillRule,
  EFillMode
} from '../../../lib/layouts/pm-workstep-matrix/pm-workstep-matrix.shared';

export interface IMatrixFillPopoverData {
  localisations: IFillAssistantLocalisations;
  sourceOptions: IFillSourceOption[];
  currentRule?: IFillRule;
}

export const matrixFillPopoverDefault: IMatrixFillPopoverData = {
  localisations: {
    title: 'Befüllungsassistent',
    manualOption: 'Manuell eingeben',
    copyOption: 'Werte kopieren von',
    percentageOption: 'Prozentual berechnen',
    sourceLabel: 'Quelle',
    percentageLabel: 'Prozent',
    applyButton: 'Anwenden',
    cancelButton: 'Abbrechen'
  },
  sourceOptions: [
    {
      sourceId: 'col-1',
      label: 'Standardgröße'
    },
    {
      sourceId: 'col-2',
      label: 'Maximalgröße'
    },
    {
      sourceId: 'col-3',
      label: 'Minimalgröße'
    }
  ]
};

export const matrixFillPopoverWithRule: IMatrixFillPopoverData = {
  localisations: matrixFillPopoverDefault.localisations,
  sourceOptions: matrixFillPopoverDefault.sourceOptions,
  currentRule: {
    mode: EFillMode.PERCENTAGE,
    sourceId: 'col-1',
    percentage: 110
  }
};
