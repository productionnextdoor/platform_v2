import { IStateConfig } from './components/pm-canvas-state.component';
import { IStepConfig } from './components/pm-canvas-connection.component';
import { ICanvasFont } from './pm-canvas.service';
import { IGridConfig } from './pm-product-graph.service';

export enum EProductStateType {
  WorkPieceStart = 1,
  WorkPieceIntermediate,
  WorkPieceFinal,
  ProductFinal
}

export enum EProductGraphMode {
  VIEW = 'VIEW',
  EDIT = 'EDIT',
  ADMIN = 'ADMIN'
}

export interface IProductGraphState {
  stateId: number;
  label: string;
  nextId: number | null;
  type: EProductStateType;
  productionDetailsId: number;
}

export interface IProductGraphStep {
  stepId: number;
  start: number;
  end: number;
  producerId: number;
  productionDetailsId: number;
}

export interface IProductGraphData {
  states: IProductGraphState[];
  steps: IProductGraphStep[];
}

export interface IProductGraphProducer {
  producerId: number;
  name: string;
}

export interface IProductGraphNewStepArgs {
  start: IProductGraphState;
  end: IProductGraphState;
}

export interface IProductGraphConfig {
  fonts: {
    default: ICanvasFont;
    tooltip: ICanvasFont;
    icon: ICanvasFont;
  }
  grid: IGridConfig;
  state: IStateConfig;
  step: IStepConfig;
}
