import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  defaultDeliveryAddress,
  defaultProductDeliveryAddressLocalisations,
  IProductDeliveryAddress,
  IProductDeliveryAddressLocalisations
} from './pm-product-delivery-address.shared';
import {
  DefaultMargins,
  IComponentMargin,
  PmComponentMargin
} from '../../utils/pm-component-margin';
import { BannerType } from '../../components/pm-banner/pm-banner.shared';
import { TextType } from '../../components/pm-text/pm-text.shared';

@Component({
  selector: 'pm-product-delivery-address',
  templateUrl: './pm-product-delivery-address.component.html',
})
export class PmProductDeliveryAddressComponent implements OnInit{

  @Input()
  public deliveryAddress: IProductDeliveryAddress = defaultDeliveryAddress;

  @Input()
  public isAdminView: boolean = false;

  @Input()
  public productDeliveryAddressLocalisations: IProductDeliveryAddressLocalisations = defaultProductDeliveryAddressLocalisations;

  @Output()
  public productDeliveryAddressDataChange: EventEmitter<void> = new EventEmitter();

  protected isBannerVisible: boolean = true;

  protected titleMargin: IComponentMargin = new PmComponentMargin(DefaultMargins.Large, 0, DefaultMargins.XSmall, 0);

  protected titleMarginWithoutDescription: IComponentMargin = new PmComponentMargin(0, 0, DefaultMargins.Medium, 0);

  protected descriptionMargin: IComponentMargin = new PmComponentMargin(0, 0, DefaultMargins.XLarge, 0);

  protected readonly BannerType: typeof BannerType = BannerType;
  protected readonly TextType: typeof TextType = TextType;
  protected readonly DefaultMargins: typeof DefaultMargins = DefaultMargins;

  ngOnInit(): void {
    this.isBannerVisible = !this.isAdminView;
  }

  protected onCLoseBanner(): void {
    this.isBannerVisible = false;
  }
}
