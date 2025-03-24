import {
  Component, Input
} from '@angular/core';
import {
  Icon, IconSize
} from './pm-icon.shared';

@Component({
  selector: 'pm-icon',
  templateUrl: './pm-icon.component.html',
  styleUrls: ['./pm-icon.component.scss']
})
export class PmIconComponent {
  @Input()
  size: number | typeof IconSize = IconSize.M;

  @Input()
  rotate: number = 0;

  @Input()
  icon: Icon = Icon.ADD;

  /** @ignore */
  readonly EIconSize: typeof IconSize = IconSize;
}
