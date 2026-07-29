import { Injectable } from '@angular/core';
import { IProductDetailsService } from './iproduct-details.service';
import { AppLocalizationService } from '../../localization/app-localization.service';
import {
  ProducerAssignmentStatus,
  ProductionStepListDto,
  ProductionStepServiceProxy,
  ProductProducerListDto,
  ProductionStepOverviewDto
} from '../../../shared/service-proxies/service-proxies';
import {
  EActionButtonElementType,
  IColumnHeader,
  Icon,
  PmCheckboxState,
  PmDropdownOption,
  Row,
  ButtonType,
  ITab,
  ITabButton
} from 'hsu-library';
import {
  DEFAULT_PER_PAGE,
  PER_PAGE_1,
  PER_PAGE_2,
  PER_PAGE_3,
} from '../../table/table-base.service';
import {
  IProductDetailsAdminLocalisations
} from '../../../app/product-details/product-details-admin/product-details-admin.shared';
import {
  EditModeButtonType,
  IProductDetailsSharedLocalisations,
} from '../../../app/product-details/product-details.shared';
import {
  IProductDetailsProducerLocalisations
} from '../../../app/product-details/product-details-producer/product-details-producer.shared';
import { Observable } from 'rxjs';
import { ITableBaseService } from '../../table/itable-base.service';

@Injectable()
export class ProductDetailsService extends IProductDetailsService {
  constructor(
    protected readonly localizationService: AppLocalizationService,
    private readonly tableBaseService: ITableBaseService,
    private readonly workStepService: ProductionStepServiceProxy,
  ) {
    super();
  }

  public getProducerTableColumnHeaders(): IColumnHeader[] {
    return [
      this.tableBaseService.createCheckboxColumnHeader('checkbox'),
      this.tableBaseService.createTextColumnHeader('companyName', this.localizationService.loc('ProductDetails.ProducerTable.ColumnHeader.CompanyName'), true),
      this.tableBaseService.createTextColumnHeader('tradeTypeName', this.localizationService.loc('ProductDetails.ProducerTable.ColumnHeader.TradeTypeName'), true),
      this.tableBaseService.createTextColumnHeader('status', this.localizationService.loc('ProductDetails.ProducerTable.ColumnHeader.Status'), true),
      this.tableBaseService.createTextColumnHeader('details', this.localizationService.loc('ProductDetails.ProducerTable.ColumnHeader.Details'), false),
    ];
  }

  public getSharedLocalisationStrings(): IProductDetailsSharedLocalisations {
    return {
      sidebar: {
        sidebarTitle: this.localizationService.loc('ProductDetailsSidebar.Title'),
        fileSectionTitle: this.localizationService.loc('ProductDetailsSidebar.SectionFiles.Title'),
        sharepointLinkLabel: this.localizationService.loc('ProductDetailsSidebar.SectionFiles.SharePoint.Label'),
      },
      productGraphCard: {
        cardTitle: this.localizationService.loc('ProductDetails.ProductGraphCard.CardTitle'),
        descriptionAdmin: this.localizationService.loc('ProductDetails.ProductGraphCard.DescriptionAdmin'),
        descriptionProducer: this.localizationService.loc('ProductDetails.ProductGraphCard.DescriptionProducer'),
        buttonLabel: this.localizationService.loc('ProductDetails.ProductGraphCard.ButtonLabel'),
      },
      graphKeys: {
        finalState: this.localizationService.loc('ProductDetails.ProductGraphCard.GraphKey.FinalState'),
        stepWithoutProducer: this.localizationService.loc('ProductDetails.ProductGraphCard.GraphKey.StepWithoutProducer'),
        stepWithProducer: this.localizationService.loc('ProductDetails.ProductGraphCard.GraphKey.StepWithProducer'),
        stepCurrentProducer: this.localizationService.loc('ProductDetails.ProductGraphCard.GraphKey.StepCurrentProducer'),
      }
    }
  }

  // eslint-disable-next-line max-lines-per-function
  public getAdminLocalisationStrings(): IProductDetailsAdminLocalisations {
    return {
      ...this.getSharedLocalisationStrings(),
      producerTable: {
        cardTitle: this.localizationService.loc('ProductDetails.ProducerTable.CardTitle'),
        description: this.localizationService.loc('ProductDetails.ProducerTable.Description'),
        paginationTotalText: this.localizationService.loc('ProductDetails.ProducerTable.PaginationTotalText'),
        requestButtonLabel: this.localizationService.loc('ProductDetails.ProducerTable.RequestButtonLabel'),
        deadline: this.localizationService.loc('ProductDetails.ProducerTable.Deadline'),
        popup: {
          title: this.localizationService.loc('ProductDetails.ProducerTable.Popup.Title'),
          description: this.localizationService.loc('ProductDetails.ProducerTable.Popup.Description'),
          inputLabel: this.localizationService.loc('ProductDetails.ProducerTable.Popup.InputLabel'),
          cancelButtonLabel: this.localizationService.loc('ProductDetails.ProducerTable.Popup.CancelButtonLabel'),
          confirmButtonLabel: this.localizationService.loc('ProductDetails.ProducerTable.Popup.ConfirmButtonLabel'),
        },
        requestPopup: {
          title: this.localizationService.loc('ProductDetails.ProducerTable.RequestPopup.Title'),
          description: this.localizationService.loc('ProductDetails.ProducerTable.RequestPopup.Description'),
          cancelButtonLabel: this.localizationService.loc('ProductDetails.ProducerTable.RequestPopup.CancelButtonLabel'),
          confirmButtonLabel: this.localizationService.loc('ProductDetails.ProducerTable.RequestPopup.ConfirmButtonLabel'),
        },
      },
      productDetailsInProgress: {
        description: this.localizationService.loc('ProductDetailsAdmin.InProgress.Description'),
        lastEditTitle: this.localizationService.loc('ProductDetailsAdmin.InProgress.LastEditTitle')
      },
      workstepTable: {
        cardTitle: this.localizationService.loc('ProductDetails.WorkStepTable.CardTitle'),
        description: this.localizationService.loc('ProductDetails.WorkStepTable.Description'),
        totalItemsText: this.localizationService.loc('ProductDetails.WorkStepTable.PaginationTotalText'),
        removeButtonLabel: ''
      },
      valueChainsTabe: {
        cardTitle: this.localizationService.loc('ProductDetails.ValueChainTable.CardTitle'),
        description: this.localizationService.loc('ProductDetails.ValueChainTable.Description'),
        paginationTotalText: this.localizationService.loc('ProductDetails.ValueChainTable.PaginationTotalText'),
        datepickerTitle: this.localizationService.loc('ProductDetails.ValueChainTable.DatepickerTitle'),
      },
      confirmExportPopup: {
        title: this.localizationService.loc('ProductExport.ConfirmPopup.Title'),
        description: this.localizationService.loc('ProductExport.ConfirmPopup.Description'),
        confirm: this.localizationService.loc('ProductExport.ConfirmPopup.Confirm'),
        cancel: this.localizationService.loc('ProductExport.ConfirmPopup.Cancel')
      },
      confirmEditModePopup: {
        title: this.localizationService.loc('EditMode.ConfirmPopup.Title'),
        description: this.localizationService.loc('EditMode.ConfirmPopup.Description'),
        confirm: this.localizationService.loc('EditMode.Popup.Confirm'),
        cancel: this.localizationService.loc('EditMode.Popup.Cancel')
      },
      cancelEditModePopup: {
        title: this.localizationService.loc('EditMode.CancelPopup.Title'),
        description: this.localizationService.loc('EditMode.CancelPopup.Description'),
        confirm: this.localizationService.loc('EditMode.Popup.Confirm'),
        cancel: this.localizationService.loc('EditMode.Popup.Cancel')
      },
      publishEditModePopup: {
        title: this.localizationService.loc('EditMode.PublishPopup.Title'),
        description: this.localizationService.loc('EditMode.PublishPopup.Description'),
        confirm: this.localizationService.loc('EditMode.Popup.Confirm'),
        cancel: this.localizationService.loc('EditMode.Popup.Cancel')
      },
      maxCostPopup: {
        title: this.localizationService.loc('ProductDetails.MaxCostPopup.Title'),
        description: this.localizationService.loc('ProductDetails.MaxCostPopup.Description'),
        inputLabel: this.localizationService.loc('ProductDetails.MaxCostPopup.InputLabel'),
        unit: this.localizationService.loc('ProductDetails.MaxCostPopup.Unit'),
        placeholder: this.localizationService.loc('ProductDetails.MaxCostPopup.Placeholder'),
        confirm: this.localizationService.loc('ProductDetails.MaxCostPopup.Confirm'),
        cancel: this.localizationService.loc('ProductDetails.MaxCostPopup.Cancel'),
      },
      confirmDeletePopup: {
        title: this.localizationService.loc('Product.Delete.ConfirmPopup.Title'),
        description: this.localizationService.loc('Product.Delete.ConfirmPopup.Description'),
        confirm: this.localizationService.loc('ConfirmPopup.Default.Confirm'),
        cancel: this.localizationService.loc('ConfirmPopup.Default.Cancel'),
      },
      deleteNotAllowedPopup: {
        title: this.localizationService.loc('Product.Delete.NotAllowed.Title'),
        description: this.localizationService.loc('Product.Delete.NotAllowed.Description'),
        confirm: this.localizationService.loc('ConfirmPopup.Default.Confirm'),
        cancel: this.localizationService.loc('ConfirmPopup.Default.Cancel'),
      },
      publishProduct: this.localizationService.loc('ProductExport.PublishProduct'),
      makeChanges: this.localizationService.loc('ProductExport.MakeChanges'),
      deleteProduct: this.localizationService.loc('Product.Delete.ButtonLabel'),
    };
  }

  public getProducerLocalisationStrings(): IProductDetailsProducerLocalisations {
    return {
      ...this.getSharedLocalisationStrings(),
      productRequestCard: {
        cardText: this.localizationService.loc('ProductDetailsDeveloper.ProducerRequest.Text'),
        acceptButtonText: this.localizationService.loc('ProductDetailsDeveloper.ProducerRequest.Accept'),
        rejectButtonText: this.localizationService.loc('ProductDetailsDeveloper.ProducerRequest.Reject'),
      },
      deadlineBannerText: this.localizationService.loc('ProductDetailsDeveloper.DeadlineBanner.Text'),
      completedBannerText: this.localizationService.loc('ProductDetailsDeveloper.CompletedBanner.Text'),
    };
  }

  public getPaginationOptions(): PmDropdownOption<string>[] {
    const paginationCounts: number[] = [DEFAULT_PER_PAGE, PER_PAGE_1, PER_PAGE_2, PER_PAGE_3];
    return paginationCounts.map(amount => ({
      key: amount.toString(),
      value: amount.toString()
    }));
  }

  public getProducerTableRow(producer: ProductProducerListDto, disabledForEdit: boolean): Row {
    return {
      rowId: producer.producerId,
      isHighlighted: false,
      isSelected: this.isProducerRowSelected(producer.status),
      cells: [
        this.tableBaseService.createCheckboxCell(this.setCheckboxState(producer.status), disabledForEdit || this.isProducerRowSelected(producer.status)),
        this.tableBaseService.createTextCell(producer.companyName ?? ''),
        this.tableBaseService.createTextCell(this.mapTradeName(producer.trade.tradeTypeName)),
        this.tableBaseService.createTextCell(this.mapProducerStatus(producer.status)),
        this.tableBaseService.createActionCell(Icon.ARROW, '', EActionButtonElementType.PRODUCT_PRODUCER)
      ]
    }
  }

  public getWorkStepTableColumnHeaders(): IColumnHeader[] {
    return [
      this.tableBaseService.createTextColumnHeader('startState', this.localizationService.loc('ProductDetails.WorkStepTable.ColumnHeader.StartingState'), true),
      this.tableBaseService.createTextColumnHeader('endState', this.localizationService.loc('ProductDetails.WorkStepTable.ColumnHeader.FinalState'), true),
      this.tableBaseService.createTextColumnHeader('defaultCost', this.localizationService.loc('ProductDetails.WorkStepTable.ColumnHeader.Cost'), false),
      this.tableBaseService.createTextColumnHeader('name', this.localizationService.loc('ProductDetails.WorkStepTable.ColumnHeader.ProducerName'), true),
      this.tableBaseService.createTextColumnHeader('trade', this.localizationService.loc('ProductDetails.WorkStepTable.ColumnHeader.TradeTypeName'), false),
      this.tableBaseService.createTextColumnHeader('details', this.localizationService.loc('ProductDetails.WorkStepTable.ColumnHeader.Details'), false),

    ];
  }

  public getWorkStepTableRow(workStep: ProductionStepListDto): Row {
    return {
      rowId: workStep.productionStepId,
      isHighlighted: false,
      isSelected: false,
      cells: [
        this.tableBaseService.createTextCell(workStep.startState ?? ''),
        this.tableBaseService.createTextCell(workStep.endState ?? ''),
        this.tableBaseService.createTextCell(workStep.defaultCost.toString()),
        this.tableBaseService.createTextCell(workStep.producerName ?? ''),
        this.tableBaseService.createTextCell(this.mapTradeName(workStep.trade.tradeTypeName)),
        this.tableBaseService.createActionCell(Icon.NEW_WINDOW, '', EActionButtonElementType.PRODUCT_WORKSTEP)
      ]
    }
  }

  public getProductionStepList(productionDetailsId: number, sorting: string): Observable<ProductionStepListDto[]> {
    return this.workStepService.getProductionStepsList(productionDetailsId, sorting);
  }

  public getProductionStep(stepId: number): Observable<ProductionStepOverviewDto> {
    return this.workStepService.getProductionsStepOverview(stepId)
  }

  public getTabCardTabs(productionDetailsLiveId: number, productionDetailsEditId: number, activeId: number): ITab<number>[] {
    return [

      {
        text: this.localizationService.loc('EditMode.TabCard.Tabs.Live'),
        value: productionDetailsLiveId,
        active: activeId === productionDetailsLiveId,
      },
      {
        text: this.localizationService.loc('EditMode.TabCard.Tabs.Edit'),
        value: productionDetailsEditId,
        active: activeId === productionDetailsEditId,
      },
    ]

  }

  public getTabCardButtons(): ITabButton[] {
    return [
      {
        text: this.localizationService.loc('EditMode.TabCard.Buttons.Cancel'),
        value: EditModeButtonType['Cancel'],
        type: ButtonType.SECONDARY,
        disabled: false
      },
      {
        text: this.localizationService.loc('EditMode.TabCard.Buttons.Save'),
        value: EditModeButtonType['Confirm'],
        type: ButtonType.PRIMARY,
        disabled: true
      },
    ]
  }

  private mapProducerStatus(status: ProducerAssignmentStatus): string {
    switch (status) {
    case ProducerAssignmentStatus.Accepted:
      return this.localizationService.loc('ProductDetails.ProducerTable.Status.Accepted');
    case ProducerAssignmentStatus.Rejected:
      return this.localizationService.loc('ProductDetails.ProducerTable.Status.Rejected');
    case ProducerAssignmentStatus.Requested:
      return this.localizationService.loc('ProductDetails.ProducerTable.Status.Requested');
    default:
      return this.localizationService.loc('ProductDetails.ProducerTable.Status.Unknown');
    }
  }

  private mapTradeName(tradeName: string | undefined): string {
    return tradeName
      ? this.localizationService.loc(`${this.localizationService.getLocalizedTradeTypeName(tradeName)}`)
      : this.localizationService.loc('UserProfile.WorkType.Unknown')
  }

  private setCheckboxState(producerState: ProducerAssignmentStatus): PmCheckboxState {
    if (this.isProducerRowSelected(producerState)) {
      return PmCheckboxState.ACTIVE;
    }

    return PmCheckboxState.DEFAULT;
  }

  private isProducerRowSelected(producerState: ProducerAssignmentStatus): boolean {
    return producerState === ProducerAssignmentStatus.Accepted || producerState === ProducerAssignmentStatus.Requested;
  }
}
