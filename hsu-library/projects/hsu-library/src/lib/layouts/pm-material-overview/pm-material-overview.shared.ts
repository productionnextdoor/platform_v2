export interface IMaterialOverviewLocalisations {
  title: string;
  createButton: string;
  nameLabel: string;
  namePlaceholder: string;
  specificationsLabel: string;
  specificationNameLabel: string;
  specificationNamePlaceholder: string;
  addSpecification: string;
  saveButton: string;
  cancelButton: string;
  noMaterials: string;
  noSpecifications: string;
  groupNameLabel: string;
  groupNamePlaceholder: string;
  groupSingularLabel: string;
  groupPluralLabel: string;
  addGroup: string;
  noGroups: string;
  ungroupedSpecificationsLabel: string;
}

export interface IMaterialOverviewItem {
  materialId: number;
  name: string;
  specifications: IMaterialSpecificationItem[];
  specificationGroups: ISpecificationGroupItem[];
}

export interface IMaterialSpecificationItem {
  specificationId: number;
  name: string;
  specificationGroupId: number | null;
}

export interface ISpecificationGroupItem {
  groupId: number;
  name: string;
  specifications: IMaterialSpecificationItem[];
}

export interface IMaterialCreateEvent {
  name: string;
  specifications: string[];
}

export interface IMaterialEditEvent {
  materialId: number;
  name: string;
}

export interface ISpecificationCreateEvent {
  materialId: number;
  name: string;
  specificationGroupId: number | null;
}

export interface ISpecificationEditEvent {
  specificationId: number;
  name: string;
  specificationGroupId: number | null;
}

export interface ISpecificationGroupCreateEvent {
  materialId: number;
  name: string;
}

export interface ISpecificationGroupEditEvent {
  groupId: number;
  name: string;
}
