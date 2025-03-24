import {
  Component,
  Input
} from '@angular/core';
import {
  DefaultMargins, IMargin,
  PmComponentMargin
} from '../../../utils/pm-component-margin';
import { TextType } from '../../../components/pm-text/pm-text.shared';
import { ButtonType } from '../../../components/pm-button/pm-button.component';
import {
  Icon,
  IconSize
} from '../../../components/pm-icon/pm-icon.shared';
import { defaultCustomerInfoData, ICustomerInfoData } from './pm-ordered-product-customer-info.shared';

@Component({
  selector: 'pm-ordered-product-customer-info',
  templateUrl: './pm-ordered-product-customer-info.component.html',
  styleUrls: ['./pm-ordered-product-customer-info.component.scss']
})
export class PmOrderedProductCustomerInfoComponent {

  @Input()
  title: string = '';

  @Input()
  customerData:ICustomerInfoData = defaultCustomerInfoData;

  /** @ignore */
  protected readonly sectionMargin: PmComponentMargin = new PmComponentMargin(0, 0, DefaultMargins.Small, 0);

  protected readonly margins: IMargin = DefaultMargins;
  protected readonly TextType: typeof TextType = TextType;
  protected readonly ButtonType: typeof ButtonType = ButtonType;
  protected readonly Icon: typeof Icon = Icon;
  protected readonly IconSize: typeof IconSize = IconSize;

}
