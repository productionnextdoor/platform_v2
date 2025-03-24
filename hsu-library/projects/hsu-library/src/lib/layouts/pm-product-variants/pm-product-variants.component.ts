import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { BannerType } from '../../components/pm-banner/pm-banner.shared';
import { TextType } from '../../components/pm-text/pm-text.shared';
import { EPmInputType } from '../../components/pm-input/pm-input.component';
import { ButtonType } from '../../components/pm-button/pm-button.component';
import { Icon } from '../../components/pm-icon/pm-icon.shared';
import {
  IMeasurement,
  IProductVariantsLocalisations,
  IWorkPieceVariant
} from './pm-product-variants.shared';
import { PmDropdownOption } from '../../components/pm-dropdown/pm-dropdown.shared';
import {
  DefaultMargins,
  IMargin,
  PmComponentMargin
} from '../../utils/pm-component-margin';
import { Observable } from 'rxjs';

@Component({
  selector: 'pm-product-variants',
  templateUrl: './pm-product-variants.component.html',
})
export class PmProductVariantsComponent implements OnInit {

  @Input()
  public isValid!: boolean;

  @Input()
  public workPieceOptions: PmDropdownOption<number>[] = [];

  @Input()
  public measurements: IMeasurement[] = [];

  @Input()
  public workPieceVariants: IWorkPieceVariant[] = [];

  @Input()
  public localisations : IProductVariantsLocalisations = {
    bannerText:'',
    titleText: '',
    descriptionText: '',
    heightLabel: '',
    heightPlaceholder: '',
    widthLabel: '',
    widthPlaceholder: '',
    depthLabel: '',
    depthPlaceholder: '',
    workPieceDropdownLabel: '',
    workPieceDropdownPlaceholder: '',
    workPieceVariantLabel: '',
    workPieceVariantPlaceholder: '',
    measurementVariantsTitle: '',
    workPieceVariantsTitle: '',
    inputErrorMessages: [],
  }

  @Input()
  public dataLoadingFinished!: Observable<void>;

  @Input()
  public isAdminView: boolean = false;

  @Output()
  public measurementsChange: EventEmitter<IMeasurement[]> = new EventEmitter<IMeasurement[]>();

  @Output()
  public workPieceVariantsChange: EventEmitter<IWorkPieceVariant[]> = new EventEmitter<IWorkPieceVariant[]>();

  @Output()
  public isValidChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  /** @ignore */
  protected isBannerVisible: boolean = true;

  /** @ignore */
  protected readonly margins: IMargin = DefaultMargins;

  /** @ignore */
  protected readonly deleteBtnMargin: PmComponentMargin = new PmComponentMargin(DefaultMargins.Large, 0, 0, 0);

  /** @ignore */
  protected readonly EPmInputType: typeof  EPmInputType = EPmInputType;

  /** @ignore */
  protected readonly EBannerType: typeof BannerType = BannerType;

  /** @ignore */
  protected readonly ETextType: typeof TextType = TextType;

  /** @ignore */
  protected readonly EButtonType: typeof ButtonType = ButtonType;

  /** @ignore */
  protected readonly EIcon: typeof Icon = Icon;

  /** @ignore */
  protected readonly titleMargin: PmComponentMargin = new PmComponentMargin(DefaultMargins.Large, 0, 0, 0);

  /** @ignore */
  protected readonly titleMarginWithoutDescription: PmComponentMargin = new PmComponentMargin(0, 0, DefaultMargins.Medium, 0);

  /** @ignore */
  protected readonly descriptionMargin: PmComponentMargin = new PmComponentMargin(DefaultMargins.XSmall, 0, DefaultMargins.XLarge, 0);

  constructor(private el: ElementRef) {}

  /** @ignore */
  ngOnInit() {
    this.validateFormData();

    this.isBannerVisible = !this.isAdminView;
  }

  /** @ignore */
  protected addMeasurement() {
    this.measurements.push({
      measurementId: 0,
      height: 0,
      width: 0,
      depth: 0,
      isDefaultMeasurement: false,
    });

    this.measurementsChange.emit(this.measurements);
    this.validateFormData();
  }

  /** @ignore */
  protected addWorkPieceVariant() {
    this.workPieceVariants.push({
      variantId: 0,
      workPieceId: 0,
      description: '',
    });

    this.workPieceVariantsChange.emit(this.workPieceVariants);
    this.validateFormData();
  }

  /** @ignore */
  protected deleteMeasurement(index: number) {
    this.measurements.splice(index, 1);
    this.measurementsChange.emit(this.measurements);
    this.validateFormData();
    this.emitChangeEvent();
  }

  /** @ignore */
  protected deleteWorkPieceVariant(index: number) {
    this.workPieceVariants.splice(index, 1);
    this.workPieceVariantsChange.emit(this.workPieceVariants);
    this.validateFormData();
    this.emitChangeEvent();
  }

  protected validateFormData(): void {
    const areWorkPiecesValid: boolean = this.workPieceVariants.every(workPiece =>
      workPiece.workPieceId > 0 && workPiece.description
    );

    const areMeasurementsValid: boolean = this.measurements.every(measurement =>
      measurement.depth && measurement.height && measurement.width
    );

    this.isValidChange.emit(areWorkPiecesValid && areMeasurementsValid);
  }

  emitChangeEvent() {
    this.el.nativeElement.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
    }));
  }

  protected onCLoseBanner(): void {
    this.isBannerVisible = false;
  }
}
