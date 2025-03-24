import { Injectable } from '@angular/core';
import {
  IProductGraphData,
  IProductGraphState,
  IProductGraphStep
} from 'hsu-library';
import { IProductGraphService } from './iproduct-graph.service';
import {
  ProductGraphDataDto,
  ProductionStateDto,
  ProductionStepDto
} from '../../../shared/service-proxies/service-proxies';
import { map, Observable } from 'rxjs';
import { IValueChainPlanningApiService } from '../ivalue-chain-planning-api.service';

@Injectable()
export class ProductGraphService extends IProductGraphService {


  constructor(
    private readonly valueChainPlanningApiService: IValueChainPlanningApiService
  ) {
    super();

  }

  public getProductGraphData(productionDetailsId: number): Observable<IProductGraphData> {
    return this.valueChainPlanningApiService.getProductGraphData(productionDetailsId).pipe(
      map(this.mapProductGraphData.bind(this))
    )
  }

  private mapProductGraphData(result:ProductGraphDataDto):IProductGraphData{
    return {
      states: this.mapProductStates(result.productStates ?? []),
      steps: this.mapProductSteps(result.productSteps ?? []),
    }
  }

  private mapProductStates(productStates:ProductionStateDto[]){
    return  productStates?.map((productState): IProductGraphState => {
      return {
        stateId: productState.stateId,
        label: productState.description ?? '',
        nextId: productState.nextStateId,
        type: this.valueChainPlanningApiService.getStateType(productState.stateType),
        productionDetailsId: productState.productionDetailsId,
      };
    }) ?? []
  }

  private mapProductSteps(productionSteps: ProductionStepDto[]) {
    return productionSteps.map((productStep): IProductGraphStep => {
      return {
        stepId: productStep.stepId,
        start: productStep.startStateId,
        end: productStep.endStateId,
        producerId: productStep.producerId,
        productionDetailsId: productStep.productionDetailsId
      };
    });
  }


}
