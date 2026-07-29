import { IProductionPlanService } from './iproduction-plan.service';
import { Injectable } from '@angular/core';
import {
  PlanListDto,
  PlanListOutputDto,
  PlanRatingDto,
  PlanRatingTypesDto,
  ProductionPlanActiveDto,
  ProductionPlanServiceProxy
} from '../../shared/service-proxies/service-proxies';
import { Observable } from 'rxjs';
import {
  IColumnHeader,
  Row,
  PmCheckboxState
} from 'hsu-library';
import { AppLocalizationService } from '../localization/app-localization.service';
import { ITableBaseService } from '../table/itable-base.service';

@Injectable()
export class ProductionPlanService extends IProductionPlanService {

  constructor(
    protected readonly localizationService: AppLocalizationService,
    private readonly tableBaseService: ITableBaseService,
    private readonly productionPlanApiService: ProductionPlanServiceProxy,
  ) {
    super();
  }

  public getProductionPlans(productionDetailsId: number, sortRateTypeId: number, sorting: string, maxResultCount: number, skipCount: number): Observable<PlanListOutputDto> {
    return this.productionPlanApiService.getProductionPlans(productionDetailsId, sortRateTypeId, sorting, maxResultCount, skipCount)
  }

  public setProductionPlanActive(planId: number, isActive: boolean): Observable<void> {
    return this.productionPlanApiService.setActive(this.mapProductionPlanActiveDto(planId, isActive));
  }

  public getProductionPlanColumnHeaders(ratingTypes: PlanRatingTypesDto[]): IColumnHeader[] {
    return [
      this.tableBaseService.createCheckboxColumnHeader('checkbox'),
      this.tableBaseService.createTextColumnHeader('producers', this.localizationService.loc('ProductDetails.ValueChainTable.ColumnName.Producers'), false),
      ...ratingTypes.map((item) => {
        return this.tableBaseService.createTextColumnHeader('rate ' + item.ratingTypeId, this.localizationService.loc('UserProfile.ProducerRatings.' + item.ratingTypeName), true);
      }),
      this.tableBaseService.createTextColumnHeader('planValue', this.localizationService.loc('ProductDetails.ValueChainTable.ColumnName.PlanCost'), true),
      this.tableBaseService.createTextColumnHeader('leadTime', this.localizationService.loc('ProductDetails.ValueChainTable.ColumnName.LeadTime'), true),
    ];
  }

  public getProductionPlanRowData(planList: PlanListDto[], ratingTypes: PlanRatingTypesDto[]): Row[] {
    return planList.map((plan) => {
      return {
        rowId: plan.planId,
        isHighlighted: false,
        isSelected: plan.isActive,
        cells: [
          this.tableBaseService.createCheckboxCell(plan.isActive ? PmCheckboxState.ACTIVE : PmCheckboxState.DEFAULT, false),
          this.tableBaseService.createTextCell(plan.producersList ?? ''),
          ...ratingTypes.map((ratingTypeItem) => {
            const rating: PlanRatingDto | undefined = plan
              .planRatings?.find((ratingItem) => ratingItem.ratingTypeId === ratingTypeItem.ratingTypeId);
            return this.tableBaseService.createRatingCell(rating?.rating ?? 0, ratingTypeItem.maxRating ?? 0);
          }),
          this.tableBaseService.createTextCell(plan.planValue.toString() ?? ''),
          this.tableBaseService.createTextCell(plan.leadTime.toString() + ' ' + this.localizationService.loc('ProductDetails.ValueChainTable.Unit') ?? ''),
        ]
      }
    });
  }

  private mapProductionPlanActiveDto(planId: number, isActive: boolean): ProductionPlanActiveDto {
    return new ProductionPlanActiveDto({
      productionPlanId: planId,
      isActive: isActive
    });
  }
}
