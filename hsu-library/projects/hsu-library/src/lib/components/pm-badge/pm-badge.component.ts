import {Component, Input} from '@angular/core';

@Component({
  selector: 'pm-badge',
  templateUrl: './pm-badge.component.html',
  styleUrls: ['./pm-badge.component.scss']
})
export class PmBadgeComponent {
  @Input()
  text: string = '';

  @Input()
  negative: boolean = false;
}
