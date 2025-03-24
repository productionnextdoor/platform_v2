import {
  IProducerResponseRequestLocalisation,
  producerResponseRequestLocalisation
} from 'hsu-library';
import {
  IProductDetailsSharedLocalisations,
  productDetailsSharedLocalisations
} from '../product-details.shared';

export interface IProductDetailsProducerLocalisations extends IProductDetailsSharedLocalisations {
  productRequestCard: IProducerResponseRequestLocalisation;
  deadlineBannerText: string;
  completedBannerText: string;
}

export const productDetailsProducerLocalisations: IProductDetailsProducerLocalisations = {
  ...productDetailsSharedLocalisations,
  productRequestCard:producerResponseRequestLocalisation,
  deadlineBannerText: '',
  completedBannerText: '',
}
