import {
  IMaterialGroup,
  IMaterialGroupLocalisations
} from '../../../lib/layouts/pm-material-group/pm-material-group.shared';
import { IWorkingPiece } from '../../../lib/layouts/pm-material-item/pm-material-item.shared';

export interface IMaterialGroupData {
  materialGroups: IMaterialGroup[];
  workingPieces: IWorkingPiece[];
  localisations: IMaterialGroupLocalisations;
}

export const localisationsData: IMaterialGroupLocalisations = {
  bannerText: 'Bitte füge alle Produktangaben ein und gib mir das Produkt anschließend zur Prüfung frei. (Admin)',
  titleText: 'Beteiligte Materialgruppen im Produktstandard',
  descriptionText:
    'Füge die im Produktstandard verwendeten Materialgruppen hinzu (min. eine Materialgruppe). Gib bitte ' +
    'auch die Spezifizierung sowie den finalen Zustand der jeweiligen Materialgruppe im ' +
    'Produktionsprozess an. Beachte auch, dass die Auswahl der Materialgruppe(n) Auswirkung auf die Produktvarianten hat.',
  materialItem: {
    materialGroupLabel: 'Materialgruppe',
    materialGroupPlaceholder: 'Materialgruppe auswählen',
    materialLabel: 'Material im Produktstandard',
    finalStateLabel: 'Finaler Zustand der Rohmaterialgruppe im Produktionsprozess',
    specificationGroupLabel: 'Spezifizierungsgruppe',
    specificationGroupPlaceholder: 'Spezifizierungsgruppe auswählen',
    specificationLabel: 'Spezifizierung',
    materialPlaceholder: 'Material eingeben',
    finalStatePlaceholder: 'Finaler Zustand der Rohmaterialgruppe',
    specificationPlaceholder: 'Spezifizierung auswählen',
    secondSpecificationLabel: 'Zweite Spezifizierung (optional)',
    secondSpecificationPlaceholder: 'Zweite Spezifizierung auswählen',
    firstSpecificationHeading: 'Spezifizierung 1',
    secondSpecificationHeading: 'Spezifizierung 2 (optional)',
    inputErrorMessages: ['Erforderliches Feld']
  },
}

const GLASS_SPECIFICATION_ID: number = 5;

export const materialGroupData: IMaterialGroupData = {
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
    },
    {
      materialGroupId: 3,
      name: 'Metall',
      localizedName: 'Metall',
      options: [
        {
          key: 7,
          value: 'Oberfläche 01'
        },
        {
          key: 8,
          value: 'Oberfläche 02'
        },
        {
          key: 9,
          value: 'Oberfläche 03'
        }
      ],
    }
  ],
  workingPieces: [
    {
      materialGroupId: 1,
      material: 'Eiche',
      finalState: 'Finaler Zustand 1',
      specificationIds: [1],
      specificationGroupIds: []
    },
    {
      materialGroupId: 2,
      material: 'Floatglas',
      finalState: 'Finaler Zustand 2',
      specificationIds: [GLASS_SPECIFICATION_ID],
      specificationGroupIds: []
    }
  ],
  localisations: localisationsData
}
