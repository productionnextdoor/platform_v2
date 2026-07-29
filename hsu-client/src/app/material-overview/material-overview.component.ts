import {
  Component,
  DestroyRef,
  inject,
  OnInit
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  IMaterialCreateEvent,
  IMaterialEditEvent,
  IMaterialOverviewItem,
  IMaterialOverviewLocalisations,
  ISpecificationCreateEvent,
  ISpecificationEditEvent,
  ISpecificationGroupCreateEvent,
  ISpecificationGroupEditEvent
} from 'hsu-library';
import { IMaterialApiService } from '../../services/materials/imaterial-api.service';
import {
  CreateMaterialInput,
  CreateSpecificationGroupInput,
  CreateSpecificationInput,
  MaterialDto,
  UpdateMaterialInput,
  UpdateSpecificationGroupInput,
  UpdateSpecificationInput
} from '../../shared/service-proxies/service-proxies';
import { AppLocalizationService } from '../../services/localization/app-localization.service';
import { IPermissionManagerService } from '../../services/permissions/ipermission-manager.service';
import { PERMISSIONS } from '../../services/permissions/permissions';

@Component({
  selector: 'material-overview',
  templateUrl: './material-overview.component.html',
})
export class MaterialOverviewComponent implements OnInit {

  materials: IMaterialOverviewItem[] = [];
  loading = false;

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

  canCreate = false;
  canEdit = false;
  canDelete = false;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private readonly materialApiService: IMaterialApiService,
    private readonly localizationService: AppLocalizationService,
    private readonly permissionService: IPermissionManagerService
  ) {}

  ngOnInit(): void {
    this.initLocalisations();
    this.initPermissions();
    this.loadMaterials();
  }

  onCreateMaterial(event: IMaterialCreateEvent): void {
    const input: CreateMaterialInput = new CreateMaterialInput({
      name: event.name
    });
    this.materialApiService.create(input)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.loadMaterials()
      });
  }

  onEditMaterial(event: IMaterialEditEvent): void {
    const input: UpdateMaterialInput = new UpdateMaterialInput({
      name: event.name
    });
    this.materialApiService.update(event.materialId, input)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.loadMaterials()
      });
  }

  onDeleteMaterial(materialId: number): void {
    abp.message.confirm(
      this.localizationService.loc('Materials.DeleteConfirmation'),
      this.localizationService.loc('Materials.DeleteMaterial'),
      (confirmed: boolean) => {
        if (confirmed) {
          this.materialApiService.deleteMaterial(materialId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
              next: () => this.loadMaterials()
            });
        }
      }
    );
  }

  onEditSpecification(event: ISpecificationEditEvent): void {
    const input: UpdateSpecificationInput = new UpdateSpecificationInput({
      name: event.name,
      specificationGroupId: event.specificationGroupId ?? undefined
    });
    this.materialApiService.updateSpecification(event.specificationId, input)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.loadMaterials()
      });
  }

  onCreateSpecification(event: ISpecificationCreateEvent): void {
    const input: CreateSpecificationInput = new CreateSpecificationInput({
      name: event.name,
      specificationGroupId: event.specificationGroupId ?? undefined
    });
    this.materialApiService.createSpecification(event.materialId, input)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.loadMaterials()
      });
  }

  onDeleteSpecification(specificationId: number): void {
    abp.message.confirm(
      this.localizationService.loc('Materials.DeleteSpecificationConfirmation'),
      this.localizationService.loc('Materials.DeleteSpecification'),
      (confirmed: boolean) => {
        if (confirmed) {
          this.materialApiService.deleteSpecification(specificationId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
              next: () => this.loadMaterials()
            });
        }
      }
    );
  }

  onCreateSpecificationGroup(event: ISpecificationGroupCreateEvent): void {
    const input: CreateSpecificationGroupInput = new CreateSpecificationGroupInput({
      name: event.name
    });
    this.materialApiService.createSpecificationGroup(event.materialId, input)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.loadMaterials()
      });
  }

  onEditSpecificationGroup(event: ISpecificationGroupEditEvent): void {
    const input: UpdateSpecificationGroupInput = new UpdateSpecificationGroupInput({
      name: event.name
    });
    this.materialApiService.updateSpecificationGroup(event.groupId, input)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.loadMaterials()
      });
  }

  onDeleteSpecificationGroup(groupId: number): void {
    abp.message.confirm(
      this.localizationService.loc('Materials.DeleteGroupConfirmation'),
      this.localizationService.loc('Materials.DeleteGroup'),
      (confirmed: boolean) => {
        if (confirmed) {
          this.materialApiService.deleteSpecificationGroup(groupId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
              next: () => this.loadMaterials()
            });
        }
      }
    );
  }

  private loadMaterials(): void {
    this.loading = true;
    this.materialApiService.getAll()
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (materials) => {
          this.materials = this.mapMaterials(materials);
        },
        complete: () => this.loading = false
      });
  }

  private mapMaterials(dtos: MaterialDto[]): IMaterialOverviewItem[] {
    return dtos.map(dto => ({
      materialId: dto.id,
      name: this.localizeMaterialGroup(dto.name ?? ''),
      specifications: (dto.specifications ?? []).map(spec => ({
        specificationId: spec.id,
        name: this.localizeSpecification(spec.name ?? ''),
        specificationGroupId: spec.specificationGroupId ?? null
      })),
      specificationGroups: (dto.specificationGroups ?? []).map(group => ({
        groupId: group.id,
        name: group.name ?? '',
        specifications: (group.specifications ?? []).map(spec => ({
          specificationId: spec.id,
          name: this.localizeSpecification(spec.name ?? ''),
          specificationGroupId: group.id
        }))
      }))
    }));
  }

  private localizeMaterialGroup(name: string): string {
    const key: string = 'MaterialGroup.' + name;
    const localized: string = this.localizationService.loc(key);
    return localized !== key ? localized : name;
  }

  private localizeSpecification(name: string): string {
    const key: string = 'Specification.' + name;
    const localized: string = this.localizationService.loc(key);
    return localized !== key ? localized : name;
  }

  private initLocalisations(): void {
    this.localisations = {
      title: this.localizationService.loc('Materials.Title'),
      createButton: this.localizationService.loc('Materials.CreateButton'),
      nameLabel: this.localizationService.loc('Materials.NameLabel'),
      namePlaceholder: this.localizationService.loc('Materials.NamePlaceholder'),
      specificationsLabel: this.localizationService.loc('Materials.SpecificationsLabel'),
      specificationNameLabel: this.localizationService.loc('Materials.SpecificationNameLabel'),
      specificationNamePlaceholder: this.localizationService.loc('Materials.SpecificationNamePlaceholder'),
      addSpecification: this.localizationService.loc('Materials.AddSpecification'),
      saveButton: this.localizationService.loc('Materials.SaveButton'),
      cancelButton: this.localizationService.loc('Materials.CancelButton'),
      noMaterials: this.localizationService.loc('Materials.NoMaterials'),
      noSpecifications: this.localizationService.loc('Materials.NoSpecifications'),
      groupNameLabel: this.localizationService.loc('Materials.GroupNameLabel'),
      groupNamePlaceholder: this.localizationService.loc('Materials.GroupNamePlaceholder'),
      groupSingularLabel: this.localizationService.loc('Materials.GroupSingularLabel'),
      groupPluralLabel: this.localizationService.loc('Materials.GroupPluralLabel'),
      addGroup: this.localizationService.loc('Materials.AddGroup'),
      noGroups: this.localizationService.loc('Materials.NoGroups'),
      ungroupedSpecificationsLabel: this.localizationService.loc('Materials.UngroupedSpecificationsLabel'),
    };
  }

  private initPermissions(): void {
    this.canCreate = this.permissionService.isGranted(PERMISSIONS.materials.create);
    this.canEdit = this.permissionService.isGranted(PERMISSIONS.materials.update);
    this.canDelete = this.permissionService.isGranted(PERMISSIONS.materials.delete);
  }
}
