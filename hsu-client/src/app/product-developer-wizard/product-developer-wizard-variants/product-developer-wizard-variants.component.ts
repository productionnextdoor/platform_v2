import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { Observable } from 'rxjs';
import { IProductApiService } from '../../../services/products/iproduct-api.service';
import { IProductVariantInfos } from '../../../services/products/product-api.service';
import {
  IMeasurement,
  IProductVariantsLocalisations,
  IWorkPieceVariant,
  PmDropdownOption
} from 'hsu-library';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WithRx } from '../../../shared/mixins/with-rx.mixin';
import { AppLocalizationService } from '../../../services/localization/app-localization.service';

@Component({
  selector: 'product-developer-wizard-variants',
  templateUrl: './product-developer-wizard-variants.component.html'
})
export class ProductDeveloperWizardVariantsComponent extends WithRx() implements OnInit {

  @Input()
  public productId!: number;

  @Input()
  public isValid!: boolean;

  @Input()
  public saveVariantInfo!: Observable<void>;

  @Input()
  public isAdminView: boolean = false;

  @Output()
  public isValidChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  public onSaveSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();

  protected localisations: IProductVariantsLocalisations;

  protected workPieceOptions: PmDropdownOption<number>[] = [];

  protected measurementVariants: IMeasurement[] = [];

  protected workPieceVariants: IWorkPieceVariant[] = [];

  private destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private productApiService: IProductApiService,
    private localizationService: AppLocalizationService
  ) {
    super();

    this.localisations = {
      bannerText: this.localizationService.loc('DeveloperProductWizard.ProductVariants.BannerText'),
      titleText: this.localizationService.loc('DeveloperProductWizard.ProductVariants.TitleText'),
      descriptionText: this.localizationService.loc('DeveloperProductWizard.ProductVariants.DescriptionText'),
      heightLabel: this.localizationService.loc('Measurement.Height'),
      heightPlaceholder: this.localizationService.loc('Measurement.Height'),
      widthLabel: this.localizationService.loc('Measurement.Width'),
      widthPlaceholder: this.localizationService.loc('Measurement.Width'),
      depthLabel: this.localizationService.loc('Measurement.Depth'),
      depthPlaceholder: this.localizationService.loc('Measurement.Depth'),
      workPieceDropdownLabel: this.localizationService.loc('DeveloperProductWizard.ProductVariants.WorkPieceDropdownLabel'),
      workPieceDropdownPlaceholder: this.localizationService.loc('DeveloperProductWizard.ProductVariants.WorkPieceDropdownPlaceholder'),
      workPieceVariantLabel: this.localizationService.loc('DeveloperProductWizard.ProductVariants.WorkPieceVariantLabel'),
      workPieceVariantPlaceholder: this.localizationService.loc('DeveloperProductWizard.ProductVariants.WorkPieceVariantPlaceholder'),
      measurementVariantsTitle: this.localizationService.loc('DeveloperProductWizard.ProductVariants.MeasurementVariantsTitle'),
      workPieceVariantsTitle: this.localizationService.loc('DeveloperProductWizard.ProductVariants.WorkPieceVariantsTitle'),
      inputErrorMessages: [this.localizationService.loc('Error.InputField.RequiredMissing')],
    }
  }

  ngOnInit() {
    this.productApiService.getProductVariants(this.productId)
      .subscribe({
        next: (productVariantsData: IProductVariantInfos) => {
          this.workPieceOptions = productVariantsData.workPieceOptions;
          this.measurementVariants = productVariantsData.measurements;
          this.workPieceVariants = productVariantsData.workPieceVariants;
        }
      });

    this.saveVariantInfo
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        this.switchMapCancelable(() => this.productApiService.saveProductVariants(this.productId, this.measurementVariants, this.workPieceVariants))
      ).subscribe({
        next: (productVariantsData) => {
          this.measurementVariants = productVariantsData.measurements;
          this.workPieceVariants = productVariantsData.workPieceVariants;
          this.onSaveSuccess.emit(true);
        },
        error: () => {
          this.onSaveSuccess.emit(false);
        }
      });
  }
}
