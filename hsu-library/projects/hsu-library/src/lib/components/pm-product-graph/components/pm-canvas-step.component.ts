import { PmCanvas } from '../pm-canvas.service';
import {
  EProductGraphMode,
  EProductStateType,
  IProductGraphConfig,
  IProductGraphState,
  IProductGraphStep
} from '../pm-product-graph.shared';
import { PmCanvasConnectionAction } from './pm-canvas-connection-action';
import { PmCanvasConnectionButton } from './pm-canvas-connection-button';
import { PmCanvasConnectionInfo } from './pm-canvas-connection-info';
import {
  IPathMeasurements, IPathPos, PmCanvasConnectionComponent
} from './pm-canvas-connection.component';
import { PmCanvasStateComponent } from './pm-canvas-state.component';

export class PmCanvasStepComponent extends PmCanvasConnectionComponent {
  public static override readonly TYPE: string = 'PmCanvasStep';
  public readonly type: string = PmCanvasStepComponent.TYPE;

  constructor(
    canvas: PmCanvas,
    public step: IProductGraphStep,
    protected tooltip: string,
    config: IProductGraphConfig,
    protected mode: EProductGraphMode,
    protected producerId: number | null
  ) {
    super(canvas, config);

    switch (mode) {
    case EProductGraphMode.ADMIN:
    case EProductGraphMode.EDIT:
      this.buttons = this.getEditModeButtons();
      break;
    case EProductGraphMode.VIEW:
    default:
      this.buttons = this.getViewModeButtons();
      break;
    }
  }

  protected getEditModeButtons(): PmCanvasConnectionAction[] {
    const { canvas, config } = this;

    const buttons: PmCanvasConnectionAction[] = [];

    if (this.canAddNewStates(this.step)) {
      buttons.push(new PmCanvasConnectionButton(
        canvas,
        config,
        config.step.icons.add
      ).addClickListener(this.onAddClick.bind(this)));
    }

    if (this.step.producerId === this.producerId) {
      buttons.push(new PmCanvasConnectionButton(
        canvas,
        config,
        config.step.icons.edit
      ).addClickListener(this.onEditClick.bind(this)));
    }

    return buttons;
  }

  protected getViewModeButtons(): PmCanvasConnectionAction[] {
    const { canvas, config, step, tooltip } = this;

    if (this.mode !== EProductGraphMode.ADMIN && this.step.producerId !== this.producerId) {
      return [];
    }

    return [
      new PmCanvasConnectionInfo(
        canvas,
        config,
        step,
        tooltip,
        this.posX,
        this.posY
      )
    ];
  }

  protected onAddClick(): void {
    const stateComp: PmCanvasStateComponent | null = this.getStartState();
    if (!stateComp) {
      return;
    }

    this.dispatchEvent<IProductGraphState>('addState', stateComp.state);
  }

  protected onEditClick(): void {
    this.dispatchEvent<IProductGraphStep>('editStep', this.step);
  }

  public override update(): void {
    super.update();

    const actionPosition: IPathPos = this.getActionPosition();

    let offset: number = 0;
    this.buttons.forEach((button: PmCanvasConnectionAction): void => {
      const buttonMeasurements: IPathMeasurements = button.measurePath();
      button.setPosition(actionPosition.posX, actionPosition.posY + offset);
      offset += buttonMeasurements.height + this.config.step.button.spacing;
    });
  }

  public override preRender(): void {
    if (!this._state.hover) {
      this.renderStep();
    }

    super.preRender();
  }

  public override render(): void {
    if (this._state.hover) {
      this.renderStep();
    }

    super.render();
  }

  private renderStep(): void {
    if (!this.handleComponentPath()) {
      return;
    }

    const { canvas, config: { step: stepConfig } } = this;
    const strokeColor: string = this.step.producerId === this.producerId ? stepConfig.color.strokeActive : stepConfig.color.strokeInactive;

    canvas.stroke(strokeColor, this._state.hover ? stepConfig.strokeWidthHover : stepConfig.strokeWidth);
  }

  /**
   * Returns the level of the step.
   * Unfortunately, the level calculation function is not as clean as it should be, if anyone has a better idea, feel
   * free to change it.
   * @param startState
   * @param endState
   */
  protected override getLevel(startState: PmCanvasStateComponent, endState: PmCanvasStateComponent): number {
    let level: number = 0,
      maxLevel: number = 0;

    let { stateId } = startState.state;

    if (!stateId) {
      return 0;
    }

    let state: PmCanvasStateComponent | null;
    do {
      state = this.findStateComponent(stateId);
      if (!state) {
        break;
      }

      const steps: PmCanvasStepComponent[] = this.findStepComponentsForState(stateId);
      level += steps.reduce((acc: number, step: PmCanvasStepComponent): number => {
        const isEnd: boolean = step.step.end === stateId;

        if (this.ignoreStateForLevel(step, stateId, startState)) {
          return acc;
        }

        return acc + (isEnd ? -1 : 1);
      }, 0);
      maxLevel = Math.max(maxLevel, level);
      stateId = state.state.nextId ?? 0;
    } while (stateId && state.state.stateId !== endState.state.stateId);

    return maxLevel - 1;
  }

  private ignoreStateForLevel(step: PmCanvasStepComponent, stateId: number, startState: PmCanvasStateComponent): boolean {
    const isEnd: boolean = step.step.end === stateId;
    const isStartState: boolean = startState.state.stateId === stateId;
    if (isEnd && isStartState) {
      return true;
    }

    const currentStepStateCount: number = this.getStepStateCount(step.step);

    // ignore the step if it is the start state and the current stepStateCount is lower than the context stepStateCount.
    // this is to have separate levels for the steps that share the same start state.
    const ignoreState: boolean = isStartState && currentStepStateCount > this.getStepStateCount(this.step);

    return ignoreState || currentStepStateCount <= 1;
  }

  private getStepStateCount(step: IProductGraphStep): number {
    let state: IProductGraphState | null = this.findStateComponent(step.start)?.state ?? null;
    if (!state) {
      return 0;
    }

    let count: number = 0;
    while (state?.nextId && state.stateId !== step.end) {
      count++;
      state = this.findStateComponent(state.nextId)?.state ?? null;
    }

    return count;
  }

  private canAddNewStates(step: IProductGraphStep): boolean {
    const stateComp: PmCanvasStateComponent | null = this.findStateComponent(step.start);
    if (!stateComp) {
      return false;
    }

    return stateComp?.state.nextId === step.end && stateComp.state.type !== EProductStateType.WorkPieceFinal;
  }

  protected getStartState(): PmCanvasStateComponent | null {
    return this.findStateComponent(this.step.start);
  }

  protected getEndState(): PmCanvasStateComponent | null {
    return this.findStateComponent(this.step.end);
  }

  private findStepComponentsForState(stateId: number): PmCanvasStepComponent[] {
    return this.filterForComponentType<PmCanvasStepComponent>(this.canvas.getComponents(), PmCanvasStepComponent.TYPE)
      .filter((comp: PmCanvasStepComponent): boolean => comp.step.start === stateId || comp.step.end === stateId) ?? null;
  }

  protected getWorkPieceFinalState(state: PmCanvasStateComponent): PmCanvasStateComponent | null {
    if (state.state.type === EProductStateType.WorkPieceFinal) {
      return state;
    }

    if (!state.state.nextId) {
      return null;
    }

    const nextState: PmCanvasStateComponent | null = this.findStateComponent(state.state.nextId);
    if (!nextState) {
      return null;
    }

    return this.getWorkPieceFinalState(nextState);
  }

  protected override findCurrentBestPath(): IPathPos[][] {
    const startState: PmCanvasStateComponent | null = this.getStartState();
    const endState: PmCanvasStateComponent | null = this.getEndState();

    if (!startState || !endState) {
      return [];
    }

    const paths: IPathPos[][] = this.findBestPath(startState, endState);

    if (endState.state.type === EProductStateType.ProductFinal) {
      const currentWorkPieceFinalState: PmCanvasStateComponent | null = this.getWorkPieceFinalState(startState);

      const finalWorkPieceStates: PmCanvasStateComponent[] = this.filterForComponentType<PmCanvasStateComponent>(this.canvas.getComponents(), PmCanvasStateComponent.TYPE)
        .filter((comp: PmCanvasStateComponent): boolean => comp !== currentWorkPieceFinalState && comp.state.type === EProductStateType.WorkPieceFinal);
      finalWorkPieceStates.forEach((state: PmCanvasStateComponent): void => {
        const subPaths: IPathPos[][] = this.findBestPath(state, endState);
        paths.push(...subPaths);
      });
    }

    return paths;
  }
}
