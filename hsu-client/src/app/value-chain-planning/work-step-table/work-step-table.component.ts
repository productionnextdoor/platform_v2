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
  ProductionStepListDto,
  ProductionStepOverviewDto
} from '../../../shared/service-proxies/service-proxies';
import { IProductDetailsService } from '../../../services/products/product-details/iproduct-details.service';
import {
  IColumnHeader,
  IColumnSortEvent,
  IWorkstepTableLocalisations,
  Row,
  WorkstepTableLocalisations,
  IActionEvent,
  defaultWorkStepData,
  IWorkStepData,
  IWorkStepPopupLocalisations,
  workStepPopupLocalisations
} from 'hsu-library';
import { AppLocalizationService } from '../../../services/localization/app-localization.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'work-step-table',
  templateUrl: './work-step-table.component.html',
})
export class WorkStepTableComponent implements OnInit, OnChanges {

  @Input()
  productionDetailsId: number = 0;

  @Input()
  localisations: IWorkstepTableLocalisations = WorkstepTableLocalisations;

  @Input()
  totalItemsWorkSteps: number = 0;

  @Output()
  totalItemsWorkStepsChange: EventEmitter<number> = new EventEmitter();

  @Output()
  loadingState = new EventEmitter<boolean>();

  //Table
  protected workStepLoading: boolean = false;
  protected workStepRowData: Row[] = [];
  protected workStepColumnHeaders: IColumnHeader[] = [];
  protected workStepSortOrder: string = '';

  //Popup
  protected showPopup: boolean = false;
  protected popupWorkStepData: IWorkStepData = defaultWorkStepData;
  protected popupLocalisations: IWorkStepPopupLocalisations = workStepPopupLocalisations;

  constructor(
    private readonly productDetailsService: IProductDetailsService,
    private readonly localizationService: AppLocalizationService,
  ) {

  }

  ngOnInit(): void {
    this.workStepColumnHeaders = this.productDetailsService.getWorkStepTableColumnHeaders();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productionDetailsId'] && this.productionDetailsId !== 0) {
      this.setWorkStepTableData();
    }
  }

  onSortWorkStepClicked(sortEvent: IColumnSortEvent) {
    this.workStepSortOrder = sortEvent.columnIdentifier + ' ' + sortEvent.sortOrder;
    this.setWorkStepTableData();
  }

  onWorkStepClick(actionEvent: IActionEvent) {
    this.productDetailsService.getProductionStep(actionEvent.rowId)
      .subscribe(stepOverviewResult => {
        this.popupLocalisations = {
          context: this.localizationService.loc('ProductDetails.WorkStepPopup.Title'),
          title: stepOverviewResult.startState + ' - ' + stepOverviewResult.endState,
          buttonLabel: this.localizationService.loc('ProductDetails.WorkStepPopup.Button')
        }
        this.popupWorkStepData = this.mapPopupWorkStepData(stepOverviewResult);
        this.showPopup = true;
      });
  }

  private setWorkStepRowData(workSteps: ProductionStepListDto[]) {
    this.workStepRowData = workSteps.map(item => (
      this.productDetailsService.getWorkStepTableRow(item)
    ));
  }

  private setWorkStepTableData() {
    this.workStepLoading = true;
    this.loadingState.emit(true);
    this.productDetailsService
      .getProductionStepList(this.productionDetailsId, this.workStepSortOrder)
      .pipe(finalize(() => (this.loadingState.emit(false))))
      .subscribe(stepResult => {
        this.setWorkStepRowData(stepResult);
        this.totalItemsWorkSteps = stepResult.length;
        this.workStepLoading = false;
        this.totalItemsWorkStepsChange.emit(this.totalItemsWorkSteps);
      });
  }

  private mapPopupWorkStepData(stepOverviewResult: ProductionStepOverviewDto) {
    return {
      producer: this.getProducer(stepOverviewResult),
      workTime: this.getWorkTime(stepOverviewResult),
      workStep: this.getWorkStep(stepOverviewResult),
      calculation: this.getCalculation(stepOverviewResult)
    }
  }

  private getCalculation(stepOverviewResult: ProductionStepOverviewDto) {
    return {
      title: this.localizationService.loc('ProductDetails.WorkStepPopup.Section.Calculation.Title'),
      properties: [
        {
          key: this.localizationService.loc('ProductDetails.WorkStepPopup.Section.Calculation.Properties.WorkCost'),
          value: stepOverviewResult.workCost.toFixed(2) ?? '',
        },
        {
          key: this.localizationService.loc('ProductDetails.WorkStepPopup.Section.Calculation.Properties.MaterialAndTransportCost'),
          value: stepOverviewResult.materialAndTransportCost.toFixed(2) ?? '',
        }
      ]
    };
  }

  private getWorkStep(stepOverviewResult: ProductionStepOverviewDto) {
    return {
      title: this.localizationService.loc('ProductDetails.WorkStepPopup.Section.WorkStep.Title'),
      properties: [
        {
          key: this.localizationService.loc('ProductDetails.WorkStepPopup.Section.WorkStep.Properties.StartState'),
          value: stepOverviewResult.startState ?? '',
        },
        {
          key: this.localizationService.loc('ProductDetails.WorkStepPopup.Section.WorkStep.Properties.EndState'),
          value: stepOverviewResult.endState ?? '',
        }
      ]
    };
  }

  private getWorkTime(stepOverviewResult: ProductionStepOverviewDto) {
    return {
      title: this.localizationService.loc('ProductDetails.WorkStepPopup.Section.WorkTime.Title'),
      properties: [
        {
          key: this.localizationService.loc('ProductDetails.WorkStepPopup.Section.WorkTime.Properties.OrderProcessingTime'),
          value: stepOverviewResult.orderProcessingTime + ' ' + this.localizationService.loc('ValueChainPlanning.Units.Weeks') ?? '',
        },
        {
          key: this.localizationService.loc('ProductDetails.WorkStepPopup.Section.WorkTime.Properties.WorkHours'),
          value: stepOverviewResult.workHours + ' ' + this.localizationService.loc('ValueChainPlanning.Units.Hours') ?? '',
        }
      ]
    };
  }

  private getProducer(stepOverviewResult: ProductionStepOverviewDto) {
    return {
      title: this.localizationService.loc('ProductDetails.WorkStepPopup.Section.Producer.Title'),
      properties: [
        {
          key: this.localizationService.loc('ProductDetails.WorkStepPopup.Section.Producer.Properties.ProducerName'),
          value: stepOverviewResult.producerName ?? '',
        },
        {
          key: this.localizationService.loc('ProductDetails.WorkStepPopup.Section.Producer.Properties.TradeTypeName'),
          value: stepOverviewResult.trade.tradeTypeName ?? '',
        }
      ]
    };
  }
}
