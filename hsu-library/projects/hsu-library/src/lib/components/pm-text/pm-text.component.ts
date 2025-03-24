import { Component, Input } from '@angular/core';
import { TextType } from './pm-text.shared';
import { PmComponentMargin, IComponentMargin } from '../../utils/pm-component-margin';

@Component({
  selector: 'pm-text',
  templateUrl: './pm-text.component.html',
  styleUrls: ['./pm-text.component.scss']
})
export class PmTextComponent {
  @Input()
  type: TextType = TextType.H1;

  @Input()
  margin: IComponentMargin = new PmComponentMargin();

  /** @ignore */
  readonly ETextType = TextType;
}
