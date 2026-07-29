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
} from '../../../shared/service-proxies/service-proxies';
import {
  IColumnHeader,
  IValueChainTableLocalisation,
  ValueChainTableLocalisation,
  IPager,
  Row,
  Pager,
  IColumnSortEvent,
  PmDropdownOption
} from 'hsu-library';
import { AppConsts } from '../../../shared/AppConsts';
import { IProductionPlanService } from '../../../services/productionPlans/iproduction-plan.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'value-chain-table',
  templateUrl: './value-chain-table.component.html'
})
export class ValueChainTableComponent implements OnChanges {

  @Input()
  productionDetailsId: number = 0;

  @Input()
  itemsPerPageOptions: PmDropdownOption<string>[] = [];

  @Input()
  editDisabled: boolean = false;

  @Input()
  localisations: IValueChainTableLocalisation = ValueChainTableLocalisation;

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


  constructor(private readonly productionPlanService: IProductionPlanService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productionDetailsId'] && this.productionDetailsId !== 0) {
      this.setValueChainsTableData();
    }
  }

  onValueChainSortingClicked(sortEvent: IColumnSortEvent): void {
    const columnIdentifier: string[] = sortEvent.columnIdentifier.split(' ');
    this.valueChainsSortOrder = columnIdentifier[0] + ' ' + sortEvent.sortOrder;
    if (columnIdentifier.length > 1) {
      this.valueChainsSortRateId = isNaN(Number(columnIdentifier[1])) ? 0 : Number(columnIdentifier[1]);
    }
    this.setValueChainsTableData();
  }

  onValueChainPageClicked(pager: IPager): void {
    this.valueChainsPaginationData = pager;
    this.setValueChainsTableData();
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

  private setValueChainsTableData(): void {
    this.loading = true;
    this.loadingState.emit(true)
    this.productionPlanService
      .getProductionPlans(this.productionDetailsId, this.valueChainsSortRateId, this.valueChainsSortOrder,
        this.valueChainsPaginationData.MaxResultCount, this.valueChainsPaginationData.SkipCount)
      .pipe(finalize(() => (this.loadingState.emit(false))))
      .subscribe({
        next: (chainResult: PlanListOutputDto) => {
          this.planData = chainResult.plans.items ?? [];
          this.ratingTypes = chainResult.ratingTypes ?? [];
          this.totalItemsValueChains = chainResult.plans.totalCount;
          this.lastCalculationDate = chainResult.lastPlanCalculatedAt?.toFormat(AppConsts.DateFormatString) ?? '';
          if (this.valueChainsColumnHeaders.length === 0) {
            this.valueChainsColumnHeaders = this.productionPlanService.getProductionPlanColumnHeaders(this.ratingTypes);
          }
          this.valueChainsRowData = this.productionPlanService.getProductionPlanRowData(chainResult.plans.items ?? [], this.ratingTypes);
          this.loading = false;
          this.onTotalItemsChange.emit(this.totalItemsValueChains)
        }
      });
  }
}
