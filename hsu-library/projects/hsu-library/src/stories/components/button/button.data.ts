import { ButtonType, IconPosition, } from '../../../lib/components/pm-button/pm-button.component';
import { Icon } from '../../../lib/components/pm-icon/pm-icon.shared';
import { PmComponentMargin, IComponentMargin } from '../../../lib/utils/pm-component-margin';

interface IButtonData {
  iconRotation: number;
  icon?: Icon;
  iconPosition: IconPosition;
  active: boolean;
  disabled: boolean;
  label: string;
  value: string;
  type: ButtonType;
  fullWidth: boolean;
  margin: IComponentMargin;
}

export const ButtonData: IButtonData = {
  label: 'Button',
  value: 'btn_value',
  type: ButtonType.PRIMARY,
  active: false,
  disabled: false,
  iconPosition: IconPosition.RIGHT,
  iconRotation: 0,
  fullWidth: false,
  margin: new PmComponentMargin()
}
