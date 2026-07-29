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
  ValueChainStatusValues
} from './pm-order-value-chain-card.shared';
import { IColumnHeader } from '../../../components/pm-table/pm-table-header/pm-table-header.shared';
import {
  IActionEvent,
  Row
} from '../../../components/pm-table/pm-table.shared';

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
  public status: ValueChainStatusValues = 'rejected';

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

  protected badgeText: string = '';

  protected readonly TextType: typeof TextType = TextType;


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
