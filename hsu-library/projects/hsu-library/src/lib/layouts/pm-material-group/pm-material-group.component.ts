import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { BannerType } from '../../components/pm-banner/pm-banner.shared';
import { PmCheckboxState } from '../../components/pm-checkbox/pm-checkbox.shared';
import { TextType } from '../../components/pm-text/pm-text.shared';
import {
  DefaultMargins,
  IMargin,
  PmComponentMargin
} from '../../utils/pm-component-margin';
import { IWorkingPiece } from '../pm-material-item/pm-material-item.shared';
import {
  IMaterialGroup,
  IMaterialGroupLocalisations,
  materialGroupLocalisations
} from './pm-material-group.shared';

@Component({
  selector: 'pm-material-group',
  templateUrl: './pm-material-group.component.html'
})
export class PmMaterialGroupComponent implements OnInit, OnChanges {

  @Input()
  productId: number = 0;

  @Input()
  materialGroups: IMaterialGroup[] = [];

  @Input()
  workingPieces: IWorkingPiece[][] = [];

  @Input()
  localisations: IMaterialGroupLocalisations = materialGroupLocalisations;

  @Input()
  isAdminView: boolean = false;

  @Output()
  workingPiecesChange: EventEmitter<IWorkingPiece[][]> = new EventEmitter<IWorkingPiece[][]>();

  /** @ignore */
  protected isBannerVisible: boolean = true;

  /** @ignore */
  protected hasMaterialGroupItems: boolean[] = [];

  /** @ignore */
  protected readonly PmCheckboxState = PmCheckboxState;

  /** @ignore */
  protected readonly BannerType = BannerType;

  /** @ignore */
  protected readonly TextType = TextType;

  /** @ignore */
  protected readonly margins: IMargin = DefaultMargins;

  /** @ignore */
  protected readonly titleMargin: PmComponentMargin = new PmComponentMargin(DefaultMargins.Large, 0, 0, 0);

  /** @ignore */
  protected readonly titleMarginWithoutDescription: PmComponentMargin = new PmComponentMargin(0, 0, DefaultMargins.Medium, 0);

  /** @ignore */
  protected readonly descriptionMargin: PmComponentMargin = new PmComponentMargin(DefaultMargins.XSmall, 0, DefaultMargins.XLarge, 0);

  /** @ignore */
  ngOnInit() {
    this.isBannerVisible = !this.isAdminView;
  }

  /** @ignore */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['workingPieces']) {
      this.updateMaterialGroupVisibility()
    }
  }

  /** @ignore */
  handleCheckboxActivation(event: PmCheckboxState, material: IMaterialGroup) {
    const active: boolean = PmCheckboxState.ACTIVE === event;
    this.hasMaterialGroupItems[material.materialGroupId] = active;

    this.workingPieces[material.materialGroupId] = active
      ? [PmMaterialGroupComponent.createEmptyWorkingPiece(material.materialGroupId)]
      : [];

    this.emitWorkingPieces();
  }

  /** @ignore */
  emitWorkingPieces() {
    this.workingPiecesChange.emit(this.workingPieces);
  }

  protected onCloseBanner() {
    this.isBannerVisible = false;
  }

  protected onWorkingPieceDeleted(workingPiece: IWorkingPiece): void {
    this.hasMaterialGroupItems[workingPiece.materialGroupId] = this.workingPieces[workingPiece.materialGroupId]?.length > 0;
  }

  private updateMaterialGroupVisibility(): void {
    this.materialGroups.map(materialGroup => {
      this.hasMaterialGroupItems[materialGroup.materialGroupId] = this.workingPieces[materialGroup.materialGroupId]?.length > 0;
    });
  }

  private static createEmptyWorkingPiece(materialGroupId: number): IWorkingPiece {
    return {
      materialGroupId,
      material: '',
      finalState: '',
      surfaceFinishId: 0
    }
  }
}
