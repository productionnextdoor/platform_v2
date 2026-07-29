import { Observable } from 'rxjs';
import {
  PlanListDto,
  PlanListOutputDto,
  PlanRatingTypesDto
} from '../../shared/service-proxies/service-proxies';
import {
  IColumnHeader,
  Row
} from 'hsu-library';

export abstract class IProductionPlanService {
  public abstract getProductionPlans(productionDetailsId: number, sortRateTypeId: number, sorting: string, maxResultCount: number, skipCount: number): Observable<PlanListOutputDto>;
  public abstract setProductionPlanActive(planId: number, isActive: boolean): Observable<void>;
  public abstract getProductionPlanColumnHeaders(ratingTypes: PlanRatingTypesDto[]): IColumnHeader[]
  public abstract getProductionPlanRowData(items: PlanListDto[], ratingTypes: PlanRatingTypesDto[]): Row[];
}
