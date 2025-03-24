import {Component, Input} from '@angular/core';
import {TextType} from '../../components/pm-text/pm-text.shared';
import {
  IProductDetailsInProgressLocalisations,
  productDetailsInProgressLocalisations
} from './pm-product-details-in-progress.shared';
import {DefaultMargins, PmComponentMargin} from '../../utils/pm-component-margin';

@Component({
  selector: 'pm-product-details-in-progress',
  templateUrl: './pm-product-details-in-progress.component.html',
  styleUrls: ['./pm-product-details-in-progress.component.scss']
})
export class PmProductDetailsInProgressComponent {
  @Input()
  localisations: IProductDetailsInProgressLocalisations = productDetailsInProgressLocalisations;

  @Input()
  lastEditDate: string = '';

  /** @ignore */
  protected readonly descriptionMargin: PmComponentMargin = new PmComponentMargin(0, 0, DefaultMargins.Small, 0);

  /** @ignore */
  protected readonly TextType: typeof TextType = TextType;
}
