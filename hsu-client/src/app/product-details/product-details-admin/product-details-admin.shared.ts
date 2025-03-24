import {
  IProducerTableLocalisation,
  ProducerTableLocalisation,
  IProductDetailsInProgressLocalisations,
  productDetailsInProgressLocalisations,
  IWorkstepTableLocalisations,
  WorkstepTableLocalisations,
  IPmConfirmPopupLocalisations,
  pmConfirmPopupLocalisations,
  IPmMaxCostPopupLocalisations,
  pmMaxCostPopupLocalisations,
  ButtonType
} from 'hsu-library';
import {
  IProductDetailsSharedLocalisations,
  productDetailsSharedLocalisations
} from '../product-details.shared';
import {
  fullValueChainTableLocalisation,
  IFullValueChainTableLocalisation
} from '../../value-chain-planning/value-chain-table/value-chain-table.shared';



export interface IProductDetailsAdminLocalisations extends IProductDetailsSharedLocalisations{
  producerTable: IProducerTableLocalisation;
  productDetailsInProgress: IProductDetailsInProgressLocalisations;
  workstepTable: IWorkstepTableLocalisations;
  valueChainsTabe:IFullValueChainTableLocalisation;
  confirmExportPopup: IPmConfirmPopupLocalisations;
  confirmEditModePopup: IPmConfirmPopupLocalisations;
  cancelEditModePopup: IPmConfirmPopupLocalisations;
  publishEditModePopup: IPmConfirmPopupLocalisations;
  maxCostPopup: IPmMaxCostPopupLocalisations;
  publishProduct: string,
  makeChanges: string,

}

export interface IActionButton {
  buttonIsDisabled: boolean,
  buttonLabel: string,
  buttonType: ButtonType
}

export const ProductDetailsAdminLocalisations: IProductDetailsAdminLocalisations = {
  ...productDetailsSharedLocalisations,
  producerTable: ProducerTableLocalisation,
  productDetailsInProgress: productDetailsInProgressLocalisations,
  workstepTable: WorkstepTableLocalisations,
  valueChainsTabe: fullValueChainTableLocalisation,
  confirmExportPopup: pmConfirmPopupLocalisations,
  confirmEditModePopup: pmConfirmPopupLocalisations,
  cancelEditModePopup: pmConfirmPopupLocalisations,
  publishEditModePopup: pmConfirmPopupLocalisations,
  maxCostPopup: pmMaxCostPopupLocalisations,
  publishProduct: '',
  makeChanges:'',
}
