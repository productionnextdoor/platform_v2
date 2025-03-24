import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  PlanListDto,
  PlanListOutputDto,
  PlanRatingTypesDto,
  ProductionPlanningFinalizingServiceProxy,
} from '../../../shared/service-proxies/service-proxies';
import {
  IActionEvent,
  IColumnHeader,
  IColumnSortEvent,
  IPager,
  Pager,
  PmDropdownOption,
  Row,
} from 'hsu-library';
import { AppConsts } from '../../../shared/AppConsts';
import { IProductionPlanService } from '../../../services/productionPlans/iproduction-plan.service';
import {
  finalize,
  map,
  Observable
} from 'rxjs';
import {
  EValueChainTableMode,
  fullValueChainTableLocalisation,
  IFullValueChainTableLocalisation
} from './value-chain-table.shared';
import { WithRx } from '../../../shared/mixins/with-rx.mixin';

@Component({
  selector: 'value-chain-table',
  templateUrl: './value-chain-table.component.html'
})
export class ValueChainTableComponent extends WithRx() implements OnChanges {

  @Input()
  tableMode: EValueChainTableMode = EValueChainTableMode.ADMIN;

  @Input()
  productionDetailsId: number = 0;

  @Input()
  itemsPerPageOptions: PmDropdownOption<string>[] = [];

  @Input()
  editDisabled: boolean = false;

  @Input()
  localisations: IFullValueChainTableLocalisation = fullValueChainTableLocalisation;

  @Output()
  loadingState = new EventEmitter<boolean>();

  @Output()
  onTotalItemsChange: EventEmitter<number> = new EventEmitter<number>();


  protected loading: boolean = false;
  protected ratingTypes: PlanRatingTypesDto[] = [];
  protected planData: PlanListDto[] = [];
  protected valueChainsColumnHeaders: IColumnHeader[] = [];
  protected valueChainsRowData: Row[] = [];
  protected totalItemsValueChains: number = 0;
  protected lastCalculationDate: string = '';
  protected valueChainsSortOrder: string = '';
  protected valueChainsSortRateId: number = 0;
  protected valueChainsPaginationData: IPager = Pager;
  protected showValueChainSelectionPopup: boolean = false;
  protected selectedValueChainId: number = 0;

  constructor(
    private readonly productionPlanService: IProductionPlanService,
    private readonly exportService: ProductionPlanningFinalizingServiceProxy) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productionDetailsId'] && this.productionDetailsId !== 0) {
      this.setValueChainsTableData().subscribe();
    }
  }

  onValueChainSortingClicked(sortEvent: IColumnSortEvent): void {
    const columnIdentifier: string[] = sortEvent.columnIdentifier.split(' ');
    this.valueChainsSortOrder = columnIdentifier[0] + ' ' + sortEvent.sortOrder;
    if (columnIdentifier.length > 1) {
      this.valueChainsSortRateId = isNaN(Number(columnIdentifier[1])) ? 0 : Number(columnIdentifier[1]);
    }
    this.setValueChainsTableData().subscribe();
  }

  onValueChainPageClicked(pager: IPager): void {
    this.valueChainsPaginationData = pager;
    this.setValueChainsTableData().subscribe();
  }

  onSetActive(rowIds: number[]): void {
    this.planData.map((plan: PlanListDto) => {
      if ((rowIds.includes(plan.planId) && !plan.isActive) || (!rowIds.includes(plan.planId) && plan.isActive)) {
        this.productionPlanService
          .setProductionPlanActive(plan.planId, !plan.isActive)
          .subscribe(_ => {
            plan.isActive = !plan.isActive;
          });
      }
    });
  }

  onSelectValueChain(action: IActionEvent) {
    this.selectedValueChainId = action.rowId;
    this.showValueChainSelectionPopup = true;
  }

  selectValueChain() {
    this.exportService
      .selectPlanForProduction(this.selectedValueChainId)
      .pipe(
        this.switchMapCancelable(this.setValueChainsTableData.bind(this))
      ).subscribe(() => {
        this.showValueChainSelectionPopup = false;
      });
  }

  private setValueChainsTableData(): Observable<void> {
    this.loading = true;
    this.loadingState.emit(true)
    return this.productionPlanService
      .getProductionPlans(this.productionDetailsId, this.valueChainsSortRateId, this.valueChainsSortOrder,
        this.valueChainsPaginationData.MaxResultCount, this.valueChainsPaginationData.SkipCount)
      .pipe(
        map((chainResult: PlanListOutputDto) => {
          this.planData = chainResult.plans.items ?? [];
          this.ratingTypes = chainResult.ratingTypes ?? [];
          this.totalItemsValueChains = chainResult.plans.totalCount;
          this.lastCalculationDate = this.tableMode === EValueChainTableMode.ADMIN ?
            chainResult.lastPlanCalculatedAt?.toFormat(AppConsts.DateFormatString) ?? '' : '';
          this.getColumnHeaders();
          this.getRows(chainResult);
          this.loading = false;
          this.onTotalItemsChange.emit(this.totalItemsValueChains)
        }),
        finalize(() => (this.loadingState.emit(false)))
      )
  }

  private getColumnHeaders(){
    if (this.valueChainsColumnHeaders.length === 0) {
      this.valueChainsColumnHeaders = this.tableMode === EValueChainTableMode.ADMIN ?
        this.productionPlanService.getProductionPlanColumnHeadersAdmin(this.ratingTypes) :
        this.productionPlanService.getProductionPlanColumnHeadersDeveloper(this.ratingTypes);
    }
  }

  private getRows(chainResult:PlanListOutputDto) {
    this.valueChainsRowData = this.tableMode === EValueChainTableMode.ADMIN ?
      this.productionPlanService.getProductionPlanRowDataAdmin(chainResult.plans.items ?? [], this.ratingTypes) :
      this.productionPlanService.getProductionPlanRowDataDeveloper(chainResult.plans.items ?? [], this.ratingTypes, chainResult.selectedForProductionId);
  }
}
