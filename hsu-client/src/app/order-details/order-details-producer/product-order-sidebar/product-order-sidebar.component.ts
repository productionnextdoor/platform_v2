import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  IDetailsDisplayService
} from '../../../../services/products/product-details/details-display/idetails-display.service';
import { ProductFileService } from '../../../../services/products/product-file.service';
import {
  IFileNameByCategory,
  IProductDetailsSidebarLocalisations,
  IPropertySection,
  productDetailsSidebarLocalisations,
  TConstEnum
} from 'hsu-library';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'product-order-sidebar',
  templateUrl: './product-order-sidebar.component.html'
})
export class ProductOrderSidebarComponent implements OnInit {

  @Input()
  orderId: number = 0;

  @Input()
  localisations: IProductDetailsSidebarLocalisations = productDetailsSidebarLocalisations;

  @Input()
  sidebarCollapsed: boolean = false;

  @Output()
  sidebarCollapsedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  productNameChanged:EventEmitter<string> = new EventEmitter<string>();

  protected productId: number = 0;
  protected productName: string = '';
  protected sharePointLink: string = ''
  protected productDataSidebar: IPropertySection[] = [];
  protected fileData: IFileNameByCategory[] = [];
  protected uploadCategories: TConstEnum = {};
  protected previewImagePath: string = '';
  protected previewImagePathFull: string = '';

  constructor(
    private readonly detailsDisplayService: IDetailsDisplayService,
    private readonly productFilesService: ProductFileService,
  ) {
  }

  ngOnInit(): void {
    this.fetchProductDetailsSidebarData().subscribe();
    this.uploadCategories = this.detailsDisplayService.getUploadCategories();
  }

  protected downloadAllFiles() {
    this.detailsDisplayService.downloadAllProductFiles(this.productId, `Product-${this.productName}-Files.zip`);
  }

  protected openLink(): void {
    window.open(this.sharePointLink);
  }

  private fetchProductDetailsSidebarData(): Observable<void> {
    return this.detailsDisplayService.getProductDetailsDataByOrderId(this.orderId).pipe(
      map(result => {
        this.productId = result.productId;
        this.productName = result.productName ?? '';
        this.sharePointLink = result.sharePointLink ?? ''
        this.productDataSidebar = this.detailsDisplayService.mapFromProductDetailsOverviewDto(result);
        this.getPreviewImage(result.previewImageId ?? 0);
        this.fileData = result.files?.map((file) => this.productFilesService.mapFileDtoToFileNameByCategory(file)) ?? [];
        this.productNameChanged.emit(this.productName);
      })
    );
  }

  private getPreviewImage(fileId: number): void {
    this.detailsDisplayService.getImageURL(fileId)
      .subscribe(imageURL => {
        this.previewImagePath = imageURL;
        this.previewImagePathFull = imageURL;
      })
  }
}
