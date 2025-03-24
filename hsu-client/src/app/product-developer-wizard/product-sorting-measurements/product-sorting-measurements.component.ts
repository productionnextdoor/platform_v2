import {
  Component, EventEmitter, Input, Output, OnInit, DestroyRef, inject
} from '@angular/core';
import {
  IColumnHeader,
  ISortingMeasurementLocalisations,
  Row,
  IMeasurement
} from 'hsu-library';
import { map, Observable } from 'rxjs';
import { AppLocalizationService } from '../../../services/localization/app-localization.service';
import { WithRx } from '../../../shared/mixins/with-rx.mixin';
import { IProductApiService } from '../../../services/products/iproduct-api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IMeasurementTableService } from '../../../services/products/product-creation/imeasurement-table.service';


@Component({
  selector: 'product-sorting-measurements',
  templateUrl: './product-sorting-measurements.component.html'
})

export class ProductSortingMeasurementsComponent extends WithRx() implements OnInit{
  @Input()
  public productId!: number;

  @Input()
  public isValid!: boolean;

  @Input()
  public saveSortingInfo!: Observable<void>;

  @Input()
  public isAdminView: boolean = false;

  @Output()
  public isValidChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  public onSaveSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();

  protected localisations: ISortingMeasurementLocalisations;

  measurementsRowData: Row[] = [];
  sortingColumnHeaders: IColumnHeader [] = [];
  measurementData: IMeasurement[] = [];
  private destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private readonly productApiService: IProductApiService,
    private readonly localizationService: AppLocalizationService,
    private readonly measurementTableService: IMeasurementTableService,
  ) {
    super();
    this.localisations = {
      bannerText: this.localizationService.loc('ProductCreateOrEditGeneral.Note'),
      titleText: this.localizationService.loc('ProductCreateOrEditSortingMeasurements.SubTitle'),
      descriptionText: this.localizationService.loc('ProductCreateOrEditSortingMeasurements.Description'),
    }
  }

  ngOnInit(): void {
    this.sortingColumnHeaders = this.measurementTableService.getSortingColumnHeaders();
    this.productApiService.getProductMeasurements(this.productId)
      .subscribe({
        next: (result : IMeasurement[]) => {
          this.measurementData = this.initSorting(result);
          this.measurementsRowData = this.measurementTableService.setMeasurementsRowData(this.measurementData);
          this.setValidState();
        }
      });

    this.saveSortingInfo
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map(() => this.updateMeasurementPositions(this.measurementsRowData)),
        this.switchMapCancelable((updatedData) => this.productApiService.saveMeasurementSorting(this.productId, updatedData))
      ).subscribe({
        next: () => {
          this.onSaveSuccess.emit(true);
        },
        error: () => {
          this.onSaveSuccess.emit(false);
        }
      });
  }

  public initSorting(measurementData: IMeasurement[]) : IMeasurement[] {
    return measurementData
      .sort((measurementA,measurementB) => (measurementA.position ?? 0) - (measurementB.position ?? 0))
      .map((measurement, index) => {
        return {
          ...measurement,
          position: index + 1,
        }
      })
  }

  protected setValidState(isValid: boolean = true): void {
    this.isValid = isValid;
    this.isValidChange.emit(this.isValid);
  }

  /**
   * @description This method is for handling the updated rowData when an element is dropped and map it to IMeasurement[].
   */
  private updateMeasurementPositions(rowData: Row[]) : IMeasurement[] {
    rowData.forEach((row, index) => {
      const measurementIndex: number = this.measurementData.findIndex((measurementElement) => measurementElement.measurementId === row.rowId);

      if (measurementIndex > -1) {
        this.measurementData[measurementIndex].position = index + 1;
      }
    });

    return this.measurementData;
  }
}
