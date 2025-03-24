import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  defaultOrderProdRequestData,
  IOrderProdRequestData,
  IOrderProdRequestLocalisations,
  IProducerOrderAction,
  orderProdRequestLocalisations,
} from './pm-order-producer-request-card.shared';
import {
  DefaultMargins,
  IMargin,
  PmComponentMargin
} from '../../../utils/pm-component-margin';
import { PopupType } from '../../../components/pm-popup/pm-popup.component';
import { ButtonType } from '../../../components/pm-button/pm-button.component';
import { TextType } from '../../../components/pm-text/pm-text.shared';


@Component({
  selector: 'pm-order-producer-request-card',
  templateUrl: './pm-order-producer-request-card.component.html',
  styleUrls: ['./pm-order-producer-request-card.component.scss']
})
export class PmOrderProducerRequestCardComponent {

  @Input()
  public stepId: number = 0;

  @Input()
  public responseNeeded: boolean = false;

  @Input()
  public badgeText: string = '';

  @Input()
  public badgeNegative: boolean = false;

  @Input()
  public orderRequestData: IOrderProdRequestData = defaultOrderProdRequestData;

  @Input()
  public localisations: IOrderProdRequestLocalisations = orderProdRequestLocalisations;

  @Input()
  public loading: boolean = false;

  @Output()
  public onProducerActionEvent: EventEmitter<IProducerOrderAction> = new EventEmitter<IProducerOrderAction>;

  /** @ignore */
  protected showConfirmPopup: boolean = false;

  /** @ignore */
  protected readonly descriptionMargin: PmComponentMargin = new PmComponentMargin(0, 0, DefaultMargins.XLarge, 0);

  /** @ignore */
  protected readonly buttonMargin: PmComponentMargin = new PmComponentMargin(0, DefaultMargins.Medium, 0, 0);

  /** @ignore */
  protected readonly margins: IMargin = DefaultMargins;

  /** @ignore */
  protected readonly sectionMargin: PmComponentMargin = new PmComponentMargin(0, 0, DefaultMargins.Small, 0);

  /** @ignore */
  protected readonly topMargin: PmComponentMargin = new PmComponentMargin(DefaultMargins.XLarge, 0, DefaultMargins.Small, 0);

  /** @ignore */
  protected readonly PopupType: typeof PopupType = PopupType;

  /** @ignore */
  protected readonly ButtonType: typeof ButtonType = ButtonType;

  /** @ignore */
  protected readonly TextType: typeof TextType = TextType;


  onProducerAction(accepted: boolean) {
    this.onProducerActionEvent.emit({
      stepId: this.stepId,
      accepted: accepted
    })
  }

  onAccept() {
    this.showConfirmPopup = false;
    this.onProducerAction(true)
  }
}
