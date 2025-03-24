import {
  IMaterialItemLocalisations,
  IWorkingPiece
} from '../../../lib/layouts/pm-material-item/pm-material-item.shared';
import { PmDropdownOption } from '../../../lib/components/pm-dropdown/pm-dropdown.shared';

export interface IMaterialItemData {
  localisations: IMaterialItemLocalisations,
  surfaceFinishes: PmDropdownOption<number>[],
  workingPieces: IWorkingPiece[],
}

export const materialItemData: IMaterialItemData = {
  localisations: {
    materialLabel: 'Material im Produktstandard',
    materialPlaceholder: 'Material eingeben',
    finalStateLabel: 'Finaler Zustand der Rohmaterialgruppe im Produktionsprozess',
    finalStatePlaceholder: 'Finaler Zustand der Rohmaterialgruppe',
    surfaceFinishLabel: 'Oberflächenbeschaffenheit',
    surfaceFinishPlaceholder: 'Zustand auswählen',
    inputErrorMessages: ['Erforderliches Feld']
  },
  surfaceFinishes: [
    {
      key: 0,
      value: ''
    },
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
    },
  ],
  workingPieces: [{
    materialGroupId: 1,
    material: 'Material 1',
    finalState: 'Finaler Zustand 1',
    surfaceFinishId: 1,
  },
  {
    materialGroupId: 2,
    material: 'Material 2',
    finalState: 'Finaler Zustand 2',
    surfaceFinishId: 2,
  },
  ]
}

