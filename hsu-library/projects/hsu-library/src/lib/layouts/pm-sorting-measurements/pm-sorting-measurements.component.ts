import {
  Component, EventEmitter, Input, OnInit, Output
} from '@angular/core';
import { TextType } from '../../components/pm-text/pm-text.shared';
import { BannerType } from '../../components/pm-banner/pm-banner.shared';
import {
  DefaultMargins,
  IMargin,
  PmComponentMargin
} from '../../utils/pm-component-margin';
import {
  defaultSortingMeasurementsLocalisations,
  ISortingMeasurementLocalisations,
} from './pm-sorting-measurements.shared';
import { IColumnHeader } from '../../components/pm-table/pm-table-header/pm-table-header.shared';
import { Row } from '../../components/pm-table/pm-table.shared';

@Component({
  selector: 'pm-sorting-measurements',
  templateUrl: './pm-sorting-measurements.component.html',
})

export class PmSortingMeasurementsComponent implements OnInit {

  @Input()
  public sortingColumnHeaders: IColumnHeader[] = [];

  @Input()
  public sortingRows!: Row[];

  @Input()
  public localisations : ISortingMeasurementLocalisations = defaultSortingMeasurementsLocalisations;

  @Input()
  public isAdminView: boolean = false;

  @Output()
  public sortingRowsChange: EventEmitter<Row[]> = new EventEmitter<Row[]>();

  /** @ignore **/
  protected readonly TextType: typeof TextType = TextType;

  /** @ignore **/
  protected readonly BannerType: typeof BannerType = BannerType;

  /** @ignore **/
  protected readonly margins: IMargin = DefaultMargins;

  /** @ignore **/
  protected readonly titleMargin: PmComponentMargin = new PmComponentMargin(DefaultMargins.Large, 0, 0, 0);

  /** @ignore */
  protected readonly titleMarginWithoutDescription: PmComponentMargin = new PmComponentMargin(0, 0, DefaultMargins.Medium, 0);

  /** @ignore **/
  protected readonly descriptionMargin: PmComponentMargin = new PmComponentMargin(DefaultMargins.XSmall, 0, DefaultMargins.XLarge, 0);

  /** @ignore **/
  protected isBannerVisible: boolean = true;

  /** @ignore */
  ngOnInit() {
    this.isBannerVisible = !this.isAdminView;
  }

  protected onCloseBanner() {
    this.isBannerVisible = false;
  }
}
