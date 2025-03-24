import {
  IStepItem
} from '../../../lib/components/pm-steps/pm-steps.shared';

export interface IStepsData {
  steps: IStepItem[],
}

export const StepsData: IStepsData = {
  steps: [
    {
      title: 'Allgemeine Angaben',
      value: '1',
      active: false,
      disabled: false,
    },

    {
      title: 'Materialstückgruppen',
      value: '2',
      active: true,
      disabled: false,
    },

    {
      title: 'Produktvarianten',
      value: '3',
      active: false,
      disabled: true,
    }
  ]
}
