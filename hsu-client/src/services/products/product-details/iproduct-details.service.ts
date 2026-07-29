import {
  IColumnHeader,
  PmDropdownOption,
  Row,
  ITab,
  ITabButton
} from 'hsu-library';
import {
  ProductionStepListDto,
  ProductProducerListDto,
  ProductionStepOverviewDto
} from '../../../shared/service-proxies/service-proxies';
import {
  IProductDetailsAdminLocalisations
} from '../../../app/product-details/product-details-admin/product-details-admin.shared';
import {
  IProductDetailsProducerLocalisations
} from '../../../app/product-details/product-details-producer/product-details-producer.shared';
import { Observable } from 'rxjs';

export abstract class IProductDetailsService {
  public abstract getProducerTableColumnHeaders(): IColumnHeader[];
  public abstract getAdminLocalisationStrings(): IProductDetailsAdminLocalisations;
  public abstract getProducerLocalisationStrings(): IProductDetailsProducerLocalisations;
  public abstract getPaginationOptions(): PmDropdownOption<string>[];
  public abstract getProducerTableRow(producer: ProductProducerListDto, disabledForEdit: boolean): Row
  public abstract getWorkStepTableColumnHeaders(): IColumnHeader[];
  public abstract getWorkStepTableRow(workStep: ProductionStepListDto): Row;
  public abstract getProductionStepList(productionDetailsId: number, sorting: string): Observable<ProductionStepListDto[]>
  public abstract getProductionStep(stepId: number): Observable<ProductionStepOverviewDto>
  public abstract getTabCardTabs(productionDetailsLiveId: number, productionDetailsEditId: number, activeId: number): ITab<number>[]
  public abstract getTabCardButtons(): ITabButton[]
}
