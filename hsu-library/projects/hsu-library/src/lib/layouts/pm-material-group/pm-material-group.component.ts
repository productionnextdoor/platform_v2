import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { BannerType } from '../../components/pm-banner/pm-banner.shared';
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
export class PmMaterialGroupComponent implements OnInit {

  @Input()
  productId: number = 0;

  @Input()
  materialGroups: IMaterialGroup[] = [];

  @Input()
  workingPieces: IWorkingPiece[] = [];

  @Input()
  localisations: IMaterialGroupLocalisations = materialGroupLocalisations;

  @Input()
  isAdminView: boolean = false;

  @Output()
  workingPiecesChange: EventEmitter<IWorkingPiece[]> = new EventEmitter<IWorkingPiece[]>();

  /** @ignore */
  protected isBannerVisible: boolean = true;

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
  emitWorkingPieces() {
    this.workingPiecesChange.emit(this.workingPieces);
  }

  protected onCloseBanner() {
    this.isBannerVisible = false;
  }
}
