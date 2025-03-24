import {
  Component, EventEmitter,
  Input,
  OnChanges, Output,
  SimpleChanges
} from '@angular/core';
import { TextType } from '../../../components/pm-text/pm-text.shared';
import {
  EValueChainStatus,
  valueChainCardLocalisation,
  IValueChainCardLocalisations,
  ValueChainStatusValues,
  ValueChainCommissionModeValues,
  EValueChainCommissionMode
} from './pm-order-value-chain-card.shared';
import { IColumnHeader } from '../../../components/pm-table/pm-table-header/pm-table-header.shared';
import {
  IActionEvent,
  Row
} from '../../../components/pm-table/pm-table.shared';
import { ButtonType } from '../../../components/pm-button/pm-button.component';

@Component({
  selector: 'pm-order-value-chain-card',
  templateUrl: './pm-order-value-chain-card.component.html',
  styleUrls: ['./pm-order-value-chain-card.component.scss']
})
export class PmOrderValueChainCardComponent implements OnChanges {

  @Input()
  public index: number = 1;

  @Input()
  public requestDate: string = '';

  @Input()
  public status: ValueChainStatusValues = EValueChainStatus['rejected'];

  @Input()
  public commissionMode: ValueChainCommissionModeValues = EValueChainCommissionMode['Automatic'];

  @Input()
  public loading: boolean = false;

  @Input()
  public columnHeaders: IColumnHeader[] = [];

  @Input()
  public rowData: Row[] = [];

  @Input()
  valueChainCardLocalisation: IValueChainCardLocalisations = valueChainCardLocalisation;

  @Output()
  public onActionClicked: EventEmitter<IActionEvent> = new EventEmitter();

  @Output()
  public onCommissionClicked: EventEmitter<void> = new EventEmitter();

  protected badgeText: string = '';

  protected readonly TextType: typeof TextType = TextType;
  protected readonly ButtonType: typeof ButtonType = ButtonType;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['status']) {
      this.badgeText = this.GetBadgeText();
    }
  }

  protected GetBadgeText() {
    switch (this.status) {
    case EValueChainStatus['Commissioned']:
      return this.valueChainCardLocalisation.status.commissioned
    case EValueChainStatus['Rejected']:
      return this.valueChainCardLocalisation.status.rejected
    case EValueChainStatus['InProgress']:
      return this.valueChainCardLocalisation.status.inProgress
    case EValueChainStatus['Completed']:
      return this.valueChainCardLocalisation.status.completed
    case EValueChainStatus['Canceled']:
      return this.valueChainCardLocalisation.status.canceled
    default:
      return '';
    }
  }
}
