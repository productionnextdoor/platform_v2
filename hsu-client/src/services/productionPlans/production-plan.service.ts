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
  ActionButtonType,
  EActionButtonElementType,
  ICell,
  IColumnHeader,
  Icon,
  PmCheckboxState,
  Row
} from 'hsu-library';
import { AppLocalizationService } from '../localization/app-localization.service';
import { ITableBaseService } from '../table/itable-base.service';
import { AppConsts } from '../../shared/AppConsts';
import { isNumber } from 'lodash-es';

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

  public getProductionPlanColumnHeadersAdmin(ratingTypes: PlanRatingTypesDto[]): IColumnHeader[] {
    return [
      this.tableBaseService.createCheckboxColumnHeader('checkbox'),
      ...this.getCommonHeaders(ratingTypes),
    ];
  }

  public getProductionPlanColumnHeadersDeveloper(ratingTypes: PlanRatingTypesDto[]): IColumnHeader[] {
    return [
      this.tableBaseService.createTextColumnHeader('', '', false),
      ...this.getCommonHeaders(ratingTypes),
    ];
  }

  public getProductionPlanRowDataAdmin(planList: PlanListDto[], ratingTypes: PlanRatingTypesDto[]): Row[] {
    return planList.map((plan: PlanListDto) => {
      const cells: ICell[] = [
        this.tableBaseService.createCheckboxCell(plan.isActive ? PmCheckboxState.ACTIVE : PmCheckboxState.DEFAULT, false),
        ...this.getCommonCells(plan, ratingTypes)
      ];
      return {
        rowId: plan.planId,
        isHighlighted: false,
        isSelected: plan.isActive,
        cells: cells
      }
    });
  }


  public getProductionPlanRowDataDeveloper(planList: PlanListDto[], ratingTypes: PlanRatingTypesDto[], selectedForProductionId?: number): Row[] {
    const disabled: boolean = isNumber(selectedForProductionId) && selectedForProductionId > 0;
    return planList.map((plan: PlanListDto) => {
      const buttonText: string = selectedForProductionId === plan.planId ?
        this.localizationService.loc('ProductDetails.ValueChainTable.SelectVCP.Selected') :
        this.localizationService.loc('ProductDetails.ValueChainTable.SelectVCP.Select')
      const cells: ICell[] = [
        this.tableBaseService.createActionCell(Icon.ARROW, '', EActionButtonElementType.SELECT_VALUE_CHAIN, disabled, ActionButtonType.BUTTON,buttonText),
        ...this.getCommonCells(plan, ratingTypes)
      ];
      return {
        rowId: plan.planId,
        isHighlighted: selectedForProductionId === plan.planId,
        isSelected: plan.isActive,
        cells: cells
      }
    });
  }

  private mapProductionPlanActiveDto(planId: number, isActive: boolean): ProductionPlanActiveDto {
    return new ProductionPlanActiveDto({
      productionPlanId: planId,
      isActive: isActive
    });
  }

  private getCommonHeaders(ratingTypes: PlanRatingTypesDto[]): IColumnHeader[] {
    const headers: IColumnHeader[] = [
      this.tableBaseService.createTextColumnHeader('producers', this.localizationService.loc('ProductDetails.ValueChainTable.ColumnName.Producers'), false),
      ...ratingTypes.map((item) => {
        return this.tableBaseService.createTextColumnHeader('rate ' + item.ratingTypeId, this.localizationService.loc('UserProfile.ProducerRatings.' + item.ratingTypeName), true);
      }),
      this.tableBaseService.createTextColumnHeader('planValue', this.localizationService.loc('ProductDetails.ValueChainTable.ColumnName.PlanCost'), true),
      this.tableBaseService.createTextColumnHeader('leadTime', this.localizationService.loc('ProductDetails.ValueChainTable.ColumnName.LeadTime'), true),
    ];

    if (AppConsts.IsOffer)
      headers.push(this.tableBaseService.createTextColumnHeader('projectedEndDate', this.localizationService.loc('ProductDetails.ValueChainTable.ColumnName.ProjectedEndDate'), false));

    return headers;
  }

  private getCommonCells(plan: PlanListDto, ratingTypes: PlanRatingTypesDto[]) {
    const cells: ICell[] = [
      this.tableBaseService.createTextCell(plan.producersList ?? ''),
      ...ratingTypes.map((ratingTypeItem) => {
        const rating: PlanRatingDto | undefined = plan
          .planRatings?.find((ratingItem) => ratingItem.ratingTypeId === ratingTypeItem.ratingTypeId);
        return this.tableBaseService.createRatingCell(rating?.rating ?? 0, ratingTypeItem.maxRating ?? 0);
      }),
      this.tableBaseService.createTextCell(plan.planValue.toString() ?? ''),
      this.tableBaseService.createTextCell(plan.leadTime.toString() + ' ' + this.localizationService.loc('ProductDetails.ValueChainTable.Unit') ?? ''),
    ]

    if (AppConsts.IsOffer)
      cells.push(this.tableBaseService.createTextCell(plan.projectedEndDate?.toFormat(AppConsts.DateFormatString) ?? ''));

    return cells;
  }
}
