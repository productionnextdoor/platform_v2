import {
  IPmConfirmPopupLocalisations,
  IValueChainTableLocalisation,
  pmConfirmPopupLocalisations,
  ValueChainTableLocalisation
} from 'hsu-library'

export enum EValueChainTableMode {
  DEVELOPER = 'DEVELOPER',
  ADMIN = 'ADMIN'
}

export interface IFullValueChainTableLocalisation {
  tableLocalisation: IValueChainTableLocalisation
  selectValueChainPopupLocalisation: IPmConfirmPopupLocalisations
}

export const fullValueChainTableLocalisation: IFullValueChainTableLocalisation = {
  tableLocalisation: ValueChainTableLocalisation,
  selectValueChainPopupLocalisation: pmConfirmPopupLocalisations
}
