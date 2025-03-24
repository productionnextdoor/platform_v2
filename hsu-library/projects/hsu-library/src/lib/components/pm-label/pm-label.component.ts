import {
  Component, Input
} from '@angular/core';

@Component({
  selector: 'pm-label',
  templateUrl: './pm-label.component.html',
  styleUrls: ['./pm-label.component.scss']
})
export class PmLabelComponent {
  @Input()
  text: string = '';

  @Input()
  for: string = '';

  @Input()
  inline: boolean = false;

  @Input()
  required: boolean = false;

  @Input()
  bold: boolean = false;
}
