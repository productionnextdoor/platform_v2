export interface IWorkingPiece {
  workingPieceId?: number;
  materialGroupId: number;
  material: string;
  finalState: string;
  specificationIds: number[];
  specificationGroupIds: number[];
}

export function createEmptyWorkingPiece(): IWorkingPiece {
  return {
    materialGroupId: 0,
    material: '',
    finalState: '',
    specificationIds: [],
    specificationGroupIds: []
  };
}

export interface FormOutput {
  workingPieces: IWorkingPiece[];
  productId: number;
}

export interface IMaterialItemLocalisations {
  materialGroupLabel: string;
  materialGroupPlaceholder: string;
  materialLabel: string;
  materialPlaceholder: string;
  finalStateLabel: string;
  finalStatePlaceholder: string;
  specificationGroupLabel: string;
  specificationGroupPlaceholder: string;
  specificationLabel: string;
  specificationPlaceholder: string;
  secondSpecificationLabel: string;
  secondSpecificationPlaceholder: string;
  firstSpecificationHeading: string;
  secondSpecificationHeading: string;
  inputErrorMessages: string[];
}

export const materialItemLocalisations: IMaterialItemLocalisations = {
  materialGroupLabel: '',
  materialGroupPlaceholder: '',
  materialLabel: '',
  materialPlaceholder: '',
  finalStateLabel: '',
  finalStatePlaceholder: '',
  specificationGroupLabel: '',
  specificationGroupPlaceholder: '',
  specificationLabel: '',
  specificationPlaceholder: '',
  secondSpecificationLabel: '',
  secondSpecificationPlaceholder: '',
  firstSpecificationHeading: '',
  secondSpecificationHeading: '',
  inputErrorMessages: []
};
