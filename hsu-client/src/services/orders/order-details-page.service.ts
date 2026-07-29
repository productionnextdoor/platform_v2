import { Injectable } from '@angular/core';
import {
  CustomerInfoDto,
  OrderedProductDto
} from '../../shared/service-proxies/service-proxies';
import {
  defaultBreadcrumbs,
  IBreadCrumbLink,
  IBreadcrumbs,
  ICardProperty,
  ICardSectionData,
  IProductionProcessCardLocalisations
} from 'hsu-library';
import { AppLocalizationService } from '../localization/app-localization.service';
import {
  ICustomerInfoCard,
  IOrderDetailsPageService,
  IProductInfoCard
} from './iorder-details-page.service';
import { IProductDetailsService } from '../products/product-details/iproduct-details.service';
import { IOrderDetailsAdminLocalisation } from '../../app/order-details/order-details-admin/order-details-admin.shared';
import {
  IProducerOrderDetailsLocalisations
} from '../../app/order-details/order-details-producer/order-details-producer.shared';
import { INavigationService } from '../navigation/inavigation.service';
import { Path } from '../../app/app-routing.module';
import { IPermissionManagerService } from '../permissions/ipermission-manager.service';
import { PERMISSIONS } from '../permissions/permissions';

@Injectable()
export class OrderDetailsPageService extends IOrderDetailsPageService {

  constructor(
    private readonly localizationService: AppLocalizationService,
    private readonly productDetailsService: IProductDetailsService,
    private readonly navigationService: INavigationService,
    private readonly permissionManagerService: IPermissionManagerService
  ) {
    super();
  }

  getBreadcrumbs(productName: string): IBreadcrumbs {
    if (!productName) {
      return defaultBreadcrumbs;
    }
    const breadcrumbLink: IBreadCrumbLink | null = this.navigationService.generateBreadcrumbLink(Path.ORDERS);
    if (!breadcrumbLink) {
      return defaultBreadcrumbs;
    }
    return {
      breadcrumbLinks: [breadcrumbLink],
      lastBreadcrumb: productName,
    }
  }

  public mapProductInfoData(orderedProduct: OrderedProductDto): IProductInfoCard {
    return {
      productInfoCardTitle: this.localizationService.loc('OrderDetails.ProductInfoCard.Title'),
      productInfoCardData: {
        productDetails: this.mapProductDetails(orderedProduct),
        payouts: this.mapPayouts(orderedProduct),
        documents: this.mapDocuments(orderedProduct),
      },
    }
  }

  public mapCustomerInfoData(customerInfo: CustomerInfoDto): ICustomerInfoCard {
    return {
      customerInfoCardTitle: this.localizationService.loc('OrderDetails.CustomerInfoCard.Title'),
      customerInfoCardData: {
        firstRow: [
          this.createRowData('OrderDetails.CustomerInfoCard.Name', customerInfo.name),
          this.createRowData('OrderDetails.CustomerInfoCard.PhoneNumber', customerInfo.phoneNumber)
        ],
        secondRow: [
          this.createRowData('OrderDetails.CustomerInfoCard.EmailAddress', customerInfo.emailAddress),
          this.createRowData('OrderDetails.CustomerInfoCard.Street', customerInfo.street)
        ],
        thirdRow: [
          this.createRowData('OrderDetails.CustomerInfoCard.Zip', customerInfo.zip),
          this.createRowData('OrderDetails.CustomerInfoCard.City', customerInfo.city)
        ]
      }
    }
  }

  public getLocalisationsAdmin(): IOrderDetailsAdminLocalisation {
    return {
      cancelButtonLabel: this.localizationService.loc('OrderDetails.CancelButtonLabel'),
      valueChainCardLocalisation: {
        requestValueChain: this.localizationService.loc('OrderDetails.ValueChainCard.RequestValueChain'),
        description: this.localizationService.loc('OrderDetails.ValueChainCard.Description'),
        requestDate: this.localizationService.loc('OrderDetails.ValueChainCard.RequestDate'),
        status: {
          commissioned: this.localizationService.loc('OrderDetails.ValueChainCard.Status.Commissioned'),
          rejected: this.localizationService.loc('OrderDetails.ValueChainCard.Status.Rejected'),
          inProgress: this.localizationService.loc('OrderDetails.ValueChainCard.Status.InProgress'),
          completed: this.localizationService.loc('OrderDetails.ValueChainCard.Status.Completed'),
          canceled: this.localizationService.loc('OrderDetails.ValueChainCard.Status.Canceled'),
        }
      },
      cancelPopupLocalisations: {
        title: this.localizationService.loc('OrderManagement.CancelOrder.PopupTitle'),
        description: this.localizationService.loc('OrderManagement.CancelOrder.PopupDescription'),
        confirm: this.localizationService.loc('ConfirmPopup.Default.Confirm'),
        cancel: this.localizationService.loc('ConfirmPopup.Default.Cancel'),
      }
    }
  }

  public getLocalisationsProducer(): IProducerOrderDetailsLocalisations {
    return {
      sidebarLocalisations: this.productDetailsService.getProducerLocalisationStrings().sidebar,
      orderRequestCardLocalisations: {
        context: this.localizationService.loc('OrderDetails.ProducerRequestCard.Title') + ':',
        description: this.localizationService.loc('OrderDetails.ProducerRequestCard.Description'),
        acceptBtnLabel: this.localizationService.loc('OrderDetails.ProducerRequestCard.Btn.Accept'),
        rejectBtnLabel: this.localizationService.loc('OrderDetails.ProducerRequestCard.Btn.Reject'),
        confirmPopup: {
          title: this.localizationService.loc('OrderDetails.ProducerRequestCard.ConfirmPopup.Title'),
          description: this.localizationService.loc('OrderDetails.ProducerRequestCard.ConfirmPopup.Description'),
          confirm: this.localizationService.loc('OrderDetails.ProducerRequestCard.ConfirmPopup.Confirm'),
          cancel: this.localizationService.loc('OrderDetails.ProducerRequestCard.ConfirmPopup.Cancel'),
        },
      },
      productionProcessCardLocalisations: this.getProductionProcessCardLocalisations(),
      uploadFieldLocalisations: {
        uploadText: this.localizationService.loc('OrderDetails.ProductionProcessCard.UploadField.UploadText'),
        uploadTextLabel: this.localizationService.loc('OrderDetails.ProductionProcessCard.UploadField.UploadTextLabel'),
        fileTag: this.localizationService.loc('OrderDetails.ProductionProcessCard.UploadField.FileTag'),
      }
    };
  }

  private getProductionProcessCardLocalisations(): IProductionProcessCardLocalisations {
    return {
      title: this.localizationService.loc('OrderDetails.ProductionProcessCard.Title'),
      startButton: this.localizationService.loc('OrderDetails.ProductionProcessCard.StartButton'),
      finishButton: this.localizationService.loc('OrderDetails.ProductionProcessCard.FinishButton'),
      completeOrderButton: this.localizationService.loc('OrderDetails.ProductionProcessCard.CompleteOrderButton'),
      description: this.localizationService.loc('OrderDetails.ProductionProcessCard.Description'),
      confirmPopupStart: {
        title: this.localizationService.loc('OrderDetails.ProductionProcessCard.ConfirmPopupStart.Title'),
        description: this.localizationService.loc('OrderDetails.ProductionProcessCard.ConfirmPopupStart.Description'),
        confirm: this.localizationService.loc('OrderDetails.ProductionProcessCard.ConfirmPopup.Confirm'),
        cancel: this.localizationService.loc('OrderDetails.ProductionProcessCard.ConfirmPopup.Cancel'),
      },
      confirmPopupFinish: {
        title: this.localizationService.loc('OrderDetails.ProductionProcessCard.ConfirmPopupFinish.Title'),
        description: this.localizationService.loc('OrderDetails.ProductionProcessCard.ConfirmPopupFinish.Description'),
        confirm: this.localizationService.loc('OrderDetails.ProductionProcessCard.ConfirmPopup.Confirm'),
        cancel: this.localizationService.loc('OrderDetails.ProductionProcessCard.ConfirmPopup.Cancel'),
      },
      completeOrderPopup: {
        title: this.localizationService.loc('OrderDetails.ProductionProcessCard.CompleteOrderPopup.Title'),
        description: this.localizationService.loc('OrderDetails.ProductionProcessCard.CompleteOrderPopup.Description'),
        confirm: this.localizationService.loc('OrderDetails.ProductionProcessCard.ConfirmPopup.Confirm'),
        cancel: this.localizationService.loc('OrderDetails.ProductionProcessCard.ConfirmPopup.Cancel'),
      }
    };
  }

  private mapProductDetails(orderedProduct: OrderedProductDto): ICardSectionData {
    const productInfo: ICardSectionData = {
      title: this.localizationService.loc('OrderDetails.ProductInfoCard.ProductInfo.Title'),
      properties: [
        this.createRowData('OrderDetails.ProductInfoCard.ProductInfo.OrderNumber', orderedProduct.orderNumber),
        this.createRowData('OrderDetails.ProductInfoCard.ProductInfo.Measurements',
          `${orderedProduct.measurement.height} cm, ${orderedProduct.measurement.width} cm, ${orderedProduct.measurement.depth} cm`),
      ]
    };

    if (orderedProduct.materials) {
      productInfo.properties.push(...orderedProduct.materials.map(item => ({
        key: this.localizationService.loc('OrderDetails.ProductInfoCard.ProductInfo.Material') + '(' +
          this.localizationService.loc(`MaterialGroup.${item.materialGroupName}`) + ')',
        value: item.materialName ?? ''
      })));
    }

    productInfo.properties.push({
      key: this.localizationService.loc('OrderDetails.ProductInfoCard.ProductInfo.NettoPrice'),
      value: (orderedProduct.productionCost + orderedProduct.developerShare + orderedProduct.platformShare).toFixed(2)
    });

    return productInfo;
  }

  private mapPayouts(orderedProduct: OrderedProductDto): ICardSectionData {
    const payouts:ICardSectionData = {
      title: this.localizationService.loc('OrderDetails.ProductInfoCard.PayOut.Title'),
      properties: orderedProduct.payouts?.map(item => ({
        key: item.name ?? '',
        value: item.payoutSum.toFixed(2)
      })) ?? []
    };

    if (this.permissionManagerService.isGranted(PERMISSIONS.orderManagement.details.admin)){
      payouts.properties.push(
        ...[
          {
            key: this.localizationService.loc('OrderDetails.ProductInfoCard.PayOut.Developer'),
            value: orderedProduct.developerShare.toFixed(2)
          },
          {
            key: this.localizationService.loc('OrderDetails.ProductInfoCard.PayOut.Platform'),
            value: orderedProduct.platformShare.toFixed(2)
          }
        ]
      )
    }


    return payouts
  }

  private mapDocuments(orderedProduct: OrderedProductDto): ICardSectionData {
    return {
      title: this.localizationService.loc('OrderDetails.ProductInfoCard.Documents.Title'),
      properties: orderedProduct.documents?.map(item => ({
        key: '',
        value: item.fileName ?? ''
      })) ?? []
    };
  }

  private createRowData(key: string, value?: string): ICardProperty {
    return {
      key: this.localizationService.loc(key),
      value: value ?? '',
    };
  }
}
