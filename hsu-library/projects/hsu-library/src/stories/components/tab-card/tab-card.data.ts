import { ITab, ITabButton } from '../../../lib/components/pm-tab-card/pm-tab-card.shared';
import { ButtonType } from '../../../lib/components/pm-button/pm-button.component';

export interface ITabCardData {
  tabs: ITab<string>[];
  buttons: ITabButton[];

}

export const tabCardData: ITabCardData = {
  tabs: [
    {
      text: 'Tab one',
      value: 'tab one',
      active: true
    },
    {
      text: 'Tab two',
      value: 'tab two',
      active: false
    },
    {
      text: 'Tab three',
      value: 'tab three',
      active: false
    },
    {
      text: 'Tab four',
      value: 'tab four',
      active: false
    },
    {
      text: 'Tab five',
      value: 'tab five',
      active: false
    },
  ],
  buttons: [
    {
      text: 'Some test Button',
      value: 'button',
      type: ButtonType.SECONDARY,
      disabled:false
    },
    {
      text: 'Another test Button',
      value: 'button',
      type: ButtonType.SECONDARY,
      disabled:true
    },
  ]
}
