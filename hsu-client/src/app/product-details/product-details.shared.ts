import {
  IProductDetailsSidebarLocalisations,
  productDetailsSidebarLocalisations,
  productGraphCardLocalisations,
  graphKeys,
  IProductGraphCardLocalisations,
  IGraphKeys,
  TConstEnum
} from 'hsu-library';

export interface IProductDetailsSharedLocalisations {
  sidebar: IProductDetailsSidebarLocalisations;
  productGraphCard: IProductGraphCardLocalisations;
  graphKeys: IGraphKeys;
}

export const productDetailsSharedLocalisations: IProductDetailsSharedLocalisations = {
  sidebar: productDetailsSidebarLocalisations,
  productGraphCard: productGraphCardLocalisations,
  graphKeys: graphKeys,
}

export const EditModeButtonType: TConstEnum = {
  Cancel: 'cancel',
  Confirm: 'confirm',
} as const

export type EditModeButtonTypeValues = typeof EditModeButtonType[keyof typeof EditModeButtonType];


