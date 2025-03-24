import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  Icon
} from '../pm-icon/pm-icon.shared';
import {
  ButtonType
} from '../pm-button/pm-button.component';
import {
  PmDropdownOption
} from '../pm-dropdown/pm-dropdown.shared';
import {
  DEFAULT_PAGES_SHOWN,
  DEFAULT_ITEMS_PER_PAGE,
  IPager
} from './pm-pagination.shared';


@Component({
  selector: 'pm-pagination',
  templateUrl: './pm-pagination.component.html',
  styleUrls: ['./pm-pagination.component.scss']
})

export class PmPaginationComponent implements OnInit, OnChanges {

  @Input()
  totalItems: number = 0;

  @Input()
  totalText: string = '';

  @Input()
  currentPage: number = 1;

  @Input()
  itemsPerPageOptions?: PmDropdownOption<string>[] = [];

  @Input()
  pagesShown: number = DEFAULT_PAGES_SHOWN;

  @Input()
  loading: boolean = false;

  @Output()
  onShowPage: EventEmitter<IPager> = new EventEmitter();

  /** @ignore */
  readonly Icon: typeof Icon = Icon;

  /** @ignore */
  readonly ButtonType: typeof ButtonType = ButtonType;

  /** @ignore */
  totalPages: number = 0;

  /** @ignore */
  perPage: number = DEFAULT_ITEMS_PER_PAGE;

  /** @ignore */
  pageRange: number[] = [];


  ngOnInit(): void {
    this.perPage = this.itemsPerPageOptions && this.itemsPerPageOptions[0].key && Number(this.itemsPerPageOptions[0].key) > 0 ?
      Number(this.itemsPerPageOptions[0].key) : DEFAULT_ITEMS_PER_PAGE;
    this.calculateTotalPages();
    this.calculatePageRange();
  }

  ngOnChanges(changes:SimpleChanges): void {
    if (changes['totalPages']){
      this.currentPage = 1
    }
    this.calculateTotalPages();
    this.calculatePageRange();
  }

  /** @ignore */
  onClickPreviousPage() {
    this.currentPage = Math.max(this.currentPage - 1, 1);
    this.calculatePageRange();
    this.emitPager();
  }

  /** @ignore */
  onClickNextPage() {
    this.currentPage = Math.min(this.currentPage + 1, this.totalPages);
    this.calculatePageRange();
    this.emitPager();
  }

  /** @ignore */
  onPageClick(page: string) {
    if (this.currentPage !== Number(page)) {
      this.currentPage = Number(page);
      this.calculatePageRange();
      this.emitPager();
    }
  }

  /** @ignore */
  onSelectItemsPerPage(perPage: string) {
    this.perPage = Number(perPage);
    this.calculateTotalPages();
    this.calculatePageRange();
    this.emitPager();
  }

  /** @ignore */
  private calculateTotalPages() {
    this.totalPages = Math.ceil(this.totalItems / (this.perPage));

    if (this.totalPages !== 0 && this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
  }

  /** @ignore */
  private calculatePageRange() {
    // eslint-disable-next-line no-magic-numbers
    let startingPage: number = Math.max(this.currentPage - Math.floor(this.pagesShown / 2), 1);
    let endPage: number = startingPage + this.pagesShown - 1;

    //correcting the overflow
    if (endPage > this.totalPages) {
      startingPage = Math.max(startingPage - endPage + this.totalPages, 1);
      endPage = this.totalPages;
    }

    const result: number[] = new Array(0);
    for (let page: number = startingPage; page <= endPage; page++) {
      result.push(page);
    }
    this.pageRange = result;
  }

  private emitPager(): void {
    this.onShowPage.emit({
      CurrentPage: this.currentPage,
      MaxResultCount: this.perPage,
      SkipCount: this.perPage * (this.currentPage - 1),
    })
  }
}
