import {
  IProductDetailsDeveloperLocalisations,
    productDetailsDeveloperLocalisations,
} from 'hsu-library';
import {
  fullValueChainTableLocalisation,
  IFullValueChainTableLocalisation
} from '../../value-chain-planning/value-chain-table/value-chain-table.shared';

export interface IProductDetailsPageDeveloperLocalisations {
  infoCardLocalisations: IProductDetailsDeveloperLocalisations;
  valueChainLocalisations: IFullValueChainTableLocalisation;
}

export const productDetailsPageDeveloperLocalisations: IProductDetailsPageDeveloperLocalisations = {
  infoCardLocalisations: productDetailsDeveloperLocalisations,
  valueChainLocalisations: fullValueChainTableLocalisation
}
