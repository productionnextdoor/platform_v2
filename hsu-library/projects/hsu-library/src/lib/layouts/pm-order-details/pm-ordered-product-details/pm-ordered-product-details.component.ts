import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  DefaultMargins,
  IMargin,
  PmComponentMargin
} from '../../../utils/pm-component-margin';
import { TextType } from '../../../components/pm-text/pm-text.shared';
import {
  detailsDefaultData,
  IOrderedProductData
} from './pm-ordered-product-details.shared';
import { ButtonType } from '../../../components/pm-button/pm-button.component';
import {
  Icon,
  IconSize
} from '../../../components/pm-icon/pm-icon.shared';

@Component({
  selector: 'pm-ordered-product-details',
  templateUrl: './pm-ordered-product-details.component.html',
  styleUrls: ['./pm-ordered-product-details.component.scss']
})
export class PmOrderedProductDetailsComponent {

  @Input()
  title: string = '';

  @Input()
  detailData: IOrderedProductData = detailsDefaultData;

  @Input()
  hideDocuments: boolean = false;

  @Output()
  onDownloadClick: EventEmitter<void> = new EventEmitter();

  /** @ignore */
  protected readonly sectionMargin: PmComponentMargin = new PmComponentMargin(0, 0, DefaultMargins.Small, 0);

  protected readonly margins: IMargin = DefaultMargins;
  protected readonly TextType: typeof TextType = TextType;
  protected readonly ButtonType: typeof ButtonType = ButtonType;
  protected readonly Icon: typeof Icon = Icon;
  protected readonly IconSize: typeof IconSize = IconSize;

}
