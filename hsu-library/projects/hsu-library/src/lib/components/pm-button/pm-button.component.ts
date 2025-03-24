import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  Icon,
  IconSize
} from '../pm-icon/pm-icon.shared';
import {
  PmComponentMargin,
  IComponentMargin
} from '../../utils/pm-component-margin';

export enum ButtonType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  ICON = 'icon',
  ICON_GREEN = 'green-icon',
  ICON_RED = 'green-red',
  ICON_GHOST = 'ghost-icon'
}

export enum IconPosition {
  LEFT = 'left',
  RIGHT = 'right',
}

@Component({
  selector: 'pm-button',
  templateUrl: './pm-button.component.html',
  styleUrls: ['./pm-button.component.scss']
})

export class PmButtonComponent {
  @Input()
  label: string = '';

  @Input()
  value: string = this.label;

  @Input()
  type: ButtonType = ButtonType.PRIMARY;

  @Input()
  icon?: Icon = undefined;

  @Input()
  iconRotation: number = 0;

  @Input()
  iconPosition: IconPosition = IconPosition.RIGHT;

  @Input()
  active: boolean = false;

  @Input()
  disabled: boolean = false;

  @Input()
  fullWidth: boolean = false;

  @Input()
  margin: IComponentMargin = new PmComponentMargin();

  @Output()
  onClicked: EventEmitter<string> = new EventEmitter();

  /** @ignore */
  readonly Icon: typeof Icon = Icon;

  /** @ignore */
  readonly IconPosition: typeof IconPosition = IconPosition;

  /** @ignore */
  readonly IconSize: typeof IconSize = IconSize;

  /** @ignore */
  readonly ButtonType: typeof ButtonType = ButtonType;

  /** @ignore */
  clickOnButton() {
    this.onClicked.emit(this.value);
  }
}
