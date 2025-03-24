import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { ButtonType } from '../../../components/pm-button/pm-button.component';
import {
  defaultBreadcrumbs,
  IBreadcrumbs
} from '../../pm-header/pm-header.shared';
import { PopupType } from '../../../components/pm-popup/pm-popup.component';
import {
  IPmConfirmPopupLocalisations,
  pmConfirmPopupLocalisations
} from '../../pm-confirm-popup/pm-confirm-popup.shared';

@Component({
  selector: 'pm-order-details-admin',
  templateUrl: './pm-order-details-admin.component.html'
})
export class PmOrderDetailsAdminComponent {

  @Input()
  breadcrumbs: IBreadcrumbs = defaultBreadcrumbs;

  @Input()
  cancelDisabled: boolean = false;

  @Input()
  cancelButtonLabel: string = '';

  @Input()
  cancelPopupLocalisations: IPmConfirmPopupLocalisations = pmConfirmPopupLocalisations;

  @Output()
  onCancelOrder: EventEmitter<void> = new EventEmitter();

  protected showPopup: boolean = false;

  /** @ignore */
  protected readonly ButtonType: typeof ButtonType = ButtonType;

  /** @ignore */
  protected readonly PopupType: typeof PopupType = PopupType;

  protected onShowPopup(): void {
    this.showPopup = true;
  }

  protected onHidePopup(): void {
    this.showPopup = false;
  }

  protected onDiscardCancel(): void {
    this.onHidePopup();
  }

  protected onConfirmCancel(): void {
    this.onCancelOrder.emit();
    this.onHidePopup();
  }
}
