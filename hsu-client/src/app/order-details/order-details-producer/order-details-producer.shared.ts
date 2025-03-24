import {
  IOrderProdRequestLocalisations,
  IProductDetailsSidebarLocalisations,
  productDetailsSidebarLocalisations,
  orderProdRequestLocalisations,
  IOrderProdRequestData,
  IProductionProcessCardLocalisations,
  productionProcessCardLocalisations
} from 'hsu-library';
import { ActionStatus } from '../../../shared/service-proxies/service-proxies';

export interface IUploadFieldLocalisations {
  uploadText: string;
  uploadTextLabel: string;
  fileTag: string;
}


export interface IProducerOrderDetailsLocalisations {
  sidebarLocalisations: IProductDetailsSidebarLocalisations,
  orderRequestCardLocalisations: IOrderProdRequestLocalisations
  productionProcessCardLocalisations: IProductionProcessCardLocalisations;
  uploadFieldLocalisations: IUploadFieldLocalisations;
}

export const producerOrderDetailsLocalisations: IProducerOrderDetailsLocalisations = {
  sidebarLocalisations: productDetailsSidebarLocalisations,
  orderRequestCardLocalisations: orderProdRequestLocalisations,
  productionProcessCardLocalisations: productionProcessCardLocalisations,
  uploadFieldLocalisations: {
    uploadText: '',
    uploadTextLabel: '',
    fileTag: ''
  }
}

export interface IProducerOrderActionData {
  stepId: number;
  responseNeeded: boolean;
  badgeText: string;
  badgeNegative: boolean;
  actionData: IOrderProdRequestData;
}

export const commissionedOrderStatuses: ActionStatus[] = [
  ActionStatus.Commissioned,
  ActionStatus.InProgress,
  ActionStatus.Completed
];
