import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { ButtonType } from '../../components/pm-button/pm-button.component';
import { PmDropdownOption } from '../../components/pm-dropdown/pm-dropdown.shared';
import { Icon } from '../../components/pm-icon/pm-icon.shared';
import { EPmInputType } from '../../components/pm-input/pm-input.component';
import { DefaultMargins, PmComponentMargin } from '../../utils/pm-component-margin';
import {
  IMaterialItemLocalisations,
  IWorkingPiece,
  materialItemLocalisations
} from './pm-material-item.shared';


@Component({
  selector: 'pm-material-item',
  templateUrl: './pm-material-item.component.html'
})
export class PmMaterialItemComponent {

  /** @ignore */
  protected readonly EPmInputType = EPmInputType;

  /** @ignore */
  protected readonly ButtonType = ButtonType;

  /** @ignore */
  protected readonly Icon = Icon;

  /** @ignore */
  protected readonly margins = DefaultMargins;

  /** @ignore */
  protected readonly deleteBtnMargin = new PmComponentMargin(DefaultMargins.Large, 0, 0, 0);

  /** @ignore */
  protected readonly inputFieldsMargin: PmComponentMargin = new PmComponentMargin(0, 0, DefaultMargins.XSmall, 0);

  @Input()
  workingPieces: IWorkingPiece[] = [];

  @Input()
  inputValue: string = '';

  @Input()
  localisations: IMaterialItemLocalisations = materialItemLocalisations;

  @Input()
  materialGroupId: number = 0;

  @Input()
  surfaceFinishes: PmDropdownOption<number>[] = [];

  @Output()
  workingPiecesChange: EventEmitter<IWorkingPiece[]> = new EventEmitter<IWorkingPiece[]>();

  @Output()
  workingPieceDeleted: EventEmitter<IWorkingPiece> = new EventEmitter<IWorkingPiece>();

  constructor(private el: ElementRef) {
  }

  /** @ignore */
  addForm() {
    this.workingPieces.push({
      materialGroupId: this.materialGroupId,
      material: '',
      finalState: '',
      surfaceFinishId: 0
    });
    this.workingPiecesChange.emit(this.workingPieces);
  }

  valueChange() {
    this.workingPiecesChange.emit(this.workingPieces);
  }


  /** @ignore */
  deleteForm(index: number) {
    const deletedWorkingPiece: IWorkingPiece = this.workingPieces[index];
    this.workingPieces.splice(index, 1);
    this.workingPiecesChange.emit(this.workingPieces);
    this.workingPieceDeleted.emit(deletedWorkingPiece);
    this.emitChangeEvent();
  }

  emitChangeEvent() {
    this.el.nativeElement.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
    }));
  }
}
