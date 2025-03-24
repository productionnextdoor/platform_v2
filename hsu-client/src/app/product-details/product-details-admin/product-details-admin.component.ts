import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  ButtonType,
  defaultBreadcrumbs,
  DefaultMargins,
  EProductGraphMode,
  IBreadCrumbLink,
  IBreadcrumbs,
  IFileNameByCategory,
  IProductDetailsBaseData,
  IPropertySection,
  ITab,
  ITabButton,
  PmComponentMargin,
  PmDropdownOption,
  TConstEnum
} from 'hsu-library';
import {
  ProductionPlanningFinalizingServiceProxy,
  ProductPlanInputDto,
  ProductState,
  ValueChainPlannerServiceProxy
} from '../../../shared/service-proxies/service-proxies';
import { IProductDetailsService } from '../../../services/products/product-details/iproduct-details.service';
import {
  IActionButton,
  IProductDetailsAdminLocalisations,
  ProductDetailsAdminLocalisations
} from './product-details-admin.shared';
import { INavigationService } from '../../../services/navigation/inavigation.service';
import { Path } from '../../app-routing.module';
import { DateTime } from 'luxon';
import { AppConsts } from '../../../shared/AppConsts';
import { IProductApiService } from '../../../services/products/iproduct-api.service';
import { IUiService } from '../../../services/utils/iui.service';
import {
  combineLatest,
  finalize,
  Observable,
  startWith,
  Subject
} from 'rxjs';
import {
  EditModeButtonType,
  EditModeButtonTypeValues,
} from '../product-details.shared';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'product-details-admin',
  templateUrl: './product-details-admin.component.html'
})
export class ProductDetailsAdminComponent implements OnInit, OnChanges {

  @Input()
  productId: number = 0;

  @Input()
  productName: string = '';

  @Input()
  productionDetailsLiveId: number = 0;

  @Input()
  productionDetailsEditId?: number;

  @Input()
  sidebarCollapsed: boolean = false;

  @Input()
  productDataSidebar: IPropertySection[] = [];

  @Input()
  productDetailsBaseData: IProductDetailsBaseData = {
    productDescription: '',
    lastEditDate: '',
    sharePointLink: ''
  }

  @Input()
  fileData: IFileNameByCategory[] = [];

  @Input()
  uploadCategories: TConstEnum = {};

  @Input()
  previewImagePath: string = '';

  @Input()
  previewImagePathFull: string = '';

  @Input()
  productState: ProductState = ProductState.Draft;

  @Output()
  public onDownloadFiles: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public onOpenLink: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public onCloseProductWizard: EventEmitter<void> = new EventEmitter<void>();

  protected localisations: IProductDetailsAdminLocalisations = ProductDetailsAdminLocalisations;
  protected itemsPerPageOptions: PmDropdownOption<string>[] = [];
  protected readyForCalculating: boolean = false;
  protected totalWorkSteps: number = 0;
  protected producerEditDisabled: boolean = true;
  protected valueChainEditDisable: boolean = true;
  protected deadlineDate: string = '';
  protected graphMode: EProductGraphMode = EProductGraphMode.ADMIN;
  protected currentProductionDetailsId: number = 0;

  protected showProductEditWizard: boolean = false;
  protected showExportConfirmPopup: boolean = false;
  protected showMaxCostPopup: boolean = false
  protected showEditModeConfirmPopup: boolean = false;
  protected showEditModeCancelPopup: boolean = false;
  protected showEditModePublishPopup: boolean = false;
  protected topActionButton: IActionButton = {
    buttonIsDisabled: true,
    buttonLabel: '',
    buttonType: ButtonType.PRIMARY
  };

  protected tabCartTabs: ITab<number>[] = [];
  protected tabCartButtons: ITabButton[] = [];

  //Loading
  protected graphLoading$ = new Subject<boolean>();
  protected valueChainTableLoading$ = new Subject<boolean>();
  protected workStepTableLoading$ = new Subject<boolean>();
  protected productProducerTableLoading$ = new Subject<boolean>();

  protected readonly buttonMargin: PmComponentMargin = new PmComponentMargin(0, DefaultMargins.XSmall, 0, 0);

  protected readonly ProductState = ProductState;
  protected readonly ButtonType = ButtonType;

  private destroy$ = new Subject<void>();

  constructor(
    private readonly productDetailsService: IProductDetailsService,
    private readonly productApiService: IProductApiService,
    private readonly navigationService: INavigationService,
    private readonly plannerServiceProxy: ValueChainPlannerServiceProxy,
    private readonly exportService: ProductionPlanningFinalizingServiceProxy,
    private readonly uiService: IUiService
  ) {
  }

  ngOnInit(): void {
    this.initLoading()
    this.localisations = this.productDetailsService.getAdminLocalisationStrings();
    this.itemsPerPageOptions = this.productDetailsService.getPaginationOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productionDetailsLiveId']) {
      this.currentProductionDetailsId = this.productionDetailsLiveId;
    }

    if (changes['productionDetailsEditId']) {
      if (this.productionDetailsEditId) {
        this.currentProductionDetailsId = this.productionDetailsEditId;
        this.tabCartTabs = this.productDetailsService.getTabCardTabs(this.productionDetailsLiveId, this.productionDetailsEditId, this.currentProductionDetailsId);
        this.tabCartButtons = this.productDetailsService.getTabCardButtons();
      }
    }
    this.setPageMode();
  }

  openSidebar(): void {
    this.sidebarCollapsed = false;
  }

  onProductEditClicked() {
    this.showProductEditWizard = true;
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

  topActionButtonClicked(): void {
    if (this.productState === ProductState.ProductionReady) {
      this.showExportConfirmPopup = true;
    }

    if (this.productState === ProductState.Live) {
      this.showEditModeConfirmPopup = true
    }
  }

  onCloseWizard() {
    this.onCloseProductWizard.emit();
    this.showProductEditWizard = false;
  }

  //ProductGraph
  sendProductToPlanning(maxCost: number): void {
    this.readyForCalculating = false;
    this.showMaxCostPopup = false;
    this.plannerServiceProxy
      .sendProductToProductionPlanning(new ProductPlanInputDto({
        productionDetailsId: this.currentProductionDetailsId,
        maxCost: maxCost
      }))
      .subscribe(() => {
        this.readyForCalculating = true;
      });
  }

  //ExportToShop
  exportProduct() {
    this.showExportConfirmPopup = false;
    if (this.productState !== ProductState.ProductionReady) {
      return;
    }
    this.topActionButton.buttonIsDisabled = true;
    this.exportService
      .finalizeProductPlanning(this.productId)
      .subscribe({
        next: () => {
          this.productState = ProductState.Live;
          this.setPageMode()
        },
        error: () => {
          this.topActionButton.buttonIsDisabled = false;
        }
      });
  }

  //EditMode
  enableEditMode() {
    this.showEditModeConfirmPopup = false;
    this.uiService.showBusyIndicator();
    this.productApiService
      .enableEditMode(this.productId)
      .pipe(
        finalize(() => this.uiService.hideBusyIndicator())
      )
      .subscribe((result) => {
        this.productionDetailsEditId = result;
        this.currentProductionDetailsId = result;
        this.tabCartTabs = this.productDetailsService.getTabCardTabs(this.productionDetailsLiveId, this.productionDetailsEditId, this.currentProductionDetailsId);
        this.tabCartButtons = this.productDetailsService.getTabCardButtons();
      });
  }

  cancelEditMode() {
    this.showEditModeCancelPopup = false;
    this.uiService.showBusyIndicator();
    this.productApiService
      .cancelEditMode(this.productId)
      .pipe(
        finalize(() => this.uiService.hideBusyIndicator())
      )
      .subscribe(() => {
        this.productionDetailsEditId = undefined;
      });
  }

  confirmEditMode() {
    this.showEditModePublishPopup = false
    this.uiService.showBusyIndicator();
    this.productApiService
      .confirmEditMode(this.productId)
      .pipe(
        finalize(() => this.uiService.hideBusyIndicator())
      )
      .subscribe(() => {
        this.productionDetailsLiveId = this.currentProductionDetailsId;
        this.productionDetailsEditId = undefined;
      });
  }

  protected setPageMode() {
    this.setActionButton();
    this.setGraphMode();
    this.setOptionsCalculationMode();
    this.setProducerTableMode();
    this.setValueChainsTableMode();
  }

  protected editModeTabChange(tabValue: number) {
    this.currentProductionDetailsId = tabValue;
    this.setPageMode();
  }

  protected editModeButtonClicked(value: EditModeButtonTypeValues) {
    if (value === EditModeButtonType['Cancel']) {
      this.showEditModeCancelPopup = true
    }

    if (value === EditModeButtonType['Confirm']) {
      this.showEditModePublishPopup = true
    }
  }


  private setActionButton() {
    const isProductionReady: boolean = this.productState === ProductState.ProductionReady;
    const isLiveOrFinalized : boolean = this.productState === ProductState.Live ||
      this.productState === ProductState.ProductionPlanningFinalized;

    this.topActionButton = {
      buttonIsDisabled: !(isProductionReady || (isLiveOrFinalized && !AppConsts.IsOffer )), // For the MVP the edit mode is disabled
      buttonLabel: isLiveOrFinalized ? this.localisations.makeChanges : this.localisations.publishProduct,
      buttonType: isLiveOrFinalized ? ButtonType.SECONDARY : ButtonType.PRIMARY
    };
  }

  private setGraphMode() {
    if (this.currentProductionDetailsId === this.productionDetailsEditId) {
      this.graphMode = EProductGraphMode.ADMIN;
      return;
    }
    this.graphMode = [
      ProductState.ReadyForValueChainPlanning,
      ProductState.InProcessProducer,
      ProductState.ProductionReady].includes(this.productState) ? EProductGraphMode.ADMIN : EProductGraphMode.VIEW
  }

  private setProducerTableMode() {
    if (this.currentProductionDetailsId === this.productionDetailsEditId) {
      this.producerEditDisabled = false;
      return;
    }
    this.producerEditDisabled = ![
      ProductState.ReadyForValueChainPlanning,
      ProductState.InProcessProducer,
      ProductState.ProductionReady].includes(this.productState);
  }

  private setValueChainsTableMode() {
    if (this.currentProductionDetailsId === this.productionDetailsEditId) {
      this.valueChainEditDisable = false;
      return;
    }
    this.valueChainEditDisable = this.productState >= ProductState.Live
  }

  private setOptionsCalculationMode() {
    const deadline: DateTime = DateTime
      .fromFormat(this.deadlineDate, AppConsts.DateFormatString)
      .set(AppConsts.EndOfTheDay);

    if (this.currentProductionDetailsId === this.productionDetailsEditId) {
      this.readyForCalculating = deadline < DateTime.now() && this.totalWorkSteps > 0;
      return;
    }

    this.readyForCalculating = [
      ProductState.InProcessProducer,
      ProductState.ProductionReady].includes(this.productState)
      ? deadline < DateTime.now() && this.totalWorkSteps > 0
      : false;
  }

  private initLoading() {

    const loading: Observable<boolean>[] = [
      this.productProducerTableLoading$.pipe(startWith(false)),
      this.graphLoading$.pipe(startWith(false)),
      this.workStepTableLoading$.pipe(startWith(false)),
      this.valueChainTableLoading$.pipe(startWith(false))
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

  onTotalItemsChange(total: number) {
    if (this.currentProductionDetailsId === this.productionDetailsLiveId) {
      return;
    }
    const confirmBtn: ITabButton | undefined = this.tabCartButtons.find(btn => btn.value === EditModeButtonType['Confirm']);
    if (confirmBtn) {
      if (total > 0) {
        confirmBtn.disabled = false;
        return
      }
      confirmBtn.disabled = true;
    }
  }
}
