import { Injectable } from '@angular/core';
import { IValueChainPlanningApiService } from './ivalue-chain-planning-api.service';
import {
  IProductionStepCreateOrUpdateDto,
  ProductGraphDataDto,
  ProductGraphServiceProxy,
  ProductionStateType,
  ProductionStepCreateOrUpdateDto,
  ProductionStepForEditOutput,
  ProductionStepServiceProxy,
} from '../../shared/service-proxies/service-proxies';
import { Observable } from 'rxjs';
import { EProductStateType } from 'hsu-library';


@Injectable()
export class ValueChainPlanningApiService extends IValueChainPlanningApiService {

  private stateType: Map<ProductionStateType, EProductStateType>;
  constructor(
    private readonly productGraphService: ProductGraphServiceProxy,
    private readonly productionStepService: ProductionStepServiceProxy,
  ) {
    super();
    this.stateType = this.initStateTypeEnumMap();
  }

  getProductGraphData(productionDetailsId: number): Observable<ProductGraphDataDto> {
    return this.productGraphService.getProductGraphData(productionDetailsId);
  }

  getStateType(stateType:ProductionStateType):EProductStateType{
    return this.stateType.get(stateType) ?? EProductStateType.WorkPieceStart;
  }

  getProductionStepForEdit(productId: number, stepId?: number, startStateId?: number, endStateId?: number): Observable<ProductionStepForEditOutput> {
    return this.productionStepService.getProductionStepForEdit(productId, stepId, startStateId, endStateId);
  }

  createOrUpdateProductionStep(productionStep:IProductionStepCreateOrUpdateDto): Observable<void> {
    return this.productionStepService.createOrUpdateProductionStep(new ProductionStepCreateOrUpdateDto(productionStep));
  }

  deleteProductionStep(stepId: number): Observable<void> {
    return this.productionStepService.deleteProductionStep(stepId);
  }

  private initStateTypeEnumMap(): Map<ProductionStateType, EProductStateType> {
    return new Map<ProductionStateType, EProductStateType>([
      [ProductionStateType.ProductFinal, EProductStateType.ProductFinal],
      [ProductionStateType.WorkPieceFinal, EProductStateType.WorkPieceFinal],
      [ProductionStateType.WorkPieceStart, EProductStateType.WorkPieceStart],
      [ProductionStateType.WorkPieceIntermediate, EProductStateType.WorkPieceIntermediate]
    ]);
  }

}
