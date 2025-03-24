import {
  Component, Input, OnInit
} from '@angular/core';
import {ICardProperty} from 'hsu-library'
import { IOrderFileService } from '../../../../services/orders/iorder-file.service';
import { IOrderApiService } from '../../../../services/orders/iorder-api.service';
import { DeliveryDocumentsDto } from '../../../../shared/service-proxies/service-proxies';
import { map } from 'rxjs';
import { IOrderDetailsPageService } from '../../../../services/orders/iorder-details-page.service';
import { AppLocalizationService } from '../../../../services/localization/app-localization.service';

@Component({
  selector: 'delivery-documents-card',
  templateUrl: './delivery-documents-card.component.html'
})
export class DeliveryDocumentsCardComponent implements OnInit {

  @Input()
  productId: number = 0;

  protected title: string = '';
  protected fileList: ICardProperty[] = [];

  constructor(
    private readonly orderFileService: IOrderFileService,
    private readonly orderApiService: IOrderApiService,
    private readonly detailsPageService: IOrderDetailsPageService,
    private readonly localizationService: AppLocalizationService,
  ) {
  }

  ngOnInit(): void {
    this.title = this.localizationService.loc('OrderDetails.ProductInfoCard.Documents.Title')
    this.orderApiService
      .getProductDeliveryDocuments(this.productId)
      .pipe(
        map((documents:DeliveryDocumentsDto[]) => {
          this.fileList =  this.detailsPageService.mapDeliverDocuments(documents)
        })
      ).subscribe()
  }

  protected downloadFiles(): void {
    this.orderFileService.downloadOrderDocumentsByProductId(this.productId).subscribe();
  }
}
