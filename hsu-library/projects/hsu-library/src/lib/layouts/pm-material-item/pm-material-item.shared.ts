export interface IWorkingPiece {
  workingPieceId?: number;
  materialGroupId: number;
  material: string;
  finalState: string;
  surfaceFinishId: number;
}

export interface FormOutput {
  workingPieces: IWorkingPiece[];
  productId: number;
}

export interface IMaterialItemLocalisations {
  materialLabel: string;
  materialPlaceholder: string;
  finalStateLabel: string;
  finalStatePlaceholder: string;
  surfaceFinishLabel: string;
  surfaceFinishPlaceholder: string;
  inputErrorMessages: string[];
}

export const materialItemLocalisations: IMaterialItemLocalisations = {
  materialLabel: '',
  materialPlaceholder: '',
  finalStateLabel: '',
  finalStatePlaceholder: '',
  surfaceFinishLabel: '',
  surfaceFinishPlaceholder: '',
  inputErrorMessages: []
};
