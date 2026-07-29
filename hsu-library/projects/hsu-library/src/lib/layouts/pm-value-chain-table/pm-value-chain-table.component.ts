import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import { TextType } from '../../components/pm-text/pm-text.shared';
import { IColumnHeader, IColumnSortEvent } from '../../components/pm-table/pm-table-header/pm-table-header.shared';
import { Row } from '../../components/pm-table/pm-table.shared';
import { PmDropdownOption } from '../../components/pm-dropdown/pm-dropdown.shared';
import { IPager, Pager } from '../../components/pm-pagination/pm-pagination.shared';
import { IValueChainTableLocalisation, ValueChainTableLocalisation } from './pm-value-chain-table.shared';


@Component({
  selector: 'pm-value-chain-table',
  templateUrl: './pm-value-chain-table.component.html',
  styleUrls: ['./pm-value-chain-table.component.scss']

})
export class PmValueChainTableComponent {

  /** @ignore */
  protected readonly TextType: typeof TextType = TextType;

  @Input()
  loading: boolean = false;

  @Input()
  noShadow: boolean = false;

  @Input()
  lastCalculationDate: string = '';

  @Input()
  columnHeaders: IColumnHeader[] = [];

  @Input()
  rowData: Row[] = [];

  @Input()
  totalItems: number = 0;

  @Input()
  itemsPerPageOptions: PmDropdownOption<string>[] = [];

  @Input()
  paginationData: IPager = Pager;

  @Input()
  editDisabled: boolean = false;

  @Input()
  localisations: IValueChainTableLocalisation = ValueChainTableLocalisation;

  @Output()
  onSortingClicked: EventEmitter<IColumnSortEvent> = new EventEmitter();

  @Output()
  onPageClicked: EventEmitter<IPager> = new EventEmitter();

  @Output()
  onToggleValueChainsActive: EventEmitter<number[]> = new EventEmitter<number[]>();

  /** @ignore */
  protected sortingClicked(sortEvent: IColumnSortEvent) {
    this.onSortingClicked.emit(sortEvent);
  }

  /** @ignore */
  protected paginationChanged(pager: IPager) {
    this.paginationData = pager;

    this.onPageClicked.emit(pager);
  }
}
