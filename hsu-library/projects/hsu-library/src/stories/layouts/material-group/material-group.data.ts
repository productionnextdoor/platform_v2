import {
  IMaterialGroup,
  IMaterialGroupLocalisations
} from '../../../lib/layouts/pm-material-group/pm-material-group.shared';
import { IWorkingPiece } from '../../../lib/layouts/pm-material-item/pm-material-item.shared';

export interface IMaterialGroupData {
  materialGroups: IMaterialGroup[];
  workingPieces: IWorkingPiece[] [];
  localisations: IMaterialGroupLocalisations;
}

export const localisationsData: IMaterialGroupLocalisations = {
  bannerText: 'Bitte füge alle Produktangaben ein und gib mir das Produkt anschließend zur Prüfung frei. (Admin)',
  titleText: 'Beteiligte Materialgruppen im Produktstandard',
  descriptionText:
    'Wähle die Materialgruppe(n) aus, die im Produktstandard verwendet werden (min. eine Materialgruppe). Gib bitte ' +
    'auch die zu bearbeitende Oberflächenbeschaffenheit sowie den finalen Zustand der jeweiligen Materialgruppe im ' +
    'Produktionsprozess an. Beachte auch, dass die Auswahl der Materialgruppe(n) Auswirkung auf die Produktvarianten hat.',
  materialItem: {
    materialLabel: 'Material im Produktstandard',
    finalStateLabel: 'Finaler Zustand der Rohmaterialgruppe im Produktionsprozess',
    surfaceFinishLabel: 'Oberflächenbeschaffenheit',
    materialPlaceholder: 'Material eingeben',
    finalStatePlaceholder: 'Finaler Zustand der Rohmaterialgruppe',
    surfaceFinishPlaceholder: 'Zustand auswählen',
    inputErrorMessages: ['Erforderliches Feld']
  },
}

export const materialGroupData: IMaterialGroupData = {
  materialGroups: [
    {
      materialGroupId: 0,
      name: 'Holz',
      localizedName: 'Holz',
      options: [
        {
          key: 0, value: ''
        },
        {
          key: 1, value: 'Oberfläche 01'
        },
        {
          key: 2, value: 'Oberfläche 02'
        },
        {
          key: 3, value: 'Oberfläche 03'
        }
      ],
    },
    {
      materialGroupId: 1,
      name: 'Glas',
      localizedName: 'Glas',
      options: [
        {
          key: 0, value: ''
        },
        {
          key: 1, value: 'Oberfläche 01'
        },
        {
          key: 2, value: 'Oberfläche 02'
        },
        {
          key: 3, value: 'Oberfläche 03'
        }
      ],
    },
    {
      materialGroupId: 2,
      name: 'Metall',
      localizedName: 'Metall',
      options: [
        {
          key: 0, value: ''
        },
        {
          key: 1, value: 'Oberfläche 01'
        },
        {
          key: 2, value: 'Oberfläche 02'
        },
        {
          key: 3, value: 'Oberfläche 03'
        }
      ],
    },
    {
      materialGroupId: 3,
      name: 'Other',
      localizedName: 'Other',
      options: [
      ],
    }
  ],
  workingPieces: [
    [{
      materialGroupId: 1,
      material: 'Holz',
      finalState: 'Finaler Zustand 1',
      surfaceFinishId: 1
    }],
    [{
      materialGroupId: 2,
      material: 'Glas',
      finalState: 'Finaler Zustand 2',
      surfaceFinishId: 2
    }],
    [{
      materialGroupId: 3,
      material: 'Metall',
      finalState: 'Finaler Zustand 3',
      surfaceFinishId: 3
    }]
  ],
  localisations: localisationsData
}
