import { Injectable } from '@angular/core';
import {
  CustomerInfoDto,
  OrderedProductDto
} from '../../shared/service-proxies/service-proxies';
import {
  IBreadcrumbs,
  ICustomerInfoData,
  IOrderedProductData
} from 'hsu-library';
import {
  IProducerOrderDetailsLocalisations
} from '../../app/order-details/order-details-producer/order-details-producer.shared';
import { IOrderDetailsAdminLocalisation } from '../../app/order-details/order-details-admin/order-details-admin.shared';

export interface IProductInfoCard {
  productInfoCardTitle: string;
  productInfoCardData: IOrderedProductData
}

export interface ICustomerInfoCard {
  customerInfoCardTitle: string;
  customerInfoCardData: ICustomerInfoData
}

@Injectable()
export abstract class IOrderDetailsPageService {
  abstract getBreadcrumbs(productName:string): IBreadcrumbs
  abstract mapProductInfoData(orderedProduct: OrderedProductDto): IProductInfoCard;
  abstract mapCustomerInfoData(customerInfo: CustomerInfoDto): ICustomerInfoCard;
  abstract getLocalisationsAdmin(): IOrderDetailsAdminLocalisation;
  abstract getLocalisationsProducer():IProducerOrderDetailsLocalisations;
}
