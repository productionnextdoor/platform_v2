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
  DefaultMargins,
  EPmInputType,
  IComponentMargin,
  PmComponentMargin,
  TextType
} from 'hsu-library';
import { GeneralInfoOutputDto } from '../../../shared/service-proxies/service-proxies';
import { Observable } from 'rxjs';
import { ProductApiService } from '../../../services/products/product-api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WithRx } from '../../../shared/mixins/with-rx.mixin';

@Component({
  selector: 'product-create-or-edit-general',
  templateUrl: './product-create-or-edit-general.component.html'
})
export class ProductCreateOrEditGeneralComponent extends WithRx() implements OnInit {
  protected readonly BannerType: typeof BannerType = BannerType;
  protected readonly TextType: typeof TextType = TextType;
  protected readonly EPmInputType: typeof EPmInputType = EPmInputType;
  protected readonly DefaultMargins: typeof DefaultMargins = DefaultMargins;

  @Input()
  public productId!: number;

  @Input()
  public isValid!: boolean;

  @Input()
  public saveGeneralInfo!: Observable<void>;

  @Input()
  public isAdminView: boolean = false;

  @Output()
  public isValidChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  public onSaveSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();

  protected generalData: GeneralInfoOutputDto = new GeneralInfoOutputDto();

  protected isBannerVisible: boolean = true;

  protected titleMargin: IComponentMargin = new PmComponentMargin(DefaultMargins.Large, 0, DefaultMargins.XSmall, 0);

  protected titleMarginWithoutDescription: IComponentMargin = new PmComponentMargin(0, 0, DefaultMargins.Medium, 0);

  protected descriptionMargin: IComponentMargin = new PmComponentMargin(0, 0, DefaultMargins.XLarge, 0);

  private destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private readonly productApiService: ProductApiService
  ) {
    super();
  }

  ngOnInit(): void {
    this.productApiService.getGeneralProductInfo(this.productId)
      .subscribe({
        next: (generalData: GeneralInfoOutputDto) => {
          this.generalData = generalData;
          this.validateFormData();
        }
      });

    this.saveGeneralInfo
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        this.switchMapCancelable(() => this.productApiService.saveGeneralProductInfo(this.generalData))
      ).subscribe({
        next: (saveResult) => {
          this.generalData = saveResult;
          this.onSaveSuccess.emit(true);
        },
        error: () => {
          this.onSaveSuccess.emit(false);
        }
      });

    this.isBannerVisible = !this.isAdminView;

  }

  protected validateFormData(): void {
    if (!this.generalData) {
      return;
    }

    if (
      this.generalData.productName &&
      this.generalData.height &&
      this.generalData.width &&
      this.generalData.depth
    ) {
      this.isValid = true;
      this.onValidChange();
      return;
    }

    this.isValid = false;
    this.onValidChange();
  }

  protected onCLoseBanner(): void {
    this.isBannerVisible = false;
  }

  protected onValidChange(): void {
    this.isValidChange.emit(this.isValid);
  }
}
