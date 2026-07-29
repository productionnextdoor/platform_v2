import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { WithRx } from '../../../shared/mixins/with-rx.mixin';
import {
  defaultBreadcrumbs,
  IBreadcrumbs,
  IProducerOrderAction,
  IColumnHeader,
  Row,
  IUploadFiles,
  IDeliveryDocument
} from 'hsu-library';
import {
  forkJoin,
  map,
  Observable,
} from 'rxjs';

import {
  commissionedOrderStatuses,
  IProducerOrderActionData,
  IProducerOrderDetailsLocalisations,
  producerOrderDetailsLocalisations
} from './order-details-producer.shared';
import {
  ActionStatus,
  OrderValueChainActionProducerDto,
} from '../../../shared/service-proxies/service-proxies';
import { IOrderApiService } from '../../../services/orders/iorder-api.service';
import {
  IOrderValueChainTableService
} from '../../../services/orders/order-value-chain-table/iorder-value-chain-table.service';
import { AuthService } from '../../../services/account/auth.service';
import {
  ICustomerInfoCard,
  IOrderDetailsPageService,
  IProductInfoCard
} from '../../../services/orders/iorder-details-page.service';
import { switchMap } from 'rxjs/operators';
import { IOrderFileService } from '../../../services/orders/iorder-file.service';
import { FileItem, FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'order-details-producer',
  templateUrl: './order-details-producer.component.html'
})
export class OrderDetailsProducerComponent extends WithRx() implements OnInit {

  @Input()
  public orderId: number = 0;

  protected currentUserId: number = 0;
  protected orderStatus: ActionStatus = ActionStatus.Cancelled;
  protected breadcrumbs: IBreadcrumbs = defaultBreadcrumbs;
  protected sidebarCollapsed: boolean = false;

  //Order Request card
  protected loading: boolean = false;
  protected orderRequestData: IProducerOrderActionData[] = [];
  protected localisations: IProducerOrderDetailsLocalisations = producerOrderDetailsLocalisations;

  //Production info
  protected valueChainActions: OrderValueChainActionProducerDto[] = [];
  protected selectedValueChainAction?: OrderValueChainActionProducerDto;
  protected columnHeaders: IColumnHeader[] = [];
  protected rowData: Row[] = [];
  protected deliveryDocuments: IDeliveryDocument[] = [];
  protected productInfoCard?: IProductInfoCard;
  protected customerInfoCard?: ICustomerInfoCard;
  protected startAction: boolean = false;
  protected finishAction: boolean = false;
  protected commissionedOrderStatuses: ActionStatus[] = commissionedOrderStatuses;
  protected uploader: FileUploader;
  protected hideDocuments: boolean = true;

  constructor(
    private readonly orderApiService: IOrderApiService,
    private readonly valueChainTableService: IOrderValueChainTableService,
    private readonly detailsPageService: IOrderDetailsPageService,
    private readonly authService: AuthService,
    private readonly orderFileService: IOrderFileService,
  ) {
    super();
    this.uploader = this.orderFileService.getFileUploader();
  }

  ngOnInit(): void {
    this.currentUserId = this.authService.getCurrentUserId();
    this.localisations = this.detailsPageService.getLocalisationsProducer();
    this.columnHeaders = this.valueChainTableService.getColumnHeadersProducer()
    this.setPageData().subscribe();
    this.uploader.onCompleteAll = () => {
      this.onChangeAction(false);
      this.getOrderData().subscribe();
    };
  }

  onActionSelected(actionIds: number[]) {
    if (actionIds.length === 0) {
      this.startAction = false;
      this.finishAction = false;
    }

    this.selectedValueChainAction = this.valueChainActions
      .find(action => action.orderValueChainActionId === actionIds[0]);

    this.startAction = this.selectedValueChainAction?.status === ActionStatus.Commissioned;
    this.finishAction = this.selectedValueChainAction?.status === ActionStatus.InProgress;
  }

  onChangeAction(start: boolean) {
    if (this.selectedValueChainAction) {
      this.startAction = false;
      this.finishAction = false;
      this.orderApiService
        .startFinishValueChainAction(this.selectedValueChainAction?.orderValueChainActionId, start)
        .pipe(
          this.switchMapCancelable(this.getCommissionedValueChainData.bind(this))
        )
        .subscribe();
    }
  }

  protected onFileDrop(filesDropped: File[]) {
    if (this.uploader.isUploading) {
      return;
    }

    this.uploader.addToQueue(filesDropped);
    this.deliveryDocuments = this.uploader.queue.map((item, index) => {
      return {
        index: index,
        name: item.file.name ?? ''
      }
    })
  }

  protected onFilesSelected(fileUpload: IUploadFiles) {
    if (this.uploader.isUploading) {
      return;
    }
    this.uploader.addToQueue(fileUpload.files);
    this.deliveryDocuments = this.uploader.queue.map((item, index) => {
      return {
        index: index,
        name: item.file.name ?? ''
      }
    })
  }

  protected onFileDelete(fileIndex: number) {
    this.uploader.removeFromQueue(this.uploader.queue[fileIndex])
    this.deliveryDocuments = this.uploader.queue.map((item, index) => {
      return {
        index: index,
        name: item.file.name ?? ''
      }
    })
  }

  protected onCancel() {
    if (this.uploader.queue.length > 0) {
      this.uploader.clearQueue()
      this.deliveryDocuments = []
    }
  }

  protected onActionFinish() {
    if (!this.selectedValueChainAction?.isFinal) {
      this.onChangeAction(false);
    }

    if (this.uploader.queue.length === 0) {
      return;
    }

    this.startUpload()
  }

  protected downloadDeliveryDocuments() {
    this.orderFileService.downloadOrderDocuments(this.orderId).subscribe();
  }

  protected onProducerRequestResponse(orderAction: IProducerOrderAction) {
    this.loading = true;
    this.orderApiService
      .acceptOrRejectActionRequest(this.orderId, orderAction.stepId, orderAction.accepted)
      .pipe(
        switchMap(() => {
          return this.setPageData();
        })
      )
      .subscribe(() => {
        this.loading = false;
      });
  }

  protected setBreadCrumbs(productName:string ) {
    this.breadcrumbs =  this.detailsPageService.getBreadcrumbs(productName);
  }

  private setPageData(): Observable<void> {
    return this.orderApiService.getProducerOrderStatus(this.orderId)
      .pipe(
        switchMap(actionStatus => {
          this.orderStatus = actionStatus;

          if (!commissionedOrderStatuses.includes(this.orderStatus)) {
            return this.getOrderActionsData();
          } else {
            return forkJoin([
              this.getOrderData(),
              this.getCommissionedValueChainData()
            ]).pipe(map(() => void 0));
          }
        })
      );
  }

  private getOrderActionsData(): Observable<void> {
    return this.orderApiService.getOrderActionsData(this.orderId)
      .pipe(
        map(orderActionData => {
          this.orderRequestData = orderActionData;
        })
      );
  }

  private getOrderData(): Observable<void> {
    return this.orderApiService.getProducerOrderDetails(this.orderId)
      .pipe(
        map(orderDetailData => {
          this.productInfoCard = this.detailsPageService.mapProductInfoData(orderDetailData.orderedProduct);
          this.customerInfoCard = this.detailsPageService.mapCustomerInfoData(orderDetailData.customerInfo);
        })
      );
  }

  private getCommissionedValueChainData(): Observable<void> {
    return this.orderApiService.getOrderCommissionedValueChainProducer(this.orderId)
      .pipe(
        map(orderValueChain => {
          this.valueChainActions = orderValueChain.valueChainActions ?? [];
          this.rowData = this.valueChainActions.map(item =>
            this.valueChainTableService.getTableRowProducer(item, this.currentUserId));
          this.hideDocuments = !this.valueChainActions
            .some(item => item.isFinal && item.producerId === this.currentUserId);
        })
      );
  }

  private startUpload() {
    this.uploader.onBuildItemForm = (fileItem: FileItem, form: FormData) => {
      form.append('ShopOrderId', this.orderId.toString());
    };
    this.startAction = false;
    this.finishAction = false;
    this.uploader.uploadAll();
  }

}
