import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { ButtonType } from '../../components/pm-button/pm-button.component';
import { PopupType } from '../../components/pm-popup/pm-popup.component';
import { pmMaxCostPopupLocalisations, IPmMaxCostPopupLocalisations } from './pm-max-cost-popup.shared';
import { Icon, IconSize } from '../../components/pm-icon/pm-icon.shared';
import { DefaultMargins, PmComponentMargin } from '../../utils/pm-component-margin';


@Component({
  selector: 'pm-max-cost-popup',
  templateUrl: './pm-max-cost-popup.component.html',
  styleUrls: ['./pm-max-cost-popup.component.scss']
})
export class PmMaxCostPopupComponent {

  protected readonly textMargin: PmComponentMargin = new PmComponentMargin(0, 0, 0, DefaultMargins.XSmall);
  protected readonly inputMargin: PmComponentMargin = new PmComponentMargin(DefaultMargins.Medium, 0, 0, 0);
  protected readonly IconSize: typeof IconSize = IconSize;
  protected readonly Icon: typeof Icon = Icon;
  protected readonly ButtonType: typeof ButtonType = ButtonType;
  protected readonly PopupType: typeof PopupType = PopupType;

  @Input()
  localisations: IPmMaxCostPopupLocalisations = pmMaxCostPopupLocalisations;

  @Output()
  onCancel: EventEmitter<void> = new EventEmitter();

  @Output()
  onConfirm: EventEmitter<number> = new EventEmitter<number>();

  /** @ignore */
  protected maxCost: number = 0;

}
