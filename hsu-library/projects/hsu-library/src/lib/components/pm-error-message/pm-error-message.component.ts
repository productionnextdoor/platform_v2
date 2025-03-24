import { Component, Input } from '@angular/core';
import { Icon, IconSize } from '../pm-icon/pm-icon.shared';

@Component({
  selector: 'pm-error-message',
  templateUrl: './pm-error-message.component.html',
  styleUrls: ['./pm-error-message.component.scss']
})
export class PmErrorMessageComponent {
  protected readonly Icon: typeof Icon = Icon;
  protected readonly IconSize: typeof IconSize = IconSize;

  @Input()
  errorMessages: string[] = [];
}
