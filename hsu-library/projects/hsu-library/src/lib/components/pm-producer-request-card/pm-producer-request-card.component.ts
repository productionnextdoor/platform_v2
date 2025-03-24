import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  IProducerResponseRequestLocalisation,
  producerResponseRequestLocalisation
} from './pm-producer-request-card.shared';
import { ButtonType } from '../pm-button/pm-button.component';
import { TextType } from '../pm-text/pm-text.shared';
import {
  DefaultMargins,
  PmComponentMargin
} from '../../utils/pm-component-margin';

@Component({
  selector: 'pm-producer-request-card',
  templateUrl: './pm-producer-request-card.component.html',
  styleUrls: ['./pm-producer-request-card.component.scss']
})
export class PmProducerRequestCardComponent {

  protected readonly ButtonType: typeof ButtonType = ButtonType;
  protected readonly TextType: typeof TextType = TextType;
  protected readonly defaultTextMargin: PmComponentMargin = new PmComponentMargin(0, 0, DefaultMargins.Large);

  @Input()
  localisationStrings: IProducerResponseRequestLocalisation = producerResponseRequestLocalisation;

  @Output()
  onButtonClick: EventEmitter<boolean> = new EventEmitter();

}
