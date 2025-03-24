import { PmCanvas } from '../pm-canvas.service';
import { IProductGraphConfig, IProductGraphStep } from '../pm-product-graph.shared';
import { PmCanvasConnectionAction } from './pm-canvas-connection-action';
import { IPathMeasurements } from './pm-canvas-connection.component';

export class PmCanvasConnectionInfo extends PmCanvasConnectionAction {
  constructor(
    canvas: PmCanvas,
    config: IProductGraphConfig,
    protected readonly step: IProductGraphStep,
    protected readonly tooltip: string,
    posX: number = 0,
    posY: number = 0
  ) {
    super(canvas, config, posX, posY);

    this.addClickListener((): void => {
      this.dispatchEvent<IProductGraphStep>('infoClick', step);
    });
  }

  public render(): void {
    const { canvas, config } = this;
    const { step: stepConfig} = config;

    this.handlePath();

    canvas.shadow(this.hover ? stepConfig.color.shadowHover : stepConfig.color.shadow, stepConfig.shadow.blur, stepConfig.shadow.offsetX, stepConfig.shadow.offsetY);
    canvas.fill(stepConfig.color.tooltip);

    const { default: infoFont } = config.fonts;
    canvas.text(
      this.posX,
      this.posY - infoFont.size / 2,
      'i',
      stepConfig.color.tooltipIcon,
      infoFont,
      true
    );
  }

  public override postRender(): void {
    if (this.hover) {
      this.canvas.setCursor('pointer');

      if (this.tooltip) {
        this.renderTooltip();
      }
    }
  }

  public measurePath(): IPathMeasurements {
    const { config: { step: stepConfig } } = this;

    const radius: number = stepConfig.info.size / 2;
    return {
      width: stepConfig.info.size,
      height: stepConfig.info.size,
      posX: this.posX - radius,
      posY: this.posY - radius
    };
  }

  protected renderTooltip(): void {
    const { canvas, tooltip, config } = this;
    const { step: stepConfig, fonts: { tooltip: textFont } } = config;

    const textMetrics: TextMetrics = canvas.measureText(tooltip, textFont);

    const tooltipHeight: number = textFont.size + stepConfig.tooltip.padding.vertical * 2
    const tooltipWidth: number = textMetrics.width + stepConfig.tooltip.padding.horizontal * 2;
    let posY: number = this.posY - stepConfig.info.size / 2 - stepConfig.tooltip.spacing - tooltipHeight;

    if (posY < 0) {
      posY = this.posY + stepConfig.info.size / 2 + stepConfig.tooltip.spacing;
    }

    canvas.rectangle(
      this.posX - tooltipWidth / 2,
      posY,
      tooltipWidth,
      tooltipHeight,
      stepConfig.tooltip.radius
    );
    canvas.shadow(stepConfig.color.shadow, stepConfig.shadow.blur, stepConfig.shadow.offsetX, stepConfig.shadow.offsetY);
    canvas.fill(stepConfig.color.background);

    canvas.text(
      this.posX,
      posY + stepConfig.tooltip.padding.vertical,
      tooltip,
      stepConfig.color.text,
      textFont,
      true
    );
  }

  protected handlePath(): void {
    const { canvas} = this;
    const { step: stepConfig } = this.config;

    const radius: number = stepConfig.info.size / 2;
    canvas.circle(
      this.posX,
      this.posY,
      radius
    );
  }
}
