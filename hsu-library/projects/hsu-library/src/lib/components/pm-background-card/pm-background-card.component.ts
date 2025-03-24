import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  Icon
} from '../pm-icon/pm-icon.shared';
import {
  ButtonType
} from '../pm-button/pm-button.component';
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
} from '../pm-card/pm-card.shared';


@Component({
  selector: 'pm-background-card',
  templateUrl: './pm-background-card.component.html',
  styleUrls: ['pm-background-card.component.scss'],
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

export class PmBackgroundCardComponent {

  @Input()
  hasHeader: boolean = true;

  @Input()
  title: string = '';

  @Input()
  value: string = this.title;

  @Input()
  collapsible: boolean = false;

  @Input()
  collapsed: boolean = false;

  @Input()
  disabled: boolean = false;

  @Input()
  noShadow: boolean = false;

  @Input()
  datepicker: boolean = false;

  @Input()
  datepickerTitle: string = '';

  @Input()
  datepickerDate: string = '';

  @Input()
  datepickerOnlyDate: boolean = false;

  @Input()
  datepickerDisabled: boolean = false;

  @Input()
  timer: boolean = false;

  @Input()
  timerDisabled: boolean = false;

  @Input()
  edit: boolean = false;

  @Input()
  editDisabled: boolean = false;

  @Input()
  primaryBtn: boolean = false;

  @Input()
  primaryBtnDisabled: boolean = false;

  @Input()
  primaryBtnLabel: string = '';

  @Output()
  onClicked: EventEmitter<string> = new EventEmitter();

  /** @ignore */
  protected readonly EIcon: typeof Icon = Icon;

  /** @ignore */
  protected readonly EButtonType: typeof ButtonType = ButtonType;

  /** @ignore */
  onClickButton() {
    this.onClicked.emit(this.value);
  }
}
