import { IComponentMeasurements, PmCanvasBaseComponent } from './components/pm-canvas-base.component';
import { PmCanvasStateComponent } from './components/pm-canvas-state.component';
import { PmCanvasStepComponent } from './components/pm-canvas-step.component';
import {
  EProductStateType, IProductGraphConfig, IProductGraphData, IProductGraphState
} from './pm-product-graph.shared';

type TStateGridItem = IProductGraphState|null;
type TStateGridRow = TStateGridItem[];
type TStateGrid = TStateGridRow[];

export interface IGridConfig {
  /** The padding on the x-axis. */
  paddingX: number;

  /** The padding on the y-axis. */
  paddingY: number;

  /** The spacing between the states on the x-axis. */
  spacingX: number;

  /** The spacing between the states on the y-axis. */
  spacingY: number;
}

interface IGridDimensions {
  rowDimensions: number[];
  columnDimensions: number[];
}

export interface IGridSize {
  width: number;
  height: number;
}

export class PmProductGraphService {
  /**
   * Positions the components on the canvas.
   * @param graphData  The graph data.
   * @param components All components that are on the canvas.
   * @param config     The product graph configuration.
   */
  public static positionComponentsOnCanvas(graphData: IProductGraphData, components: PmCanvasBaseComponent[], config: IProductGraphConfig): void {
    const grid: TStateGrid = this.createStateGrid(graphData.states);
    const dimensions: IGridDimensions = this.calculateGridDimensions(grid, components, config);
    this.positionWorkPieces(grid, dimensions, components, config.grid);
    this.positionFinalProduct(graphData.states, dimensions, components, config.grid);
  }

  /**
   * Positions the work pieces on the canvas.
   * @param grid           The grid representation of the states.
   * @param gridDimensions The dimensions of the grid.
   * @param components     All components that are on the canvas.
   * @param config         The grid configuration.
   */
  private static positionWorkPieces(grid: TStateGrid, gridDimensions: IGridDimensions, components: PmCanvasBaseComponent[], config: IGridConfig): void {
    let posY: number = 0;

    grid.forEach((row: TStateGridRow, rowIndex: number): void => {
      const rowHeight: number = gridDimensions.rowDimensions[rowIndex];
      let posX: number = 0;

      row.forEach((state: TStateGridItem, colIndex: number): void => {
        if (state !== null) {
          const component: PmCanvasStateComponent | undefined = components.find((comp: PmCanvasBaseComponent) =>
            comp.type === 'PmCanvasState' && (comp as PmCanvasStateComponent).state.stateId === state.stateId
          ) as PmCanvasStateComponent;

          if (component) {
            component.posX = posX;
            component.posY = posY + rowHeight - component.height;
          }
        }

        posX += gridDimensions.columnDimensions[colIndex] + config.spacingX;
      });

      posY += rowHeight + config.spacingY;
    });
  }

  /**
   * Positions the final product state on the canvas.
   * @param states         All states.
   * @param gridDimensions The dimensions of the grid.
   * @param components     All components that are on the canvas.
   * @param config         The grid configuration.
   */
  private static positionFinalProduct(states: IProductGraphState[], gridDimensions: IGridDimensions, components: PmCanvasBaseComponent[], config: IGridConfig): void {
    const canvasSize: IGridSize = {
      width: gridDimensions.columnDimensions.reduce((acc: number, cur: number) => acc + cur, 0)
        + config.spacingX * (gridDimensions.columnDimensions.length - 1),
      height: gridDimensions.rowDimensions.reduce((acc: number, cur: number) => acc + cur, 0)
        + config.spacingY * (gridDimensions.rowDimensions.length - 1)
    };

    const finalProductState: IProductGraphState | undefined = states.find(
      (state: IProductGraphState): boolean => state.type === EProductStateType.ProductFinal
    );

    if (!finalProductState) {
      return;
    }

    const component: PmCanvasStateComponent | null = this.findStateComponent(components, finalProductState.stateId);
    if (!component) {
      return;
    }

    const measurements: IComponentMeasurements = component.measure();
    const finalX: number = canvasSize.width + config.spacingX;
    const finalY: number = (canvasSize.height - measurements.height) / 2;

    component.posX = finalX;
    component.posY = finalY;
  }

  /**
   * Creates a grid of states that can be used to position the states on the canvas in a grid-like fashion.
   * @param states All states.
   */
  private static createStateGrid(states: IProductGraphState[]): TStateGrid {
    const workPieceStartStates: IProductGraphState[] = states
      .filter((state: IProductGraphState) => state.type === EProductStateType.WorkPieceStart)
      .sort((first: IProductGraphState, second: IProductGraphState) => first.stateId - second.stateId);

    const grid: TStateGrid = [];
    workPieceStartStates.forEach((state: IProductGraphState): void => {
      const gridRow: TStateGridRow = [ state ];

      let currentState: TStateGridItem = state;
      while (currentState.nextId !== null && currentState.type !== EProductStateType.WorkPieceFinal) {
        const nextState: TStateGridItem = this.getStateById(states, currentState.nextId);
        if (!nextState) {
          break;
        }

        gridRow.push(nextState);
        currentState = nextState;
      }

      grid.push(gridRow);
    });

    // add `null` after the first element of each row until each row has the same length
    const maxLength: number = Math.max(...grid.map(row => row.length));
    grid.forEach((row: TStateGridRow): void => {
      while (row.length < maxLength) {
        row.splice(1, 0, null);
      }
    });

    return grid;
  }

  /**
   * Calculates the dimensions of the grid.
   * @param grid       The grid representation of the states.
   * @param components All components that are on the canvas.
   * @param config     The product graph configuration.
   */
  private static calculateGridDimensions(grid: TStateGrid, components: PmCanvasBaseComponent[], config: IProductGraphConfig): IGridDimensions {
    const rowDimensions: number[] = [];
    const columnDimensions: number[] = [];

    grid.forEach((row: TStateGridRow, rowIndex: number): void => {
      let maxSteps: number = 0,
        currentSteps: number = 0;

      row.forEach((state: TStateGridItem, colIndex: number): void => {
        if (state === null) {
          return;
        }

        if (!rowDimensions[rowIndex]) rowDimensions[rowIndex] = 0;
        if (!columnDimensions[colIndex]) columnDimensions[colIndex] = 0;

        const component: PmCanvasStateComponent | null = this.findStateComponent(components, state.stateId);
        if (!component) {
          return;
        }

        const measurements: IComponentMeasurements = component.measure();
        currentSteps += this.getStepOffset(components, state);
        maxSteps = Math.max(maxSteps, currentSteps);
        rowDimensions[rowIndex] = Math.max(rowDimensions[rowIndex], measurements.height);
        columnDimensions[colIndex] = Math.max(columnDimensions[colIndex], measurements.width);
      });

      rowDimensions[rowIndex] += maxSteps * config.step.componentSpacing.vertical;
    });

    return {
      rowDimensions,
      columnDimensions
    };
  }

  /**
   * Returns the offset of steps for the given state. The offset is a number that represents the number of steps that
   * are starting or ending at the given state. A positive number like 2 does not automatically mean that there are 2
   * steps starting at the state. It could also mean that there are 3 steps starting and 1 step ending at the state.
   * So the offset is basically the difference in active steps between the current state and the previous state.
   * @param components
   * @param state
   */
  private static getStepOffset(components: PmCanvasBaseComponent[], state: IProductGraphState): number {
    const steps: PmCanvasStepComponent[] = this.findStepComponentsByState(components, state.stateId);
    const prevStateId: number | null = this.findStateComponentByNextId(components, state.stateId)?.state.stateId ?? null;

    let currentSteps: number = 0;
    steps.forEach((step: PmCanvasStepComponent): void => {
      if (step.step.start === state.stateId) {
        if (step.step.end !== state.nextId) {
          currentSteps++;
        }
        return;
      }

      if (step.step.start !== prevStateId) {
        currentSteps--;
      }
    });

    return currentSteps;
  }

  /**
   * Returns the state with the given id.
   * @param states  All states.
   * @param stateId The id of the state to find.
   */
  private static getStateById(states: IProductGraphState[], stateId: number): IProductGraphState | null {
    return states.find((state: IProductGraphState): boolean => state.stateId === stateId) ?? null;
  }

  /**
   * Returns the component with the given state id.
   * @param components All components that are on the canvas.
   * @param stateId    The state id to find the component for.
   */
  private static findStateComponent(components: PmCanvasBaseComponent[], stateId: number): PmCanvasStateComponent | null {
    const component: PmCanvasBaseComponent | undefined = components.find((comp: PmCanvasBaseComponent) =>
      comp.type === PmCanvasStateComponent.TYPE && (comp as PmCanvasStateComponent).state.stateId === stateId
    );
    return component as PmCanvasStateComponent | null;
  }

  /**
   * Returns the component with the given state id.
   * @param components All components that are on the canvas.
   * @param nextId     The next state id to find the component for.
   */
  private static findStateComponentByNextId(components: PmCanvasBaseComponent[], nextId: number): PmCanvasStateComponent | null {
    const component: PmCanvasBaseComponent | undefined = components.find((comp: PmCanvasBaseComponent) =>
      comp.type === PmCanvasStateComponent.TYPE && (comp as PmCanvasStateComponent).state.nextId === nextId
    );
    return component as PmCanvasStateComponent | null;
  }

  private static findStepComponentsByState(components: PmCanvasBaseComponent[], stateId: number): PmCanvasStepComponent[] {
    const component: PmCanvasBaseComponent[] = components.filter((comp: PmCanvasBaseComponent): boolean => {
      if (comp.type !== PmCanvasStepComponent.TYPE) {
        return false;
      }

      const step: PmCanvasStepComponent = (comp as PmCanvasStepComponent);
      return step.step.start === stateId || step.step.end === stateId;
    });
    return component as PmCanvasStepComponent[];
  }
}
