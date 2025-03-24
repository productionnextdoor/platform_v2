import { PmCanvasConnectionAction } from './pm-canvas-connection-action';
import { PmCanvasConnectionButton } from './pm-canvas-connection-button';
import { PmCanvasStateComponent } from './pm-canvas-state.component';
import { PmCanvasConnectionComponent } from './pm-canvas-connection.component';
import { PmCanvas } from '../pm-canvas.service';
import {
  EProductGraphMode,
  EProductStateType, IProductGraphConfig, IProductGraphState
} from '../pm-product-graph.shared';

export interface IChain {
  start: number;
  end: number;
}

export class PmCanvasChainComponent extends PmCanvasConnectionComponent {
  public static override readonly TYPE: string = 'PmCanvasChain';
  public readonly type: string = PmCanvasChainComponent.TYPE;

  constructor(
    canvas: PmCanvas,
    public chain: IChain,
    config: IProductGraphConfig,
    protected mode: EProductGraphMode
  ) {
    super(canvas, config);

    if (mode === EProductGraphMode.VIEW) {
      return;
    }

    const state: PmCanvasStateComponent | null = this.getStartState();
    if (state && state.state.type !== EProductStateType.WorkPieceFinal) {
      this.buttons = [
        new PmCanvasConnectionButton(
          canvas,
          this.config,
          config.step.icons.add
        ).addClickListener(this.onAddClick.bind(this))
      ];
    }
  }

  protected onAddClick(): void {
    const stateComp: PmCanvasStateComponent | null = this.getStartState();
    if (!stateComp) {
      return;
    }

    this.dispatchEvent<IProductGraphState>('addState', stateComp.state);
  }

  public override update(): void {
    super.update();

    this.buttons.forEach((button: PmCanvasConnectionAction, index: number) => {
      const offset: number = index * (this.config.step.button.size + this.config.step.button.spacing) + this.config.step.button.size / 2;
      button.setPosition(this.posX + this.width / 2, this.posY + offset);
    });
  }

  public override preRender(): void {
    if (!this._state.hover) {
      this.renderStep();
    }
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

    const lineDash: number[] = [stepConfig.dashLength, stepConfig.dashLength];

    canvas.stroke(stepConfig.color.stroke, 2, lineDash);
  }

  protected getStartState(): PmCanvasStateComponent | null {
    return this.findStateComponent(this.chain.start);
  }

  protected getEndState(): PmCanvasStateComponent | null {
    return this.findStateComponent(this.chain.end);
  }
}
