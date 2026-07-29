import {
  IProductGraphState,
  IStepMeasurementVariants
} from 'hsu-library';

export interface IStepData {
  stepId: number,
  startState: IProductGraphState,
  endState:IProductGraphState,
  stepMeasurementVariants:IStepMeasurementVariants[]
}
