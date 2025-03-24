export interface IProductVariantsLocalisations {
  bannerText: string,
  titleText: string,
  descriptionText: string,
  heightLabel: string,
  heightPlaceholder: string,
  widthLabel: string,
  widthPlaceholder: string,
  depthLabel: string,
  depthPlaceholder: string,
  workPieceDropdownLabel: string,
  workPieceDropdownPlaceholder: string,
  workPieceVariantLabel: string,
  workPieceVariantPlaceholder: string,
  measurementVariantsTitle: string,
  workPieceVariantsTitle: string,
  inputErrorMessages: string[],
}

export interface IMeasurement {
  measurementId: number;
  height: number;
  width: number;
  depth: number;
  position?: number;
  isDefaultMeasurement: boolean,
}

export interface IWorkPieceVariant {
  variantId: number;
  workPieceId: number;
  description: string;
}
