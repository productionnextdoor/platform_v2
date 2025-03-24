import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import { TextType } from '../../components/pm-text/pm-text.shared';
import { ButtonType } from '../../components/pm-button/pm-button.component';
import {
  productGraphCardLocalisations,
  graphKeys,
  IProductGraphCardLocalisations,
  IGraphKeys
} from './pm-product-graph-card.shared';
import {
  DefaultMargins,
  PmComponentMargin
} from '../../utils/pm-component-margin';
import {
  Icon,
  IconSize
} from '../../components/pm-icon/pm-icon.shared';

@Component({
  selector: 'pm-product-graph-card',
  templateUrl: './pm-product-graph-card.component.html',
  styleUrls: ['./pm-product-graph-card.component.scss']
})

export class PmProductGraphCardComponent {

  @Input()
  public cardTitle: string = '';

  @Input()
  public description: string = '';

  @Input()
  public buttonLabel: string = '';

  @Input()
  public noShadow: boolean = false;

  @Input()
  public isProducerCard: boolean = true;

  @Input()
  public readyForCalculating: boolean = true;

  @Input()
  public graphKeys: IGraphKeys = graphKeys;

  @Input()
  public localisations: IProductGraphCardLocalisations = productGraphCardLocalisations;

  @Output()
  public onClicked: EventEmitter<string> = new EventEmitter();

  /** @ignore */
  protected readonly descriptionMargin: PmComponentMargin = new PmComponentMargin(0, 0, 0, DefaultMargins.Small);

  /** @ignore */
  protected readonly keyMargin: PmComponentMargin = new PmComponentMargin(0, 0, 0, DefaultMargins.Small);

  /** @ignore */
  protected readonly TextType: typeof TextType = TextType;

  /** @ignore */
  protected readonly ButtonType: typeof ButtonType = ButtonType;

  /** @ignore */
  protected readonly Icon: typeof Icon = Icon;

  /** @ignore */
  protected readonly IconSize: typeof IconSize = IconSize;
}
