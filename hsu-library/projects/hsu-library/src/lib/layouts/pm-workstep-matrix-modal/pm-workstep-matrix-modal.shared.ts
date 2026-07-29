import {
  IWorkstepMatrixLocalisations,
  WorkstepMatrixLocalisations
} from '../pm-workstep-matrix/pm-workstep-matrix.shared';

export interface IWorkstepMatrixModalLocalisations {
  context: string;
  title: string;
  cancel: string;
  save: string;
  delete: string;
  matrix: IWorkstepMatrixLocalisations;
  confirmDeletePopup: {
    title: string;
    description: string;
    confirm: string;
    cancel: string;
  };
}

export const WorkstepMatrixModalLocalisations: IWorkstepMatrixModalLocalisations = {
  context: '',
  title: '',
  cancel: '',
  save: '',
  delete: '',
  matrix: WorkstepMatrixLocalisations,
  confirmDeletePopup: {
    title: '',
    description: '',
    confirm: '',
    cancel: ''
  }
};
