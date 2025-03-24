import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  BannerType,
  defaultDeliveryAddress,
  DefaultMargins,
  IComponentMargin,
  IProductDeliveryAddress,
  IProductDeliveryAddressLocalisations,
  PmComponentMargin,
  TextType
} from 'hsu-library';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WithRx } from '../../../shared/mixins/with-rx.mixin';
import { ProductApiService } from '../../../services/products/product-api.service';
import { AppLocalizationService } from '../../../services/localization/app-localization.service';

@Component({
  selector: 'product-delivery-address',
  templateUrl: './product-delivery-address.component.html',
})
export class ProductDeliveryAddressComponent extends WithRx() implements OnInit{

  @Input()
  public productId!: number;

  @Input()
  public isValid!: boolean;

  @Input()
  public isAdminView: boolean = false;

  @Input()
  public saveDeliveryAddress!: Observable<void>;

  @Output()
  public isValidChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  public onSaveSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();

  protected isBannerVisible: boolean = true;

  protected deliveryAddress: IProductDeliveryAddress = defaultDeliveryAddress;

  protected localisations: IProductDeliveryAddressLocalisations;

  protected titleMargin: IComponentMargin = new PmComponentMargin(DefaultMargins.Large, 0, DefaultMargins.XSmall, 0);

  protected titleMarginWithoutDescription: IComponentMargin = new PmComponentMargin(0, 0, DefaultMargins.Medium, 0);

  protected descriptionMargin: IComponentMargin = new PmComponentMargin(0, 0, DefaultMargins.XLarge, 0);

  private destroyRef: DestroyRef = inject(DestroyRef);

  protected readonly BannerType: typeof BannerType = BannerType;
  protected readonly TextType: typeof TextType = TextType;
  protected readonly DefaultMargins: typeof DefaultMargins = DefaultMargins;

  constructor(
    private readonly productApiService: ProductApiService,
    private localizationService: AppLocalizationService
  ) {
    super();

    this.localisations = {
      bannerText: this.localizationService.loc('ProductCreateOrEditDeliveryAddress.Note'),
      titleText: this.localizationService.loc('ProductCreateOrEditDeliveryAddress.Title'),
      descriptionText: this.localizationService.loc('ProductCreateOrEditDeliveryAddress.Description'),
      nameLabel: this.localizationService.loc('ProductCreateOrEditDeliveryAddress.Name'),
      streetLabel: this.localizationService.loc('ProductCreateOrEditDeliveryAddress.Street'),
      zipCodeLabel: this.localizationService.loc('ProductCreateOrEditDeliveryAddress.ZipCode'),
      cityLabel: this.localizationService.loc('ProductCreateOrEditDeliveryAddress.City'),
      phoneLabel: this.localizationService.loc('ProductCreateOrEditDeliveryAddress.Phone'),
      emailLabel: this.localizationService.loc('ProductCreateOrEditDeliveryAddress.Email'),
      inputErrorMessages: [this.localizationService.loc('Error.InputField.RequiredMissing')],
    }
  }

  ngOnInit(): void {
    this.productApiService.getProductDeliveryAddress(this.productId)
      .subscribe({
        next: (deliveryAddressData: IProductDeliveryAddress) => {
          this.deliveryAddress = deliveryAddressData;
          this.validateFormData();
        }
      });

    this.saveDeliveryAddress
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        this.switchMapCancelable(() => this.productApiService.saveProductDeliveryAddress(this.productId, this.deliveryAddress))
      ).subscribe({
        next: (saveResult: IProductDeliveryAddress) => {
          this.deliveryAddress = saveResult;
          this.onSaveSuccess.emit(true);
        },
        error: () => {
          this.onSaveSuccess.emit(false);
        }
      });}

  // eslint-disable-next-line complexity
  protected validateFormData(): void {
    if (!this.deliveryAddress)
      return;

    this.setAndEmitIsValid(
      !!this.deliveryAddress.name &&
      !!this.deliveryAddress.street &&
      !!this.deliveryAddress.zipCode &&
      !!this.deliveryAddress.city &&
      !!this.deliveryAddress.email)
  }

  protected setAndEmitIsValid(isValid: boolean): void {
    this.isValid = isValid;
    this.isValidChange.emit(isValid);
  }
}
