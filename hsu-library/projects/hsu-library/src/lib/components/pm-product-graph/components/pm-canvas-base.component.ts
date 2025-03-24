import { PmCanvas } from '../pm-canvas.service';

export enum EButton {
  PRIMARY,
  SECONDARY,
  AUXILIARY
}

export interface IEventResult {
  /**
   * If true, the event will be stopped from propagating.
   */
  preventDefault?: boolean;

  /**
   * If true, the canvas will be forced to update and re-render the next frame.
   */
  forceUpdate?: boolean;
}

export interface IMousePosition {
  mouseX: number;
  mouseY: number;
}

export interface IComponentState {
  hover: boolean;
  active: boolean;
}

export interface IComponentMeasurements {
  width: number;
  height: number
}

export abstract class PmCanvasBaseComponent {

  protected _width: number = 0;
  protected _height: number = 0;
  protected _state: IComponentState = {
    hover: false,
    active: false
  };

  public static readonly TYPE: string;
  public abstract readonly type: string;

  protected constructor(
    protected readonly canvas: PmCanvas,
    public posX: number = 0,
    public posY: number = 0
  ) {}

  public get width(): number {
    return this._width;
  }

  protected set width(width: number) {
    this._width = width;
  }

  public get height(): number {
    return this._height;
  }

  protected set height(height: number) {
    this._height = height;
  }

  public abstract update(): void;
  public abstract render(): void;
  public preRender(): void {
    // Do nothing
  }
  public postRender(): void {
    // Do nothing

    // Uncomment the following lines to debug the bounding boxes of the components on hover
    // if (this._state.hover) {
    //   this.canvas.rectangle(this.posX, this.posY, this.width, this.height);
    //   this.canvas.stroke('#029cfd', 2);
    // }
  }

  public abstract measure(): IComponentMeasurements;
  public abstract handleMouseEvent(event: MouseEvent, preventDefault: boolean): IEventResult | null;

  protected dispatchEvent<T>(type: string, eventData?: T): boolean {
    const event: CustomEvent<T> = new CustomEvent<T>(type, {
      detail: eventData
    });
    return this.canvas.element.dispatchEvent(event);
  }

  public static isButtonPressed(event: MouseEvent, button: EButton): boolean {
    return (event.buttons & 1 << button) > 0;
  }
}
