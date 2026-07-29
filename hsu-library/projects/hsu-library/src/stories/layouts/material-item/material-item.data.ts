import {
  IMaterialItemLocalisations,
  IWorkingPiece
} from '../../../lib/layouts/pm-material-item/pm-material-item.shared';
import { IMaterialGroup } from '../../../lib/layouts/pm-material-group/pm-material-group.shared';

export interface IMaterialItemData {
  localisations: IMaterialItemLocalisations,
  materialGroups: IMaterialGroup[],
  workingPieces: IWorkingPiece[],
}

const GLASS_SPECIFICATION_ID: number = 5;

export const materialItemData: IMaterialItemData = {
  localisations: {
    materialGroupLabel: 'Materialgruppe',
    materialGroupPlaceholder: 'Materialgruppe auswählen',
    materialLabel: 'Material im Produktstandard',
    materialPlaceholder: 'Material eingeben',
    finalStateLabel: 'Finaler Zustand der Rohmaterialgruppe im Produktionsprozess',
    finalStatePlaceholder: 'Finaler Zustand der Rohmaterialgruppe',
    specificationGroupLabel: 'Spezifizierungsgruppe',
    specificationGroupPlaceholder: 'Spezifizierungsgruppe auswählen',
    specificationLabel: 'Spezifizierung',
    specificationPlaceholder: 'Spezifizierung auswählen',
    secondSpecificationLabel: 'Zweite Spezifizierung (optional)',
    secondSpecificationPlaceholder: 'Zweite Spezifizierung auswählen',
    firstSpecificationHeading: 'Spezifizierung 1',
    secondSpecificationHeading: 'Spezifizierung 2 (optional)',
    inputErrorMessages: ['Erforderliches Feld']
  },
  materialGroups: [
    {
      materialGroupId: 1,
      name: 'Holz',
      localizedName: 'Holz',
      options: [
        {
          key: 1,
          value: 'Oberfläche 01'
        },
        {
          key: 2,
          value: 'Oberfläche 02'
        },
        {
          key: 3,
          value: 'Oberfläche 03'
        }
      ],
    },
    {
      materialGroupId: 2,
      name: 'Glas',
      localizedName: 'Glas',
      options: [
        {
          key: 4,
          value: 'Oberfläche 01'
        },
        {
          key: 5,
          value: 'Oberfläche 02'
        },
        {
          key: 6,
          value: 'Oberfläche 03'
        }
      ],
    }
  ],
  workingPieces: [{
    materialGroupId: 1,
    material: 'Eiche',
    finalState: 'Finaler Zustand 1',
    specificationIds: [1],
    specificationGroupIds: [],
  },
  {
    materialGroupId: 2,
    material: 'Floatglas',
    finalState: 'Finaler Zustand 2',
    specificationIds: [GLASS_SPECIFICATION_ID],
    specificationGroupIds: [],
  },
  ]
}
