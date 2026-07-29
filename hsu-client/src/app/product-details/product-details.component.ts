import {
  Component,
  Input,
  Input as RouteParam,
  OnInit
} from '@angular/core';
import { WithRx } from '../../shared/mixins/with-rx.mixin';
import { IPermissionManagerService } from '../../services/permissions/ipermission-manager.service';
import { PERMISSIONS } from '../../services/permissions/permissions';
import {
  IFileNameByCategory,
  IPropertyGroup,
  IPropertySection,
  IProductDetailsBaseData
} from 'hsu-library';
import { map } from 'rxjs';
import { ProductFileService } from '../../services/products/product-file.service';
import { IDetailsDisplayService } from '../../services/products/product-details/details-display/idetails-display.service';
import {
  ProductDetailsOverviewDto,
  ProductState
} from '../../shared/service-proxies/service-proxies';
import { AppConsts } from '../../shared/AppConsts';

export enum EDetailsPageType {
  ADMIN = 'admin',
  DEVELOPER = 'developer',
  PRODUCER = 'producer',
}

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
})

export class ProductDetailsComponent extends WithRx() implements OnInit {

  @RouteParam()
  productId!: number;

  @Input()
  productName: string = '';

  protected productDetailsBaseData: IProductDetailsBaseData = {
    productDescription: '',
    lastEditDate: '',
    sharePointLink: '',
  }

  protected productionDetailsLiveId: number = 0;

  protected productionDetailsEditId?: number;

  protected productDataSidebar: IPropertySection[] = [];

  protected fileData: IFileNameByCategory[] = [];

  protected uploadCategories: {[key: string]: string} = {};

  protected previewImagePath: string = '';

  protected previewImagePathFull: string = '';

  protected detailsPageType: EDetailsPageType = EDetailsPageType.ADMIN;

  protected productState: ProductState = ProductState.Draft;

  protected readonly EDetailsPageType: typeof EDetailsPageType = EDetailsPageType;

  //Developer Details Page
  protected generalInformation: IPropertyGroup = {
    groupTitle: '',
    properties: []
  };
  protected productDataDetailCard: IPropertySection[] = [];

  constructor(
    private readonly permissionService: IPermissionManagerService,
    private readonly detailsDisplayService: IDetailsDisplayService,
    private readonly productFilesService: ProductFileService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.setDetailsPageType();
    this.fetchProductDetailsSidebarData();
    this.uploadCategories = this.detailsDisplayService.getUploadCategories();
  }

  downloadAllFiles(){
    this.detailsDisplayService.downloadAllProductFiles(this.productId, `Product-${this.productName}-Files.zip`);
  }

  openLink(): void {
    window.open(this.productDetailsBaseData.sharePointLink);
  }

  getPreviewImage(fileId: number): void {
    this.detailsDisplayService.getImageURL(fileId)
      .subscribe(imageURL => {
        this.previewImagePath = imageURL;
        this.previewImagePathFull = imageURL;
      })
  }

  fetchProductDetailsSidebarData(): void {
    this.detailsDisplayService.getProductDetailsData(this.productId).pipe(
      map(result => {
        this.productName = result.productName ?? '';
        this.productState = result.productState;
        this.productionDetailsLiveId = result.productionDetailsLiveId;
        this.productionDetailsEditId = result.productionDetailsEditId;
        this.productDetailsBaseData = this.processProductDetailsBaseData(result);
        this.generalInformation = this.detailsDisplayService.getGeneralInformationDeveloper(result);
        this.productDataDetailCard = this.detailsDisplayService.mapToDeveloperDetails(result);
        this.productDataSidebar = this.detailsDisplayService.mapFromProductDetailsOverviewDto(result);
        this.getPreviewImage(result.previewImageId ?? 0);
        this.fileData = result.files?.map((file) => this.productFilesService.mapFileDtoToFileNameByCategory(file)) ?? [];
      })
    ).subscribe();
  }

  private processProductDetailsBaseData(result: ProductDetailsOverviewDto): IProductDetailsBaseData {
    return {
      productDescription: result.description ?? '',
      lastEditDate: result.updatedAt.toFormat(AppConsts.DateFormatString) ?? '',
      sharePointLink: result.sharePointLink ?? '',
    };
  }

  private setDetailsPageType(): void {
    if (this.permissionService.isGranted(PERMISSIONS.products.detailsOverview.getAdmin)) {
      this.detailsPageType = EDetailsPageType.ADMIN;
    }

    if (this.permissionService.isGranted(PERMISSIONS.products.detailsOverview.getDeveloper)) {
      this.detailsPageType = EDetailsPageType.DEVELOPER;
    }

    if (this.permissionService.isGranted(PERMISSIONS.products.detailsOverview.getProducers)) {
      this.detailsPageType = EDetailsPageType.PRODUCER;
    }
  }
}
