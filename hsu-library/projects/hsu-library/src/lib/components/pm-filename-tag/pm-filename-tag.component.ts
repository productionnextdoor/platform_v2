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

@Component({
  selector: 'pm-filename-tag',
  templateUrl: './pm-filename-tag.component.html',
  styleUrls: ['./pm-filename-tag.component.scss']
})

export class PmFilenameTagComponent {
  @Input()
  label: string = '';

  @Input()
  value: string = this.label;

  @Input()
  icon: Icon = Icon.PDF_FILE;

  @Output()
  onClick: EventEmitter<string> = new EventEmitter();

  /** @ignore */
  readonly EIcon: typeof Icon = Icon;

  /** @ignore */
  readonly EIconSize: typeof IconSize = IconSize

  /** @ignore */
  onClickButton() {
    this.onClick.emit(this.value);
  }
}



