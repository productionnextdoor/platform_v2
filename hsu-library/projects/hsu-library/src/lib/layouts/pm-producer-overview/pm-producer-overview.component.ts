import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import { IColumnHeader, IColumnSortEvent } from '../../components/pm-table/pm-table-header/pm-table-header.shared';
import { IActionEvent, Row } from '../../components/pm-table/pm-table.shared';
import { PmDropdownOption } from '../../components/pm-dropdown/pm-dropdown.shared';
import { IProducerOverviewLocalisation, producerLocalisationStrings } from './pm-producer-overview.shared';
import { IPager } from '../../components/pm-pagination/pm-pagination.shared';
import { EPmInputType } from '../../components/pm-input/pm-input.component';
import { IBreadcrumbs } from '../pm-header/pm-header.shared';
import { ButtonType } from '../../components/pm-button/pm-button.component';
import { Icon } from '../../components/pm-icon/pm-icon.shared';

@Component({
  selector: 'pm-producer-overview',
  templateUrl: './pm-producer-overview.component.html',
  styleUrls: ['./pm-producer-overview.component.scss']
})

export class PmProducerOverviewComponent {

  @Input()
  loading: boolean = false;

  @Input()
  showDetailsColumn: boolean = false;

  @Input()
  columnHeaders: IColumnHeader[] = [];

  @Input()
  rowData: Row[] = [];

  @Input()
  totalItems: number = 0;

  @Input()
  currentPage: number = 1;

  @Input()
  itemsPerPageOptions: PmDropdownOption<string>[] = [];

  @Input()
  localisationStrings: IProducerOverviewLocalisation = producerLocalisationStrings;

  @Input()
  showInviteButton: boolean = false;

  @Output()
  onActionClicked: EventEmitter<IActionEvent> = new EventEmitter();

  @Output()
  onSortingClicked: EventEmitter<IColumnSortEvent> = new EventEmitter();

  @Output()
  onPageClicked: EventEmitter<IPager> = new EventEmitter();

  @Output()
  onSearchTermChanged: EventEmitter<string> = new EventEmitter();

  @Output()
  onInviteButtonClicked: EventEmitter<void> = new EventEmitter();

  /** @ignore */
  protected readonly EPmInputType: typeof EPmInputType = EPmInputType;

  /** @ignore */
  protected readonly ButtonType: typeof ButtonType = ButtonType;

  /** @ignore */
  protected readonly Icon: typeof Icon = Icon;

  /** @ignore */
  actionClicked(actionEvent: IActionEvent) {
    this.onActionClicked.emit({
      actionType: actionEvent.actionType,
      rowId: actionEvent.rowId
    });
  }

  /** @ignore */
  paginationChanged(pager: IPager) {
    this.currentPage = pager.CurrentPage
    this.onPageClicked.emit(pager);
  }

  /** @ignore */
  getBreadcrumbs():IBreadcrumbs {
    return {
      lastBreadcrumb: this.localisationStrings.titleProducerOverview
    }
  }
}
