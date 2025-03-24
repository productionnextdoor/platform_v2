import { Component, Input } from '@angular/core';

export const DEFAULT_ROW_GAP: number = 16;

@Component({
  selector: 'pm-row',
  templateUrl: './pm-row.component.html',
  styleUrls: ['./pm-row.component.scss']
})
export class PmRowComponent {
  @Input()
  gap: number = DEFAULT_ROW_GAP;

  @Input()
  template: string = '1fr';
}
