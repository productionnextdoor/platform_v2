import { EHsuIcon } from '../../../utils/constants/icons';
import { PmCanvas } from '../pm-canvas.service';
import { IProductGraphConfig } from '../pm-product-graph.shared';
import { PmCanvasConnectionAction } from './pm-canvas-connection-action';
import { IPathMeasurements } from './pm-canvas-connection.component';

export type TClickFn = (event: MouseEvent) => void;

export class PmCanvasConnectionButton extends PmCanvasConnectionAction {
  constructor(
    canvas: PmCanvas,
    config: IProductGraphConfig,
    protected readonly icon: EHsuIcon,
    posX: number = 0,
    posY: number = 0,
    protected radius: number = 0
  ) {
    super(canvas, config, posX, posY);
  }

  public render(hovered: boolean): void {
    if (!hovered) {
      return;
    }

    const { canvas, config, icon } = this;
    const { step: stepConfig, fonts: { icon: iconFont } } = config;

    this.handlePath();

    if (this.hover) {
      canvas.setCursor('pointer');
    }

    canvas.shadow(this.hover ? stepConfig.color.shadowHover : stepConfig.color.shadow, stepConfig.shadow.blur, stepConfig.shadow.offsetX, stepConfig.shadow.offsetY);
    canvas.fill(this.active ? stepConfig.color.backgroundActive : stepConfig.color.background);

    const textMetrics: TextMetrics = canvas.measureText(icon, iconFont);
    canvas.text(
      this.posX - textMetrics.width / 2,
      this.posY - iconFont.size / 2,
      icon,
      stepConfig.color.text,
      iconFont
    );
  }

  public measurePath(): IPathMeasurements {
    const { config: { step: stepConfig } } = this;

    return {
      posX: this.posX - stepConfig.button.size / 2,
      posY: this.posY - stepConfig.button.size / 2,
      width: stepConfig.button.size,
      height: stepConfig.button.size
    };
  }

  protected handlePath(): void {
    const { canvas, config: { step: stepConfig } } = this;

    canvas.rectangle(
      this.posX - stepConfig.button.size / 2,
      this.posY - stepConfig.button.size / 2,
      stepConfig.button.size,
      stepConfig.button.size,
      stepConfig.button.radius
    );
  }
}
