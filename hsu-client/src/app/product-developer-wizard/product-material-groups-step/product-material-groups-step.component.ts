import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  IMaterialGroup,
  IMaterialGroupLocalisations,
  IWorkingPiece
} from 'hsu-library';
import {
  catchError, Observable, of
} from 'rxjs';
import { AppLocalizationService } from '../../../services/localization/app-localization.service';
import { IProductMaterialGroupsInfo, ProductApiService } from '../../../services/products/product-api.service';
import { WithRx } from '../../../shared/mixins/with-rx.mixin';

@Component({
  selector: 'product-material-groups-step',
  templateUrl: './product-material-groups-step.component.html'
})
export class ProductMaterialGroupsStepComponent extends WithRx() implements OnInit, OnDestroy {

  @Input()
  public productId: number = 0;

  @Input()
  public isValid!: boolean;

  @Input()
  public saveMaterialGroups!: Observable<void>;

  @Input()
  public isAdminView: boolean = false;

  @Output()
  public isValidChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  public onSaveSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();

  protected materialGroups: IMaterialGroup[] = [];

  protected workingPieces: IWorkingPiece[] = [];

  protected localisations: IMaterialGroupLocalisations;

  private destroyRef: DestroyRef = inject(DestroyRef);


  constructor(
    private readonly productApiService: ProductApiService,
    private readonly localisationService: AppLocalizationService
  ) {
    super();

    this.localisations = {
      bannerText: this.localisationService.loc('ProductCreateOrEditMaterialGroups.Note'),
      titleText: this.localisationService.loc('ProductCreateOrEditMaterialGroups.SubTitle'),
      descriptionText: this.localisationService.loc('ProductCreateOrEditMaterialGroups.Description'),
      materialItem: {
        materialGroupLabel: this.localisationService.loc('ProductCreateOrEditMaterialGroups.MaterialItem.MaterialGroupLabel'),
        materialGroupPlaceholder: this.localisationService.loc('ProductCreateOrEditMaterialGroups.MaterialItem.MaterialGroupPlaceholder'),
        materialLabel: this.localisationService.loc('ProductCreateOrEditMaterialGroups.MaterialItem.MaterialLabel'),
        finalStateLabel: this.localisationService.loc('ProductCreateOrEditMaterialGroups.MaterialItem.FinalStateLabel'),
        specificationGroupLabel: this.localisationService.loc('ProductCreateOrEditMaterialGroups.MaterialItem.SpecificationGroupLabel'),
        specificationGroupPlaceholder: this.localisationService.loc('ProductCreateOrEditMaterialGroups.MaterialItem.SpecificationGroupPlaceholder'),
        specificationLabel: this.localisationService.loc('ProductCreateOrEditMaterialGroups.MaterialItem.SpecificationLabel'),
        materialPlaceholder: this.localisationService.loc('ProductCreateOrEditMaterialGroups.MaterialItem.MaterialPlaceholder'),
        finalStatePlaceholder: this.localisationService.loc('ProductCreateOrEditMaterialGroups.MaterialItem.FinalStatePlaceholder'),
        specificationPlaceholder: this.localisationService.loc('ProductCreateOrEditMaterialGroups.MaterialItem.SpecificationPlaceholder'),
        secondSpecificationLabel: this.localisationService.loc('ProductCreateOrEditMaterialGroups.MaterialItem.SecondSpecificationLabel'),
        secondSpecificationPlaceholder: this.localisationService.loc('ProductCreateOrEditMaterialGroups.MaterialItem.SecondSpecificationPlaceholder'),
        firstSpecificationHeading: this.localisationService.loc('ProductCreateOrEditMaterialGroups.MaterialItem.FirstSpecificationHeading'),
        secondSpecificationHeading: this.localisationService.loc('ProductCreateOrEditMaterialGroups.MaterialItem.SecondSpecificationHeading'),
        inputErrorMessages: [this.localisationService.loc('Error.InputField.RequiredMissing')],
      }
    }
  }


  ngOnInit(): void {
    this.initWorkPieces();
    this.initSavingObservable();
  }

  protected validateFormData(): void {
    const hasWorkingPieces: boolean = this.workingPieces.length > 0;
    const allFieldsFilled: boolean = this.workingPieces.every(workingPiece =>
      workingPiece.materialGroupId &&
      workingPiece.material &&
      workingPiece.finalState &&
      workingPiece.specificationIds?.length > 0
    );
    const validFormData: boolean = hasWorkingPieces && allFieldsFilled;

    this.isValidChange.emit(validFormData);
  }

  private initWorkPieces() {
    this.productApiService.getProductMaterialGroups(this.productId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result: IProductMaterialGroupsInfo) => {
          this.materialGroups = result.materialGroups;
          this.workingPieces = result.workingPieces;
          this.validateFormData();
        }
      });
  }

  private initSavingObservable() {
    this.saveMaterialGroups.pipe(
      takeUntilDestroyed(this.destroyRef),
      this.switchMapCancelable(() => this.saveProductMaterialGroups())
    ).subscribe(workingPiecesResult => {
      if (!workingPiecesResult) {
        this.onSaveSuccess.emit(false);
        return;
      }

      this.workingPieces = workingPiecesResult;
      this.onSaveSuccess.emit(true);
    });
  }

  private saveProductMaterialGroups(): Observable<IWorkingPiece[] | null> {
    return this.productApiService.saveProductMaterialGroups(this.productId, this.workingPieces)
      .pipe(
        catchError(() => of(null))
      );
  }
}
