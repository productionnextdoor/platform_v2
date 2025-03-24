import {
  Component,
  EventEmitter,
  Input, OnInit,
  Output
} from '@angular/core';
import { WithRx } from '../../../shared/mixins/with-rx.mixin';
import {
  defaultBreadcrumbs,
  IBreadCrumbLink,
  IBreadcrumbs,
  IFileNameByCategory,
  IProductDetailsBaseData,
  IPropertyGroup,
  IPropertySection,
  PmDropdownOption,
  TConstEnum,
} from 'hsu-library';
import { Path } from '../../app-routing.module';
import { INavigationService } from '../../../services/navigation/inavigation.service';
import { AppConsts } from '../../../shared/AppConsts';
import { ProductState } from '../../../shared/service-proxies/service-proxies';
import { IProductDetailsService } from '../../../services/products/product-details/iproduct-details.service';
import {
  IProductDetailsPageDeveloperLocalisations,
  productDetailsPageDeveloperLocalisations
} from './product-details-developer.shared';
import { EValueChainTableMode } from 'src/app/value-chain-planning/value-chain-table/value-chain-table.shared';

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
  productState: ProductState = ProductState.Draft;

  @Input()
  productionDetails: number = 0;

  @Input()
  productDetailsBaseData: IProductDetailsBaseData = {
    productDescription: '',
    lastEditDate: '',
    sharePointLink: ''
  }

  @Input()
  offerInformation: IPropertyGroup = {
    groupTitle: '',
    properties: []
  };

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

  protected localisations: IProductDetailsPageDeveloperLocalisations = productDetailsPageDeveloperLocalisations;

  protected itemsPerPageOptions: PmDropdownOption<string>[] = [];

  protected readonly AppConsts: typeof AppConsts = AppConsts;
  protected readonly ProductState: typeof ProductState = ProductState;
  protected readonly EValueChainTableMode: typeof EValueChainTableMode = EValueChainTableMode;

  constructor(
    private readonly navigationService: INavigationService,
    private readonly productDetailsService: IProductDetailsService
  ) {
    super();
    this.localisations = productDetailsService.getDeveloperLocalisationStrings();

  }

  ngOnInit(): void {
    this.itemsPerPageOptions = this.productDetailsService.getPaginationOptions();
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

}
