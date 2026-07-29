import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core';
import { ButtonType } from '../../components/pm-button/pm-button.component';
import { EPmInputType } from '../../components/pm-input/pm-input.component';
import { Icon } from '../../components/pm-icon/pm-icon.shared';
import { TextType } from '../../components/pm-text/pm-text.shared';
import { DefaultMargins } from '../../utils/pm-component-margin';
import { defaultBreadcrumbs, IBreadcrumbs } from '../pm-header/pm-header.shared';
import {
  IMaterialCreateEvent,
  IMaterialEditEvent,
  IMaterialOverviewItem,
  IMaterialOverviewLocalisations,
  IMaterialSpecificationItem,
  ISpecificationCreateEvent,
  ISpecificationEditEvent,
  ISpecificationGroupCreateEvent,
  ISpecificationGroupEditEvent,
  ISpecificationGroupItem
} from './pm-material-overview.shared';

@Component({
  selector: 'pm-material-overview',
  templateUrl: './pm-material-overview.component.html',
  styleUrls: ['./pm-material-overview.component.scss']
})
export class PmMaterialOverviewComponent implements OnChanges {

  protected readonly ButtonType = ButtonType;
  protected readonly TextType = TextType;
  protected readonly Icon = Icon;
  protected readonly EPmInputType = EPmInputType;
  protected readonly DefaultMargins = DefaultMargins;

  @Input()
  materials: IMaterialOverviewItem[] = [];

  @Input()
  localisations: IMaterialOverviewLocalisations = {
    title: '',
    createButton: '',
    nameLabel: '',
    namePlaceholder: '',
    specificationsLabel: '',
    specificationNameLabel: '',
    specificationNamePlaceholder: '',
    addSpecification: '',
    saveButton: '',
    cancelButton: '',
    noMaterials: '',
    noSpecifications: '',
    groupNameLabel: '',
    groupNamePlaceholder: '',
    groupSingularLabel: '',
    groupPluralLabel: '',
    addGroup: '',
    noGroups: '',
    ungroupedSpecificationsLabel: ''
  };

  @Input()
  loading = false;

  @Input()
  canCreate = false;

  @Input()
  canEdit = false;

  @Input()
  canDelete = false;

  @Output()
  onCreateMaterial = new EventEmitter<IMaterialCreateEvent>();

  @Output()
  onEditMaterial = new EventEmitter<IMaterialEditEvent>();

  @Output()
  onDeleteMaterial = new EventEmitter<number>();

  @Output()
  onCreateSpecification = new EventEmitter<ISpecificationCreateEvent>();

  @Output()
  onEditSpecification = new EventEmitter<ISpecificationEditEvent>();

  @Output()
  onDeleteSpecification = new EventEmitter<number>();

  @Output()
  onCreateSpecificationGroup = new EventEmitter<ISpecificationGroupCreateEvent>();

  @Output()
  onEditSpecificationGroup = new EventEmitter<ISpecificationGroupEditEvent>();

  @Output()
  onDeleteSpecificationGroup = new EventEmitter<number>();

  protected breadcrumbs: IBreadcrumbs = defaultBreadcrumbs;
  protected showCreateForm = false;
  protected newMaterialName = '';
  protected editState: IMaterialEditEvent | null = null;
  protected specEditState: { specificationId: number; name: string; specificationGroupId: number | null } | null = null;
  protected expandedMaterialIds: Set<number> = new Set();
  protected newSpecificationNames: Record<number, string> = {};
  protected newGroupSpecificationNames: Record<number, string> = {};
  protected newGroupNames: Record<number, string> = {};
  protected groupEditState: { groupId: number; name: string } | null = null;

  ngOnChanges(): void {
    this.breadcrumbs = {
      lastBreadcrumb: this.localisations.title
    };
  }

  toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm;
    this.newMaterialName = '';
  }

  canSubmitCreate(): boolean {
    return !!this.newMaterialName.trim();
  }

  createMaterial(): void {
    if (!this.canSubmitCreate()) return;
    this.onCreateMaterial.emit({
      name: this.newMaterialName.trim(),
      specifications: []
    });
    this.showCreateForm = false;
    this.newMaterialName = '';
  }

  startEdit(material: IMaterialOverviewItem): void {
    this.editState = {
      materialId: material.materialId,
      name: material.name
    };
  }

  cancelEdit(): void {
    this.editState = null;
  }

  saveEdit(): void {
    if (!this.editState || !this.editState.name.trim()) return;
    this.onEditMaterial.emit({
      materialId: this.editState.materialId,
      name: this.editState.name.trim()
    });
    this.editState = null;
  }

  deleteMaterial(materialId: number): void {
    this.onDeleteMaterial.emit(materialId);
  }

  toggleExpand(materialId: number): void {
    if (this.expandedMaterialIds.has(materialId)) {
      this.expandedMaterialIds.delete(materialId);
    } else {
      this.expandedMaterialIds.add(materialId);
    }
  }

  isExpanded(materialId: number): boolean {
    return this.expandedMaterialIds.has(materialId);
  }

  isEditing(materialId: number): boolean {
    return this.editState?.materialId === materialId;
  }

  addSpecification(materialId: number): void {
    const name: string | undefined = this.newSpecificationNames[materialId]?.trim();
    if (!name) return;
    this.onCreateSpecification.emit({
      materialId,
      name,
      specificationGroupId: null
    });
    this.newSpecificationNames[materialId] = '';
  }

  startSpecEdit(spec: IMaterialSpecificationItem): void {
    this.specEditState = {
      specificationId: spec.specificationId,
      name: spec.name,
      specificationGroupId: spec.specificationGroupId
    };
  }

  cancelSpecEdit(): void {
    this.specEditState = null;
  }

  saveSpecEdit(): void {
    if (!this.specEditState || !this.specEditState.name.trim()) return;
    this.onEditSpecification.emit({
      specificationId: this.specEditState.specificationId,
      name: this.specEditState.name.trim(),
      specificationGroupId: this.specEditState.specificationGroupId
    });
    this.specEditState = null;
  }

  isEditingSpec(specId: number): boolean {
    return this.specEditState?.specificationId === specId;
  }

  deleteSpecification(specificationId: number): void {
    this.onDeleteSpecification.emit(specificationId);
  }

  trackByMaterialId(_index: number, material: IMaterialOverviewItem): number {
    return material.materialId;
  }

  trackByGroupId(_index: number, group: ISpecificationGroupItem): number {
    return group.groupId;
  }

  addGroup(materialId: number): void {
    const name: string | undefined = this.newGroupNames[materialId]?.trim();
    if (!name) return;
    this.onCreateSpecificationGroup.emit({
      materialId,
      name
    });
    this.newGroupNames[materialId] = '';
  }

  startGroupEdit(group: ISpecificationGroupItem): void {
    this.groupEditState = {
      groupId: group.groupId,
      name: group.name
    };
  }

  cancelGroupEdit(): void {
    this.groupEditState = null;
  }

  saveGroupEdit(): void {
    if (!this.groupEditState || !this.groupEditState.name.trim()) return;
    this.onEditSpecificationGroup.emit({
      groupId: this.groupEditState.groupId,
      name: this.groupEditState.name.trim()
    });
    this.groupEditState = null;
  }

  isEditingGroup(groupId: number): boolean {
    return this.groupEditState?.groupId === groupId;
  }

  deleteGroup(groupId: number): void {
    this.onDeleteSpecificationGroup.emit(groupId);
  }

  addSpecificationToGroup(materialId: number, groupId: number): void {
    const name: string | undefined = this.newGroupSpecificationNames[groupId]?.trim();
    if (!name) return;
    this.onCreateSpecification.emit({
      materialId,
      name,
      specificationGroupId: groupId
    });
    this.newGroupSpecificationNames[groupId] = '';
  }

  getUngroupedSpecifications(material: IMaterialOverviewItem): IMaterialSpecificationItem[] {
    return material.specifications.filter(spec => !spec.specificationGroupId);
  }
}
