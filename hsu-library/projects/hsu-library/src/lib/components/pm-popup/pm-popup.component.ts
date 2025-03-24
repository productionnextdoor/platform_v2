import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import { Icon } from '../pm-icon/pm-icon.shared';

export enum PopupType {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

@Component({
  selector: 'pm-popup',
  templateUrl: './pm-popup.component.html',
  styleUrls: ['./pm-popup.component.scss']
})
export class PmPopupComponent {
  @Input()
  hasHeader: boolean = true;

  @Input()
  context: string = '';

  @Input()
  title: string = '';

  @Input()
  titleIcon?: Icon;

  @Input()
  closable: boolean = true;

  @Input()
  type: PopupType = PopupType.SMALL;

  @Output()
  onClose: EventEmitter<void> = new EventEmitter();

  /** @ignore */
  readonly PopupType: typeof PopupType = PopupType;

  /**
   * @ignore
   */
  onCloseHandler(): void {
    this.onClose.emit();
  }
}
