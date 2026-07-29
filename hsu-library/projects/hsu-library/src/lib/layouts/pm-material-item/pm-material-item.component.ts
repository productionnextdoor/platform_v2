import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { ButtonType } from '../../components/pm-button/pm-button.component';
import { PmDropdownOption } from '../../components/pm-dropdown/pm-dropdown.shared';
import { Icon } from '../../components/pm-icon/pm-icon.shared';
import { EPmInputType } from '../../components/pm-input/pm-input.component';
import { TextType } from '../../components/pm-text/pm-text.shared';
import { DefaultMargins, PmComponentMargin } from '../../utils/pm-component-margin';
import { IMaterialGroup } from '../pm-material-group/pm-material-group.shared';
import {
  createEmptyWorkingPiece,
  IMaterialItemLocalisations,
  IWorkingPiece,
  materialItemLocalisations
} from './pm-material-item.shared';


@Component({
  selector: 'pm-material-item',
  templateUrl: './pm-material-item.component.html'
})
export class PmMaterialItemComponent implements OnChanges {

  /** @ignore */
  protected readonly EPmInputType = EPmInputType;

  /** @ignore */
  protected readonly ButtonType = ButtonType;

  /** @ignore */
  protected readonly Icon = Icon;

  /** @ignore */
  protected readonly TextType = TextType;

  /** @ignore */
  protected readonly margins = DefaultMargins;

  /** @ignore */
  protected readonly deleteBtnMargin = new PmComponentMargin(DefaultMargins.Large, 0, 0, 0);

  private readonly clearOption: PmDropdownOption<number> = {
    key: 0,
    value: '—'
  };

  /** @ignore */
  protected readonly inputFieldsMargin: PmComponentMargin = new PmComponentMargin(0, 0, DefaultMargins.XSmall, 0);

  @Input()
  workingPieces: IWorkingPiece[] = [];

  @Input()
  localisations: IMaterialItemLocalisations = materialItemLocalisations;

  @Input()
  materialGroups: IMaterialGroup[] = [];

  @Output()
  workingPiecesChange: EventEmitter<IWorkingPiece[]> = new EventEmitter<IWorkingPiece[]>();

  @Output()
  workingPieceDeleted: EventEmitter<IWorkingPiece> = new EventEmitter<IWorkingPiece>();

  /** @ignore */
  protected materialGroupOptions: PmDropdownOption<number>[] = [];

  /** @ignore */
  private specGroupOptionsMap = new Map<number, PmDropdownOption<number>[]>();

  constructor(private el: ElementRef) {
  }

  /** @ignore */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['materialGroups']) {
      this.materialGroupOptions = this.materialGroups.map(group => ({
        key: group.materialGroupId,
        value: group.localizedName
      }));
      this.specGroupOptionsMap.clear();
      for (const matGroup of this.materialGroups) {
        const options: PmDropdownOption<number>[] = matGroup.optionGroups?.map(group => ({
          key: group.groupId,
          value: group.groupName
        })) ?? [];
        this.specGroupOptionsMap.set(matGroup.materialGroupId, options);
      }
    }
  }

  /** @ignore */
  getSpecificationGroupOptions(materialGroupId: number): PmDropdownOption<number>[] {
    return this.specGroupOptionsMap.get(materialGroupId) ?? [];
  }

  /** @ignore */
  hasSpecificationGroups(materialGroupId: number): boolean {
    return this.getSpecificationGroupOptions(materialGroupId).length > 0;
  }

  /** @ignore */
  getSpecsForSelectedGroup(workingPiece: IWorkingPiece, index: number): PmDropdownOption<number>[] {
    const materialGroup: IMaterialGroup | undefined = this.materialGroups.find(group => group.materialGroupId === workingPiece.materialGroupId);
    if (!materialGroup) return [];
    if (!materialGroup.optionGroups?.length) return materialGroup.options;
    const groupId: number | undefined = workingPiece.specificationGroupIds[index];
    if (groupId === undefined) return [];
    return materialGroup.optionGroups.find(group => group.groupId === groupId)?.options ?? [];
  }

  /** @ignore */
  getFilteredSpecificationsForSecondDropdown(workingPiece: IWorkingPiece): PmDropdownOption<number>[] {
    const specs: PmDropdownOption<number>[] = this.getSpecsForSelectedGroup(workingPiece, 1);
    const filtered: PmDropdownOption<number>[] = specs.filter(option => option.key !== workingPiece.specificationIds[0]);
    return [this.clearOption, ...filtered];
  }

  /** @ignore */
  getFirstSpecGroupId(workingPiece: IWorkingPiece): number | undefined {
    return workingPiece.specificationGroupIds[0];
  }

  /** @ignore */
  getSecondSpecGroupId(workingPiece: IWorkingPiece): number | undefined {
    return workingPiece.specificationGroupIds[1];
  }

  /** @ignore */
  getFirstSpecificationId(workingPiece: IWorkingPiece): number {
    return workingPiece.specificationIds[0] ?? 0;
  }

  /** @ignore */
  getSecondSpecificationId(workingPiece: IWorkingPiece): number {
    return workingPiece.specificationIds[1] ?? 0;
  }

  /** @ignore */
  onFirstSpecGroupChange(workingPiece: IWorkingPiece, value: number): void {
    const secondGroupId: number | undefined = workingPiece.specificationGroupIds[1];
    workingPiece.specificationGroupIds = secondGroupId !== undefined ? [value, secondGroupId] : [value];
    workingPiece.specificationIds = workingPiece.specificationIds.length > 1
      ? [0, workingPiece.specificationIds[1]]
      : [];
    this.workingPiecesChange.emit(this.workingPieces);
  }

  /** @ignore */
  onSecondSpecGroupChange(workingPiece: IWorkingPiece, value: number): void {
    workingPiece.specificationGroupIds = [workingPiece.specificationGroupIds[0], value];
    workingPiece.specificationIds = [workingPiece.specificationIds[0]];
    this.workingPiecesChange.emit(this.workingPieces);
  }

  /** @ignore */
  onFirstSpecificationChange(workingPiece: IWorkingPiece, value: number): void {
    const second: number | undefined = workingPiece.specificationIds[1];
    workingPiece.specificationIds = second && second !== value ? [value, second] : [value];
    this.workingPiecesChange.emit(this.workingPieces);
  }

  /** @ignore */
  onSecondSpecificationChange(workingPiece: IWorkingPiece, value: number): void {
    workingPiece.specificationIds = value ? [workingPiece.specificationIds[0], value] : [workingPiece.specificationIds[0]];
    this.workingPiecesChange.emit(this.workingPieces);
  }

  /** @ignore */
  onMaterialGroupChange(workingPiece: IWorkingPiece): void {
    workingPiece.specificationGroupIds = [];
    workingPiece.specificationIds = [];
    this.workingPiecesChange.emit(this.workingPieces);
  }

  /** @ignore */
  addForm() {
    this.workingPieces.push(createEmptyWorkingPiece());
    this.workingPiecesChange.emit(this.workingPieces);
  }

  /** @ignore */
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

  /** @ignore */
  emitChangeEvent() {
    this.el.nativeElement.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
    }));
  }
}
