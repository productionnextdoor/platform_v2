import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { WithRx } from '../../../shared/mixins/with-rx.mixin';
import {
  defaultBreadcrumbs,
  IBreadCrumbLink,
  IBreadcrumbs,
  IFileNameByCategory,
  IProductDetailsBaseData,
  IProductDetailsDeveloperLocalisations,
  IPropertyGroup,
  IPropertySection,
  TConstEnum,
  IDeveloperRevenueCardLocalisations,
  IDeveloperRevenueInfo
} from 'hsu-library';
import { AppLocalizationService } from '../../../services/localization/app-localization.service';
import { Path } from '../../app-routing.module';
import { INavigationService } from '../../../services/navigation/inavigation.service';
import { IDeveloperApiService } from '../../../services/developer/ideveloper-api.service';

@Component({
  selector: 'product-details-developer',
  templateUrl: './product-details-developer.component.html'
})

export class ProductDetailsDeveloperComponent extends WithRx() implements OnInit {

  @Input()
  productId: number = 0;

  @Input()
  productName: string = '';

  @Input()
  productDetailsBaseData: IProductDetailsBaseData = {
    productDescription: '',
    lastEditDate: '',
    sharePointLink: ''
  }

  @Input()
  generalInformation: IPropertyGroup = {
    groupTitle: '',
    properties: []
  };

  @Input()
  productDataDetailCard: IPropertySection[] = [];

  @Input()
  fileData: IFileNameByCategory[] = [];

  @Input()
  uploadCategories: TConstEnum = {};

  @Input()
  previewImagePath: string = '';

  @Input()
  previewImagePathFull: string = '';

  @Output()
  public onDownloadFiles: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public onOpenLink: EventEmitter<void> = new EventEmitter<void>();

  protected localisations: IProductDetailsDeveloperLocalisations;

  protected developerRevenueCardLocalisations: IDeveloperRevenueCardLocalisations;

  protected developerRevenueInfo: IDeveloperRevenueInfo = {
    totalOrders: 0,
    priceRange: '',
    royaltyRate: 0,
    totalRevenue: 0
  };

  constructor(
    localizationService: AppLocalizationService,
    private readonly navigationService: INavigationService,
    private readonly developerApiService: IDeveloperApiService
  ) {
    super();
    this.localisations = {
      mainTitle: localizationService.loc('ProductDetailsDeveloper.Title'),
      productDescriptionTitle: localizationService.loc('ProductDetailsDeveloper.SectionDescription.Title'),
      productFilesTitle: localizationService.loc('ProductDetailsDeveloper.SectionFiles.Title'),
      sharepointLinkLabel: localizationService.loc('ProductDetailsSidebar.SectionFiles.SharePoint.Label'),
    }

    this.developerRevenueCardLocalisations = {
      mainTitle: localizationService.loc('ProductDetailsDeveloper.RevenueInfo.Title'),
      subTitle: localizationService.loc('ProductDetailsDeveloper.RevenueInfo.SubTitle'),
      totalOrders: localizationService.loc('ProductDetailsDeveloper.RevenueInfo.TotalOrders'),
      priceRange: localizationService.loc('ProductDetailsDeveloper.RevenueInfo.PriceRange'),
      royaltyRate: localizationService.loc('ProductDetailsDeveloper.RevenueInfo.RoyaltyRate'),
      totalRevenue: localizationService.loc('ProductDetailsDeveloper.RevenueInfo.TotalRevenue'),
    }
  }

  ngOnInit(): void {
    this.getDeveloperRevenueInfo();
  }

  getBreadcrumbs(): IBreadcrumbs {
    if (!this.productName) {
      return defaultBreadcrumbs;
    }
    const breadcrumbLink: IBreadCrumbLink | null = this.navigationService.generateBreadcrumbLink(Path.PRODUCTS);
    if (!breadcrumbLink) {
      return defaultBreadcrumbs;
    }
    return {
      breadcrumbLinks: [breadcrumbLink],
      lastBreadcrumb: this.productName,
    }
  }

  getDeveloperRevenueInfo(): void {
    this.developerApiService.getDeveloperRevenueInfo(this.productId)
      .subscribe((revenueData: IDeveloperRevenueInfo) => {
        this.developerRevenueInfo = revenueData;
      });
  }
}
