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
  public abstract getProductionPlanColumnHeadersAdmin(ratingTypes: PlanRatingTypesDto[]): IColumnHeader[]
  public abstract getProductionPlanRowDataAdmin(items: PlanListDto[], ratingTypes: PlanRatingTypesDto[]): Row[];
  public abstract getProductionPlanColumnHeadersDeveloper(ratingTypes: PlanRatingTypesDto[]): IColumnHeader[]
  public abstract getProductionPlanRowDataDeveloper(items: PlanListDto[], ratingTypes: PlanRatingTypesDto[], selectedForProductionId?: number): Row[];
}
