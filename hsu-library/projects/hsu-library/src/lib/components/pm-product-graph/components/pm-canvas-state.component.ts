import {
  EButton, IComponentMeasurements, IEventResult, PmCanvasBaseComponent
} from './pm-canvas-base.component';
import { PmCanvas } from '../pm-canvas.service';
import {
  EProductStateType, IProductGraphConfig, IProductGraphState
} from '../pm-product-graph.shared';

export interface IStateConfig {
  padding: {
    vertical: number;
    horizontal: number;
  };
  radius: number;
  icons: {
    left: string;
    right: string;
    finalWorkPiece: string;
  };
  color: {
    background: string;
    text: string;
    active: string;
    hover: string;
    shadow: string;
    shadowHover: string;
  };
  shadow: {
    blur: number;
    offsetX: number;
    offsetY: number;
  };
}

export enum EStateMode {
  NONE,
  VALID_START,
  SELECTED_START,
  VALID_END,
  SELECTED_END
}

const ACTIVE_MODES: EStateMode[] = [ EStateMode.SELECTED_START, EStateMode.SELECTED_END ];
const VISIBLE_MODES: EStateMode[] = [ EStateMode.SELECTED_START, EStateMode.VALID_END, EStateMode.SELECTED_END ];
const HIDE_LEFT_BUTTON_MODES: EStateMode[] = [ EStateMode.NONE, EStateMode.VALID_START, EStateMode.SELECTED_START ];
const HIDE_RIGHT_BUTTON_MODES: EStateMode[] = [ EStateMode.NONE, EStateMode.VALID_END, EStateMode.SELECTED_END ];

export class PmCanvasStateComponent extends PmCanvasBaseComponent {
  public static override readonly TYPE: string = 'PmCanvasState';
  public readonly type: string = PmCanvasStateComponent.TYPE;
  public mode: EStateMode = EStateMode.NONE;

  constructor(
    canvas: PmCanvas,
    public state: IProductGraphState,
    private config: IProductGraphConfig
  ) {
    super(canvas);
  }

  /**
   * Updates the component. This is used to update the width and height of the component.
   */
  public update(): void {
    const { width, height } = this.measure();
    this._width = width;
    this._height = height;
  }

  /**
   * Renders the component on the canvas.
   */
  public render(): void {
    const { canvas, config } = this;
    const { state: stateConfig } = config;
    const { default: textFont, icon: iconFont } = config.fonts;

    const backgroundColor: string = this._state.active || ACTIVE_MODES.includes(this.mode) ? stateConfig.color.active : stateConfig.color.background;
    const shadowColor: string = this._state.hover ? stateConfig.color.shadowHover : stateConfig.color.shadow;
    const iconOffsetY: number = (textFont.size - iconFont.size) / 2;

    this.handleComponentPath();
    canvas.shadow(shadowColor, stateConfig.shadow.blur, stateConfig.shadow.offsetX, stateConfig.shadow.offsetY);
    canvas.fill(backgroundColor);

    // Render Hover Buttons
    this.renderHoverButtons(backgroundColor, shadowColor);

    canvas.text(
      this.posX + stateConfig.padding.horizontal,
      this.posY + stateConfig.padding.vertical,
      this.state.label,
      stateConfig.color.text,
      textFont
    );

    if (this.state.type === EProductStateType.WorkPieceFinal) {
      const iconWidth: number = canvas.measureText(stateConfig.icons.finalWorkPiece, iconFont).width;
      canvas.text(
        this.posX + this.width - iconWidth,
        this.posY + stateConfig.padding.vertical + iconOffsetY,
        stateConfig.icons.finalWorkPiece,
        stateConfig.color.text,
        iconFont,
        true
      );
    }
  }

  /**
   * Renders the hover buttons on the component. This can always render the left and right button since the canvas will
   * clip the rendering to the component.
   * @param backgroundColor
   * @param shadowColor
   */
  private renderHoverButtons(backgroundColor: string, shadowColor: string): void {
    if (!this._state.hover && !VISIBLE_MODES.includes(this.mode)) {
      return;
    }

    const { canvas, config } = this;
    const { state: stateConfig } = config;
    const { default: textFont, icon: iconFont } = config.fonts;
    const iconOffsetY: number = (textFont.size - iconFont.size) / 2;

    if (this._state.hover) {
      canvas.setCursor('pointer');
    }

    canvas.clip();

    canvas.rectangle(this.posX, this.posY, this.width, this.height, 0);
    canvas.shadow(shadowColor, stateConfig.shadow.blur, stateConfig.shadow.offsetX, stateConfig.shadow.offsetY);
    canvas.fill(backgroundColor);

    canvas.text(
      this.posX - this.height/2,
      this.posY + stateConfig.padding.vertical + iconOffsetY,
      stateConfig.icons.left,
      stateConfig.color.text,
      iconFont,
      true
    );

    canvas.text(
      this.posX + this.width + this.height/2,
      this.posY + stateConfig.padding.vertical + iconOffsetY,
      stateConfig.icons.right,
      stateConfig.color.text,
      iconFont,
      true
    );

    canvas.unclip();
  }

  /**
   * Measures the width and height of the component also used for the positioning of the component.
   */
  public measure(): IComponentMeasurements {
    const { canvas, config } = this;
    const { state: stateConfig } = config;
    const { default: textFont, icon: iconFont } = config.fonts;

    let width: number = canvas.measureText(this.state.label, textFont).width + stateConfig.padding.horizontal * 2;
    const height: number = textFont.size + stateConfig.padding.vertical * 2;

    if (this.state.type === EProductStateType.WorkPieceFinal) {
      width += canvas.measureText(stateConfig.icons.finalWorkPiece, iconFont).width;
    }

    return {
      width,
      height
    };
  }

  /**
   * Handles the mouse event on the component.
   * @param event
   * @param preventDefault
   */
  public handleMouseEvent(event: MouseEvent, preventDefault: boolean): IEventResult | null {
    if (preventDefault) {
      this._state.active = false;
      this._state.hover = false;
      return null;
    }

    const { canvas } = this;
    const { mouseX, mouseY } = canvas.getMousePosition(event);

    this.handleComponentPath();
    const isHover: boolean = canvas.isPointInPath(mouseX, mouseY);
    const isActive: boolean = isHover && PmCanvasBaseComponent.isButtonPressed(event, EButton.PRIMARY);

    let forceUpdate: boolean = false;

    if ((isActive !== this._state.active)) {
      this._state.active = isActive;
      forceUpdate = true;

      if (!isActive) {
        this.handleClick(event);
      }
    }

    if ((isHover !== this._state.hover)) {
      this._state.hover = isHover;
      forceUpdate = true;
    }

    return {
      preventDefault: isHover,
      forceUpdate
    };
  }

  /**
   * Handles the path of the component.
   * The path is different depending on the state of the component. This will return the most outer path of the component.
   *
   * Do not mistake this with the width and height of the component. The path is the actual shape of the component,
   * while the width and height define the bounding box of the component.
   */
  // eslint-disable-next-line complexity -- This function is complex by nature
  protected handleComponentPath(): void {
    const hideLeftButton: boolean = this.state.type === EProductStateType.WorkPieceStart || HIDE_LEFT_BUTTON_MODES.includes(this.mode);
    const hideRightButton: boolean = !this.state.nextId || HIDE_RIGHT_BUTTON_MODES.includes(this.mode);

    const { canvas } = this;
    const { state: stateConfig } = this.config;

    if (!(this._state.hover || VISIBLE_MODES.includes(this.mode)) || (hideLeftButton && hideRightButton)) {
      canvas.rectangle(
        this.posX,
        this.posY,
        this.width,
        this.height,
        this.state.type === EProductStateType.WorkPieceStart ? stateConfig.radius : 0,
        this.state.type === EProductStateType.ProductFinal ? stateConfig.radius : 0
      );
      return;
    }

    if (hideLeftButton) {
      canvas.rectangle(this.posX, this.posY, this.width + this.height, this.height, stateConfig.radius);
      return;
    }

    if (hideRightButton) {
      canvas.rectangle(this.posX - this.height, this.posY, this.width + this.height, this.height, stateConfig.radius);
      return;
    }

    canvas.rectangle(this.posX - this.height, this.posY, this.width + 2 * this.height, this.height, stateConfig.radius);
  }

  /**
   * Handles the click event on the component.
   * @param event
   */
  private handleClick(event: MouseEvent): void {
    const { canvas, state } = this;
    const { mouseX, mouseY } = canvas.getMousePosition(event);

    canvas.rectangle(this.posX, this.posY, this.width, this.height, 0);
    const isBaseHover: boolean = canvas.isPointInPath(mouseX, mouseY)

    if (isBaseHover) {
      this.dispatchEvent<IProductGraphState>('stateClick', state);
      return;
    }

    const { state: stateConfig } = this.config;

    if (mouseX < this.posX + stateConfig.radius) {
      this.dispatchEvent<IProductGraphState>('stateLeftClick', state);
      return;
    }

    this.dispatchEvent<IProductGraphState>('stateRightClick', state);
  }
}
