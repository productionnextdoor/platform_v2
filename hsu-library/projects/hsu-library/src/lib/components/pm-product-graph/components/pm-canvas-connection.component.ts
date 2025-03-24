import { EHsuIcon } from '../../../utils/constants/icons';
import { PmCanvas } from '../pm-canvas.service';
import {
  EProductStateType, IProductGraphConfig
} from '../pm-product-graph.shared';
import {
  EButton, IComponentMeasurements, IComponentState, IEventResult, PmCanvasBaseComponent
} from './pm-canvas-base.component';
import { PmCanvasConnectionAction } from './pm-canvas-connection-action';
import { PmCanvasStateComponent } from './pm-canvas-state.component';

export interface IStepConfig {
  color: {
    text: string;
    stroke: string;
    strokeActive: string;
    strokeInactive: string;
    background: string;
    backgroundActive: string;
    shadow: string;
    shadowHover: string;
    tooltip: string;
    tooltipIcon: string;
  };
  dashLength: number;
  strokeWidth: number;
  strokeWidthHover: number;
  mouseStrokeWidth: number;
  componentSpacing: {
    vertical: number;
    horizontal: number;
  };
  button: {
    size: number;
    spacing: number;
    radius: number;
  };
  info: {
    size: number;
  };
  tooltip: {
    radius: number;
    spacing: number;
    padding: {
      vertical: number;
      horizontal: number;
    };
  };
  shadow: {
    blur: number;
    offsetX: number;
    offsetY: number;
  };
  icons: {
    add: EHsuIcon;
    edit: EHsuIcon;
    info: EHsuIcon;
  }
}

enum EStepAnchor {
  TOP,
  BOTTOM,
  LEFT,
  RIGHT
}

interface IStepPos {
  anchor: EStepAnchor;
  posX: number;
  posY: number;
}

export interface IPathPos {
  posX: number;
  posY: number;
}

export interface IPathMeasurements extends IComponentMeasurements, IPathPos {}

export interface IConnectionComponentState extends IComponentState {
  buttonHover: boolean;
}

const CONNECTION_ACTIONS_PATH_OFFSET: number = -2;

export abstract class PmCanvasConnectionComponent extends PmCanvasBaseComponent {
  protected override _state: IConnectionComponentState = {
    hover: false,
    active: false,
    buttonHover: false,
  };

  protected buttons: PmCanvasConnectionAction[] = [];
  public buttonsX: number = 0;
  public buttonsY: number = 0;

  protected constructor(
    canvas: PmCanvas,
    protected config: IProductGraphConfig
  ) {
    super(canvas);
  }
  protected abstract getStartState(): PmCanvasStateComponent | null;
  protected abstract getEndState(): PmCanvasStateComponent | null;

  /**
   * Updates the component. This is used to update the width and height of the component.
   */
  public update(): void {
    const measurements: IPathMeasurements | null = this.measurePath();

    this.posX = measurements?.posX ?? 0;
    this.posY = measurements?.posY ?? 0;
    this._width = measurements?.width ?? 0;
    this._height = measurements?.height ?? 0;
  }

  /**
   * Renders the component on the canvas.
   */
  public render(): void {
    const hovered: boolean = this._state.hover || !this.buttons.every((button: PmCanvasConnectionAction) => !button.hover);
    this.buttons.forEach((button: PmCanvasConnectionAction): void => button.render(hovered));
  }

  /**
   * Renders the component on the canvas.
   */
  public override postRender(): void {
    super.postRender();

    const hovered: boolean = this._state.hover || !this.buttons.every((button: PmCanvasConnectionAction) => !button.hover);
    this.buttons.forEach((button: PmCanvasConnectionAction): void => button.postRender(hovered));
  }

  /**
   * Measures the width and height of the component also used for the positioning of the component.
   */
  public measure(): IComponentMeasurements {
    const measurements: IPathMeasurements | null = this.measurePath();

    return {
      width: measurements?.width ?? 0,
      height: measurements?.height ?? 0
    };
  }

  protected measurePath(): IPathMeasurements | null {
    const paths: IPathPos[][] = this.findCurrentBestPath();
    if (paths.length === 0) {
      return null;
    }

    const mainPath: IPathPos[] = paths[0];
    const firstWaypoint: IPathPos = mainPath[0];
    let minX: number = firstWaypoint.posX,
      minY: number = firstWaypoint.posY,
      maxX: number = minX,
      maxY: number = minY;

    paths.forEach((path: IPathPos[]): void => {
      path.forEach((waypoint: IPathPos): void => {
        minX = Math.min(minX, waypoint.posX);
        minY = Math.min(minY, waypoint.posY);
        maxX = Math.max(maxX, waypoint.posX);
        maxY = Math.max(maxY, waypoint.posY);
      });
    });

    const buttonsPaths: IPathPos[] = mainPath.slice(CONNECTION_ACTIONS_PATH_OFFSET);
    this.buttonsX = (buttonsPaths[0].posX + buttonsPaths[1].posX) / 2;
    this.buttonsY = (buttonsPaths[0].posY + buttonsPaths[1].posY) / 2;

    const { step: stepConfig } = this.config;

    let buttonHeight: number = Math.max(this.buttons.length - 1, 0) * stepConfig.button.spacing;
    this.buttons.forEach((button: PmCanvasConnectionAction): void => {
      buttonHeight += button.measurePath().height;
    });

    return {
      posX: minX - stepConfig.strokeWidth / 2,
      posY: minY - (stepConfig.strokeWidth + buttonHeight) / 2,
      width: maxX - minX + stepConfig.strokeWidth,
      height: Math.max(maxY - minY + stepConfig.strokeWidth + buttonHeight / 2, buttonHeight)
    };
  }

  // eslint-disable-next-line complexity -- higher complexity due to fallbacks at the return statement
  public handleMouseEvent(event: MouseEvent, preventDefault: boolean): IEventResult | null {
    const buttonResult: IEventResult | null = this.handleButtonMouseEvents(event, preventDefault);

    if (preventDefault) {
      this._state.active = false;
      this._state.hover = false;
      this._state.buttonHover = false;
      return null;
    }

    const { canvas, config: { step: stepConfig } } = this;
    const { mouseX, mouseY } = canvas.getMousePosition(event);

    this.handleComponentPath();
    canvas.stroke('transparent', stepConfig.mouseStrokeWidth);
    const isButtonHover: boolean = !this.buttons.every((button: PmCanvasConnectionAction) => !button.hover);
    const isHover: boolean = isButtonHover || canvas.isPointInStroke(mouseX, mouseY)
    const isActive: boolean = isHover && PmCanvasBaseComponent.isButtonPressed(event, EButton.PRIMARY);

    const forceUpdate: boolean = isHover !== this._state.hover || isActive !== this._state.active || isButtonHover !== this._state.buttonHover;

    this._state.hover = isHover;
    this._state.active = isActive;
    this._state.buttonHover = isButtonHover;

    return {
      preventDefault: buttonResult?.preventDefault || isHover,
      forceUpdate: buttonResult?.forceUpdate || forceUpdate
    };
  }

  /**
   * Handles the mouse events on the buttons.
   * @param event
   * @param preventDefault
   */
  protected handleButtonMouseEvents(event: MouseEvent, preventDefault: boolean): IEventResult | null {
    if (preventDefault) {
      this.buttons.forEach((button: PmCanvasConnectionAction): void => button.reset());
      return null;
    }

    return this.buttons.reduce(
      (acc: IEventResult | null, button: PmCanvasConnectionAction): IEventResult => {
        const res: IEventResult | null = button.handleMouseEvent(event);
        return {
          preventDefault: acc?.preventDefault || res?.preventDefault,
          forceUpdate: acc?.preventDefault || res?.forceUpdate
        };
      },
      null
    );
  }

  /**
   * Handles the path of the component.
   */
  protected handleComponentPath(): boolean {
    const paths: IPathPos[][] = this.findCurrentBestPath();
    if (paths.length === 0) {
      return false;
    }

    const { canvas: { context } } = this;

    context.beginPath();
    paths.forEach((path: IPathPos[]): void => {
      path.forEach((waypoint: IPathPos, index: number): void => {
        if (index === 0) {
          context.moveTo(waypoint.posX, waypoint.posY);
          return;
        }
        context.lineTo(waypoint.posX, waypoint.posY);
      });
    });

    return true;
  }

  protected findCurrentBestPath(): IPathPos[][] {
    const startState: PmCanvasStateComponent | null = this.getStartState();
    const endState: PmCanvasStateComponent | null = this.getEndState();

    if (!startState || !endState) {
      return [];
    }

    return this.findBestPath(startState, endState);
  }

  /**
   * Finds the best path between the start and end state.
   */
  // eslint-disable-next-line complexity -- Don't stop me now, I'm having such a good time
  protected findBestPath(startState: PmCanvasStateComponent, endState: PmCanvasStateComponent): IPathPos[][] {
    const { componentSpacing } = this.config.step;
    const { anchor: startAnchor, posX: startX, posY: startY } = this.getStartPos(startState, endState);
    const { anchor: endAnchor, posX: endX, posY: endY } = this.getEndPos(startState, endState);

    const level: number = this.getLevel(startState, endState) + 1;
    const pathStartX: number = startAnchor === EStepAnchor.RIGHT ? startX + componentSpacing.horizontal : startX;
    const pathStartY: number = startAnchor === EStepAnchor.TOP ? startY - level * componentSpacing.vertical : startY;
    const pathEndX: number = endAnchor === EStepAnchor.LEFT ? endX - componentSpacing.horizontal : endX;
    const pathEndY: number = endAnchor === EStepAnchor.TOP ? endY - level * componentSpacing.vertical : endY;

    return [
      [
        {
          posX: endX,
          posY: endY
        }, {
          posX: pathEndX,
          posY: pathEndY
        }, {
          posX: pathEndX,
          posY: pathStartY
        },{
          posX: pathStartX,
          posY: pathStartY
        }, {
          posX: startX,
          posY: startY
        }
      ]
    ];
  }

  /**
   * Returns the position of the action.
   */
  // eslint-disable-next-line complexity -- Splitting the function would make it less readable
  protected getActionPosition(): IPathPos {
    const startState: PmCanvasStateComponent | null = this.getStartState();
    const endState: PmCanvasStateComponent | null = this.getEndState();

    if (!startState || !endState) {
      return {
        posX: 0,
        posY: 0
      };
    }

    const { componentSpacing } = this.config.step;
    const { anchor: startAnchor, posX: startX, posY: startY } = this.getStartPos(startState, endState);

    const level: number = this.getLevel(startState, endState) + 1;
    const pathStartX: number = startAnchor === EStepAnchor.RIGHT ? startX + componentSpacing.horizontal : startX;
    const pathStartY: number = startAnchor === EStepAnchor.TOP ? startY - level * componentSpacing.vertical : startY;

    if (startState.state.type === EProductStateType.WorkPieceFinal) {
      return {
        posX: (pathStartX + startX) / 2,
        posY: (pathStartY + startY) / 2
      };
    }

    const { anchor: endAnchor, posX: endX } = this.getEndPos(startState, endState);
    const pathEndX: number = endAnchor === EStepAnchor.LEFT ? endX - componentSpacing.horizontal : endX;

    return {
      posX: (pathEndX + pathStartX) / 2,
      posY: pathStartY,
    };
  }

  /**
   * Returns the level of the connection. This is used to calculate the vertical spacing between the connections.
   * @param startState
   * @param endState
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- This function can be overridden by the child class
  protected getLevel(startState: PmCanvasStateComponent, endState: PmCanvasStateComponent): number {
    return 0;
  }

  /**
   * Returns the start position of the connection.
   * @param startState
   * @param endState
   */
  protected getStartPos(startState: PmCanvasStateComponent, endState: PmCanvasStateComponent): IStepPos {
    if (startState.state.nextId === endState.state.stateId) {
      return {
        anchor: EStepAnchor.RIGHT,
        posX: startState.posX + startState.width,
        posY: startState.posY + startState.height / 2
      };
    }

    return {
      anchor: EStepAnchor.TOP,
      posX: startState.posX + startState.width / 2,
      posY: startState.posY
    };
  }

  /**
   * Returns the end position of the connection.
   * @param startState
   * @param endState
   */
  protected getEndPos(startState: PmCanvasStateComponent, endState: PmCanvasStateComponent): IStepPos {
    if (endState.state.type === EProductStateType.ProductFinal || startState.state.nextId === endState.state.stateId) {
      return {
        anchor: EStepAnchor.LEFT,
        posX: endState.posX,
        posY: endState.posY + endState.height / 2
      };
    }

    return {
      anchor: EStepAnchor.TOP,
      posX: endState.posX + endState.width / 2,
      posY: endState.posY
    };
  }

  /**
   * Returns the state component for the given stateId.
   * @param components
   * @param type
   */
  protected filterForComponentType<T extends PmCanvasBaseComponent>(components: PmCanvasBaseComponent[], type: string): T[] {
    return components.filter((comp: PmCanvasBaseComponent): boolean => comp.type === type) as T[];
  }

  /**
   * Returns the state with the given id.
   * @param stateId
   */
  protected findStateComponent(stateId: number): PmCanvasStateComponent | null {
    return this.filterForComponentType<PmCanvasStateComponent>(this.canvas.getComponents(), PmCanvasStateComponent.TYPE)
      .find((comp: PmCanvasStateComponent): boolean => comp.state.stateId === stateId) ?? null;
  }
}
