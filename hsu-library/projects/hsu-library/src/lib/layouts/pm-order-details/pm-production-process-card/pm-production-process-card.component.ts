import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { IColumnHeader } from '../../../components/pm-table/pm-table-header/pm-table-header.shared';
import { Row } from '../../../components/pm-table/pm-table.shared';
import { ButtonType } from '../../../components/pm-button/pm-button.component';
import { TextType } from '../../../components/pm-text/pm-text.shared';
import {
  DefaultMargins, IComponentMargin, PmComponentMargin
} from '../../../utils/pm-component-margin';
import {
  IDeliveryDocument,
  IProductionProcessCardLocalisations,
  productionProcessCardLocalisations
} from './pm-production-process-card.shared';
import {
  IPmConfirmPopupLocalisations,
  pmConfirmPopupLocalisations
} from '../../pm-confirm-popup/pm-confirm-popup.shared';

@Component({
  selector: 'pm-production-process-card',
  templateUrl: './pm-production-process-card.component.html',
  styleUrls: ['./pm-production-process-card.component.scss']
})
export class PmProductionProcessCardComponent {

  @Input()
  columnHeaders: IColumnHeader[] = [];

  @Input()
  rowData: Row[] = [];

  @Input()
  startDisabled: boolean = true;

  @Input()
  endDisabled: boolean = true;

  @Input()
  isFinalSelected: boolean = false;

  @Input()
  loading: boolean = false;

  @Input()
  deliveryDocuments: IDeliveryDocument[] = [];

  @Input()
  localisations: IProductionProcessCardLocalisations = productionProcessCardLocalisations;

  @Output()
  onActionStart: EventEmitter<void> = new EventEmitter();

  @Output()
  onActionFinish: EventEmitter<void> = new EventEmitter();

  @Output()
  onCheckBoxChange: EventEmitter<number[]> = new EventEmitter<number[]>();

  @Output()
  onFileDelete: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  onCancel: EventEmitter<void> = new EventEmitter();

  protected showPopup: boolean = false;
  protected isStart: boolean = false
  protected pmConfirmPopupLocalisations: IPmConfirmPopupLocalisations = pmConfirmPopupLocalisations;

  protected textMargin: IComponentMargin = new PmComponentMargin(0, DefaultMargins.Medium, 0, DefaultMargins.Medium);
  protected btnMargin: IComponentMargin = new PmComponentMargin(0, DefaultMargins.Medium, 0, 0);

  protected readonly EButtonType: typeof ButtonType = ButtonType;
  protected readonly TextType: typeof TextType = TextType;


  confirmAction(isStart: boolean): void {
    this.showPopup = true;
    this.isStart = isStart;
    this.pmConfirmPopupLocalisations = this.getPopupLocalisations()
  }

  onConfirm() {
    this.isStart ? this.onActionStart.emit() : this.onActionFinish.emit();
    this.showPopup = false;
  }

  private getPopupLocalisations(): IPmConfirmPopupLocalisations {
    if (this.isStart) {
      return this.localisations.confirmPopupStart
    }

    if (this.isFinalSelected) {
      return this.localisations.completeOrderPopup
    }

    return this.localisations.confirmPopupFinish
  }

  deleteFile(value: string) {
    this.onFileDelete.emit(Number(value));
  }

  onCancelSubmit() {
    this.showPopup = false;
    this.onCancel.emit()
  }
}
