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
import { AppConsts } from '../../../shared/AppConsts';

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

  protected workingPieces: IWorkingPiece[][] = []

  protected localisations: IMaterialGroupLocalisations;

  private destroyRef: DestroyRef = inject(DestroyRef);


  constructor(
    private readonly productApiService: ProductApiService,
    private readonly localisationService: AppLocalizationService
  ) {
    super();

    const localisationPrefix: string = AppConsts.IsOffer ? 'ProductOfferCreateOrEditMaterialGroups' : 'ProductCreateOrEditMaterialGroups'
    this.localisations = {
      bannerText: this.localisationService.loc('ProductCreateOrEditMaterialGroups.Note'),
      titleText: this.localisationService.loc(localisationPrefix + '.SubTitle'),
      descriptionText: this.localisationService.loc(localisationPrefix + '.Description'),
      materialItem: {
        materialLabel: this.localisationService.loc(localisationPrefix + '.MaterialItem.MaterialLabel'),
        finalStateLabel: this.localisationService.loc('ProductCreateOrEditMaterialGroups.MaterialItem.FinalStateLabel'),
        surfaceFinishLabel: this.localisationService.loc('ProductCreateOrEditMaterialGroups.MaterialItem.SurfaceFinishLabel'),
        materialPlaceholder: this.localisationService.loc('ProductCreateOrEditMaterialGroups.MaterialItem.MaterialPlaceholder'),
        finalStatePlaceholder: this.localisationService.loc('ProductCreateOrEditMaterialGroups.MaterialItem.FinalStatePlaceholder'),
        surfaceFinishPlaceholder: this.localisationService.loc('ProductCreateOrEditMaterialGroups.MaterialItem.SurfaceFinishPlaceholder'),
        inputErrorMessages: [this.localisationService.loc('Error.InputField.RequiredMissing')],
      }
    }
  }


  ngOnInit(): void {
    this.initWorkPieces();
    this.initSavingObservable();
  }

  protected validateFormData(): void {
    const flattenedWorkingPieces: IWorkingPiece [] = this.getFlattenWorkingPieces();
    const hasWorkingPieces: boolean = flattenedWorkingPieces.length > 0;
    const validFormData: boolean = hasWorkingPieces && flattenedWorkingPieces
      .every(workingPiece =>
        workingPiece.material &&
        workingPiece.finalState &&
        ((this.materialGroups.find(materialGroup => materialGroup.materialGroupId === workingPiece.materialGroupId)?.options.length ?? 0) === 0
          || workingPiece.surfaceFinishId)
      )
    this.isValidChange.emit(validFormData);
  }

  private initWorkPieces() {
    this.productApiService.getProductMaterialGroups(this.productId)
      .subscribe({
        next: (result: IProductMaterialGroupsInfo) => {
          this.materialGroups = result.materialGroups;
          this.workingPieces = ProductMaterialGroupsStepComponent.mapWorkingPiecesByMaterialGroupId(result.workingPieces);
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

      this.workingPieces = ProductMaterialGroupsStepComponent.mapWorkingPiecesByMaterialGroupId(workingPiecesResult);
      this.onSaveSuccess.emit(true);
    });
  }

  private saveProductMaterialGroups(): Observable<IWorkingPiece[] | null> {
    return this.productApiService.saveProductMaterialGroups(this.productId, this.getFlattenWorkingPieces())
      .pipe(
        catchError(() => of(null)) // Prevents the observable to be completed on error
      );
  }

  private getFlattenWorkingPieces(): IWorkingPiece[] {
    return this.workingPieces
      .reduce((acc, workingPieces) => acc.concat(workingPieces), []);
  }

  private static mapWorkingPiecesByMaterialGroupId(workingPieces: IWorkingPiece[]): IWorkingPiece[][] {
    return workingPieces.reduce((acc: IWorkingPiece[][], workingPiece: IWorkingPiece) => {
      acc[workingPiece.materialGroupId] = acc[workingPiece.materialGroupId] || [];
      acc[workingPiece.materialGroupId].push(workingPiece);
      return acc;
    }, []);
  }
}
