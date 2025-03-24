import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { WithRx } from '../../../shared/mixins/with-rx.mixin';
import { ProducerAssignmentStatus } from '../../../shared/service-proxies/service-proxies';
import { IProductApiService } from '../../../services/products/iproduct-api.service';
import { INavigationService } from '../../../services/navigation/inavigation.service';
import { Path } from '../../app-routing.module';
import { IProductDetailsService } from '../../../services/products/product-details/iproduct-details.service';
import {
  defaultBreadcrumbs,
  DefaultMargins,
  IBreadCrumbLink,
  IBreadcrumbs,
  IComponentMargin,
  IFileNameByCategory,
  IProductDetailsBaseData,
  IPropertySection,
  EProductGraphMode,
  PmComponentMargin,
  TConstEnum,
  ITab
} from 'hsu-library';
import {
  IProductDetailsProducerLocalisations,
  productDetailsProducerLocalisations
} from './product-details-producer.shared';
import { DateTime } from 'luxon';
import { AppConsts } from '../../../shared/AppConsts';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IUiService } from '../../../services/utils/iui.service';

@Component({
  selector: 'product-details-producer',
  templateUrl: './product-details-producer.component.html'
})
export class ProductDetailsProducerComponent extends WithRx() implements OnInit, OnChanges {

  @Input()
  productName: string = '';

  @Input()
  productionDetailsLiveId: number = 0;

  @Input()
  productionDetailsEditId?: number;

  @Input()
  productDetailsBaseData: IProductDetailsBaseData = {
    productDescription: '',
    lastEditDate: '',
    sharePointLink: ''
  }

  @Input()
  sidebarCollapsed: boolean = false;

  @Input()
  productDataSidebar: IPropertySection[] = [];

  @Input()
  fileData: IFileNameByCategory[] = [];

  @Input()
  uploadCategories: TConstEnum = {};

  @Input()
  previewImagePath: string = '';

  @Input()
  previewImagePathFull: string = '';

  @Output()
  onDownloadFiles: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public onOpenLink: EventEmitter<void> = new EventEmitter<void>();

  protected currentProductionDetailsId: number = 0;
  protected tabCardTabs: ITab<number>[] = [];
  protected assignmentStatus?: ProducerAssignmentStatus;
  protected deadLine?: DateTime

  protected showDeadlineBanner: boolean = false;
  protected deadlineBannerText: string = '';

  protected localisations: IProductDetailsProducerLocalisations = productDetailsProducerLocalisations;
  protected startStateId: number = 0;
  protected endStateId: number = 0;
  protected stepId: number = 0;

  protected deadlineBannerMargin: IComponentMargin = new PmComponentMargin(0, 0, DefaultMargins.Large, 0);
  protected readonly ProducerAssignmentStatus = ProducerAssignmentStatus;

  //loading
  protected graphLoading$: Subject<boolean> = new Subject<boolean>();
  protected assignmentStatusLoading$: Subject<boolean> = new Subject<boolean>();

  private destroy$ = new Subject<void>();

  constructor(
    private readonly productApiService: IProductApiService,
    private readonly navigationService: INavigationService,
    private readonly productDetailsService: IProductDetailsService,
    private readonly uiService: IUiService
  ) {
    super();
  }

  ngOnInit(): void {
    this.localisations = this.productDetailsService.getProducerLocalisationStrings();
    this.initLoading();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['productionDetailsEditId'] || changes['productionDetailsLiveId']) {
      if (this.productionDetailsEditId !== undefined && this.productionDetailsEditId > 0) {
        this.currentProductionDetailsId = this.productionDetailsEditId;
        this.tabCardTabs = this.productDetailsService.getTabCardTabs(this.productionDetailsLiveId, this.productionDetailsEditId, this.productionDetailsEditId);
        this.getAssignmentStatus()
        return
      }
      this.currentProductionDetailsId = this.productionDetailsLiveId;
      this.getAssignmentStatus();
    }
  }

  openSidebar(): void {
    this.sidebarCollapsed = false;
  }

  onRequestAnswer(assignmentAccepted: boolean) {
    this.productApiService.acceptOrRejectProductionRequest(this.currentProductionDetailsId, assignmentAccepted).subscribe({
      next: (result) => {
        this.assignmentStatus = result
        if (result === ProducerAssignmentStatus.Rejected) {
          this.navigationService.navigate(Path.PRODUCTS)
        }
      }
    });
  }

  getAssignmentStatus() {
    if (this.currentProductionDetailsId === 0) {
      return;
    }
    this.assignmentStatusLoading$.next(true);
    this.productApiService
      .getAssignmentStatusForCurrentProducer(this.currentProductionDetailsId)
      .subscribe({
        next: (result) => {
          this.assignmentStatus = result.assignmentStatus
          this.deadLine = result.deadline
          this.handleDeadlineBanner();
          this.assignmentStatusLoading$.next(false)
        }
      });
  }

  closeDeadlineBanner() {
    this.showDeadlineBanner = false;
  }

  handleDeadlineBanner() {
    if (!this.deadLine) {
      return
    }

    this.showDeadlineBanner = true;
    const formattedDeadline: string = this.deadLine.toFormat(AppConsts.DateFormatString) ?? '-';
    this.deadlineBannerText = this.isActiveDeadline()
      ? this.localisations.deadlineBannerText.replace('{0}', formattedDeadline)
      : this.localisations.completedBannerText;
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

  isActiveDeadline(): boolean {
    return !!this.deadLine && this.deadLine > DateTime.now();
  }

  getGraphMode() {
    return this.assignmentStatus === ProducerAssignmentStatus.Accepted &&
    this.isActiveDeadline() ? EProductGraphMode.EDIT : EProductGraphMode.VIEW;
  }

  protected editModeTabChange(tabValue: number) {
    this.currentProductionDetailsId = tabValue;
    this.getAssignmentStatus();
  }

  private initLoading() {

    const loading: Subject<boolean>[] = [
      this.assignmentStatusLoading$,
      this.graphLoading$
    ];

    combineLatest(loading)
      .pipe(takeUntil(this.destroy$))
      .subscribe(([graphLoading, valueChainTableLoading, workStepTableLoading, productProducerTableLoading]) => {
        const isLoading: boolean = graphLoading || valueChainTableLoading || workStepTableLoading || productProducerTableLoading;
        if (isLoading) {
          this.uiService.showBusyIndicator();
        } else {
          this.uiService.hideBusyIndicator();
        }
      });
  }
}
