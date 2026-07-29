import {
  IMaterialOverviewItem,
  IMaterialOverviewLocalisations
} from '../../../lib/layouts/pm-material-overview/pm-material-overview.shared';

export interface IMaterialOverviewData {
  materials: IMaterialOverviewItem[];
  localisations: IMaterialOverviewLocalisations;
  loading: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

const localisations: IMaterialOverviewLocalisations = {
  title: 'Materialverwaltung',
  createButton: 'Material erstellen',
  nameLabel: 'Name',
  namePlaceholder: 'Materialname eingeben',
  specificationsLabel: 'Spezifikationen',
  specificationNameLabel: 'Spezifikation',
  specificationNamePlaceholder: 'Spezifikationsname eingeben',
  addSpecification: 'Spezifikation hinzufügen',
  saveButton: 'Speichern',
  cancelButton: 'Abbrechen',
  noMaterials: 'Keine Materialien vorhanden',
  noSpecifications: 'Keine Spezifikationen vorhanden',
  groupNameLabel: 'Gruppe',
  groupNamePlaceholder: 'Gruppenname eingeben',
  groupSingularLabel: 'Gruppe',
  groupPluralLabel: 'Gruppen',
  addGroup: 'Gruppe hinzufügen',
  noGroups: 'Keine Gruppen vorhanden',
  ungroupedSpecificationsLabel: 'Spezifizierungen ohne Gruppe'
};

const materials: IMaterialOverviewItem[] = [
  {
    materialId: 1,
    name: 'Eiche massiv',
    specifications: [
      {
        specificationId: 1,
        name: '20mm Stärke',
        specificationGroupId: null
      },
      {
        specificationId: 2,
        name: '40mm Stärke',
        specificationGroupId: null
      }
    ],
    specificationGroups: [
      {
        groupId: 1,
        name: 'Farben',
        specifications: [
          {
            specificationId: 4,
            name: 'Rot',
            specificationGroupId: 1
          },
          {
            specificationId: 5,
            name: 'Blau',
            specificationGroupId: 1
          }
        ]
      }
    ]
  },
  {
    materialId: 2,
    name: 'Buche furniert',
    specifications: [
      {
        specificationId: 3,
        name: '15mm Stärke',
        specificationGroupId: null
      }
    ],
    specificationGroups: []
  },
  {
    materialId: 3,
    name: 'Edelstahl gebürstet',
    specifications: [],
    specificationGroups: []
  }
];

export const materialOverviewDefault: IMaterialOverviewData = {
  materials,
  localisations,
  loading: false,
  canCreate: true,
  canEdit: true,
  canDelete: true
};

export const materialOverviewReadonly: IMaterialOverviewData = {
  materials,
  localisations,
  loading: false,
  canCreate: false,
  canEdit: false,
  canDelete: false
};

export const materialOverviewEmpty: IMaterialOverviewData = {
  materials: [],
  localisations,
  loading: false,
  canCreate: true,
  canEdit: false,
  canDelete: false
};

export const materialOverviewLoading: IMaterialOverviewData = {
  materials: [],
  localisations,
  loading: true,
  canCreate: false,
  canEdit: false,
  canDelete: false
};
