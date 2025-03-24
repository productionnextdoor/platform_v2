import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import {
  Icon,
  IconSize
} from '../../components/pm-icon/pm-icon.shared';
import { TextType } from '../../components/pm-text/pm-text.shared';
import {
  ButtonType,
  IconPosition
} from '../../components/pm-button/pm-button.component';
import {
  DefaultMargins,
  IComponentMargin,
  IMargin,
  PmComponentMargin
} from '../../utils/pm-component-margin';
import {
  IProductDetailsSidebarLocalisations,
  IPropertySection,
  productDetailsSidebarLocalisations
} from './pm-product-details-sidebar.shared';
import {
  FileCategory,
  IFileNameByCategory
} from '../pm-file-upload/pm-file-upload.shared';


@Component({
  selector: 'pm-product-details-sidebar',
  templateUrl: './pm-product-details-sidebar.component.html',
  styleUrls: ['./pm-product-details-sidebar.component.scss']
})

export class PmProductDetailsSidebarComponent {

  @Input()
  public productDataSidebar: IPropertySection[] = [];

  @Input()
  public sharePointLink: string = '';

  @Input()
  public uploadCategories: {[key: string]: string} = {};

  @Input()
  public fileData: IFileNameByCategory[] = [];

  @Input()
  public productImagePath: string = '';

  @Input()
  public productImagePathFull: string = '';

  @Input()
  public hasLimitHeight: boolean = true;

  @Input()
  public sidebarCollapsed: boolean = false;

  @Input()
  public localisations: IProductDetailsSidebarLocalisations = productDetailsSidebarLocalisations;

  @Input()
  public showEditButton: boolean = false;

  @Output()
  public onDownload: EventEmitter<void> = new EventEmitter();

  @Output()
  public onClickLink: EventEmitter<void> = new EventEmitter();

  @Output()
  public sidebarCollapsedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  public onProductEditClicked: EventEmitter<void> = new EventEmitter();

  /** @ignore */
  protected readonly margins: IMargin = DefaultMargins;

  /** @ignore */
  protected readonly sectionMargin: PmComponentMargin = new PmComponentMargin(DefaultMargins.Large, 0, DefaultMargins.XSmall, 0);

  /** @ignore */
  protected readonly groupMargin: PmComponentMargin = new PmComponentMargin(DefaultMargins.XSmall, 0, 0, 0);

  /** @ignore */
  protected readonly sharepointMargin: IComponentMargin = new PmComponentMargin(DefaultMargins.Small, 0, 0, 0);

  /** @ignore */
  protected readonly uploadedFilesMargin: IComponentMargin = new PmComponentMargin(DefaultMargins.XSmall, 0, 0, 0);

  /** @ignore */
  protected readonly Icon: typeof Icon = Icon;

  /** @ignore */
  protected readonly IconSize: typeof IconSize = IconSize;

  /** @ignore */
  protected readonly TextType: typeof TextType = TextType;

  /** @ignore */
  protected readonly ButtonType: typeof ButtonType = ButtonType;

  /** @ignore */
  protected readonly DefaultMargins: typeof DefaultMargins = DefaultMargins;

  /** @ignore */
  protected readonly IconPosition: typeof IconPosition = IconPosition;

  /** @ignore */
  protected readonly categories: string[] = Object.keys(FileCategory).filter((item) => isNaN(Number(item)));

  /** @ignore */
  protected onCollapseSidebar(): void {
    this.sidebarCollapsedChange.emit(this.sidebarCollapsed = true);
  }

  /** @ignore */
  protected onDownloadFiles(): void {
    this.onDownload.emit();
  }

  /** @ignore */
  protected productEditClicked(): void {
    this.onProductEditClicked.emit();
  }
}
