import { Component, Input } from '@angular/core';

export const DEFAULT_COL_GAP: number = 16;

@Component({
  selector: 'pm-col',
  templateUrl: './pm-col.component.html',
  styleUrls: ['./pm-col.component.scss']
})
export class PmColComponent {
  @Input()
  gap: number = DEFAULT_COL_GAP;

  @Input()
  template: string = 'auto';

  @Input()
  hasFullHeight: boolean = false;
}
