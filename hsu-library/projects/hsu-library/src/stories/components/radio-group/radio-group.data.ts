import { IRadioButtonData } from '../../../lib/components/pm-radiobutton/pm-radiobutton.shared';

export const radioGroupData: { radioGroup: IRadioButtonData[] } = {
  radioGroup: [
    {
      radioButtonId: '1',
      disabled: false,
      groupName: 'firstGroup',
      state: false,
      text: 'first radio'
    },
    {
      radioButtonId: '2',
      disabled: true,
      groupName: 'firstGroup',
      state: false,
      text: 'second radio'
    },
    {
      radioButtonId: '3',
      disabled: false,
      groupName: 'firstGroup',
      state: true,
      text: 'third radio'
    }
  ]
}
