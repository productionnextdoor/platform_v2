import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import {
  DefaultMargins,
  IMargin,
  PmComponentMargin
} from '../../utils/pm-component-margin';
import {
  IProductDetailsBaseData,
  IProductDetailsDeveloperLocalisations,
  productDetailsDeveloperLocalisations
} from './pm-product-details-developer.shared';
import { TextType } from '../../components/pm-text/pm-text.shared';
import {
  FileCategory,
  IFileNameByCategory
} from '../pm-file-upload/pm-file-upload.shared';
import {
  Icon,
  IconSize
} from '../../components/pm-icon/pm-icon.shared';
import {
  ButtonType,
  IconPosition
} from '../../components/pm-button/pm-button.component';
import {
  IPropertyGroup,
  IPropertySection,
} from '../pm-product-details-sidebar/pm-product-details-sidebar.shared';

@Component({
  selector: 'pm-product-details-developer',
  templateUrl: './pm-product-details-developer.component.html',
  styleUrls: ['./pm-product-details-developer.component.scss']
})
export class PmProductDetailsDeveloperComponent {

  @Input()
  public productDataDetailCard: IPropertySection[] = [];

  @Input()
  public generalInformation: IPropertyGroup = {
    groupTitle: '',
    properties: []
  };

  @Input()
  public productDetailsBaseData: IProductDetailsBaseData = {
    productDescription: '',
    sharePointLink: '',
    lastEditDate: '',
  }

  @Input()
  public fileData: IFileNameByCategory[] = [];

  @Input()
  public productImagePath: string = '';

  @Input()
  public productImagePathFull: string = '';

  @Input()
  public hasLimitHeight: boolean = true;

  @Input()
  public uploadCategories: {[key: string]: string} = {};

  @Input()
  public localisations: IProductDetailsDeveloperLocalisations = productDetailsDeveloperLocalisations;

  @Output()
  public onDownload: EventEmitter<void> = new EventEmitter();

  @Output()
  public onClickLink: EventEmitter<void> = new EventEmitter();

  /** @ignore */
  protected readonly margins: IMargin = DefaultMargins;

  /** @ignore */
  protected readonly generalSectionMargin: PmComponentMargin = new PmComponentMargin(0, 0, DefaultMargins.Small, 0);

  /** @ignore */
  protected readonly sectionMargin: PmComponentMargin = new PmComponentMargin(0, 0, DefaultMargins.Small, 0);

  /** @ignore */
  protected readonly groupMargin: PmComponentMargin = new PmComponentMargin(DefaultMargins.Small, 0, 0, 0);

  /** @ignore */
  protected readonly uploadedFilesMargin: PmComponentMargin = new PmComponentMargin(DefaultMargins.Small, 0, 0, 0);

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
}
