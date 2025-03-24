import { PmCheckboxState } from '../../../lib/components/pm-checkbox/pm-checkbox.shared';

export interface ICheckboxData {
    disabled: boolean;
    hovered: boolean;
    state: PmCheckboxState;
    hasError: boolean;
}

export const CheckboxData: ICheckboxData = {
  disabled: false,
  hovered: false,
  state: PmCheckboxState.DEFAULT,
  hasError: false
}
