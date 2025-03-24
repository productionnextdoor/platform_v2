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
import { ButtonType } from '../pm-button/pm-button.component';
import {
  animate,
  AUTO_STYLE,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  DEFAULT_DURATION,
  DEFAULT_HEIGHT
} from './pm-card.shared';

@Component({
  selector: 'pm-card',
  templateUrl: './pm-card.component.html',
  styleUrls: ['./pm-card.component.scss'],
  animations: [
    trigger('collapse', [
      state('false', style({
        height: AUTO_STYLE,
      })),
      state('true', style({
        height: DEFAULT_HEIGHT,
      })),
      transition('false => true', animate(DEFAULT_DURATION)),
      transition('true => false', animate(DEFAULT_DURATION))
    ])
  ]
})
export class PmCardComponent {
  @Input()
  hasHeader: boolean = true;

  @Input()
  context: string = '';

  @Input()
  title: string = '';

  @Input()
  titleIcon?: Icon;

  @Input()
  badgeText: string = '';

  @Input()
  badgeNegative: boolean = true;

  @Input()
  closable: boolean = false;

  @Input()
  collapsible: boolean = false;

  @Input()
  collapsed: boolean = false;

  @Input()
  disabled: boolean = false;

  @Input()
  noShadow: boolean = false;

  @Input()
  contentPadding: boolean = true;

  // if fullHeight is true, the card will not be collapsible
  @Input()
  fullHeight: boolean = false;

  @Output()
  onCollapse: EventEmitter<void> = new EventEmitter();

  @Output()
  onClose: EventEmitter<void> = new EventEmitter();

  /** @ignore */
  protected readonly EIcon: typeof Icon = Icon;

  /** @ignore */
  protected readonly EButtonType: typeof ButtonType = ButtonType;

  /** @ignore */
  protected readonly IconSize: typeof IconSize = IconSize;

  /** @ignore */
  protected readonly Icon: typeof Icon = Icon;

  /** @ignore */
  onCollapseHandler(): void {
    this.collapsed = !this.collapsed;

    this.onCollapse.emit();
  }

  /** @ignore */
  onCloseHandler(): void {
    this.onClose.emit();
  }
}
