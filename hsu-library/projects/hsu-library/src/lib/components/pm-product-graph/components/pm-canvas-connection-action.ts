import {
  EButton, IEventResult, PmCanvasBaseComponent
} from './pm-canvas-base.component';
import { PmCanvas } from '../pm-canvas.service';
import { IProductGraphConfig } from '../pm-product-graph.shared';
import { IPathMeasurements } from './pm-canvas-connection.component';

export type TClickFn = (event: MouseEvent) => void;

export abstract class PmCanvasConnectionAction {
  private _hover: boolean = false;
  private _active: boolean = false;
  protected clickListeners: TClickFn[] = [];

  protected constructor(
    protected readonly canvas: PmCanvas,
    protected config: IProductGraphConfig,
    protected posX: number = 0,
    protected posY: number = 0
  ) {}


  get hover(): boolean {
    return this._hover;
  }

  protected set hover(value: boolean) {
    this._hover = value;
  }

  get active(): boolean {
    return this._active;
  }

  protected set active(value: boolean) {
    this._active = value;
  }

  public abstract render(hovered: boolean): void;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- default class function
  public postRender(hovered: boolean): void {
    // silent is golden
  }
  public abstract measurePath(): IPathMeasurements;

  protected abstract handlePath(): void;

  public reset(): void {
    this.hover = false;
    this.active = false;
  }

  public handleMouseEvent(event: MouseEvent): IEventResult | null {
    const { canvas } = this;
    const { mouseX, mouseY } = canvas.getMousePosition(event);

    this.handlePath();

    const isHover: boolean = canvas.isPointInPath(mouseX, mouseY);
    const isActive: boolean = isHover && PmCanvasBaseComponent.isButtonPressed(event, EButton.PRIMARY);

    let forceUpdate: boolean = false;

    if ((isActive !== this.active)) {
      this.active = isActive;
      forceUpdate = true;

      if (!isActive) {
        this.clickListeners.forEach((listener: TClickFn): void => listener(event));
      }
    }

    if ((isHover !== this.hover)) {
      this.hover = isHover;
      forceUpdate = true;
    }

    return {
      preventDefault: isHover,
      forceUpdate
    };
  }

  public setPosition(posX: number, posY: number): void {
    this.posX = posX;
    this.posY = posY;
  }

  public addClickListener(listener: TClickFn): this {
    this.clickListeners.push(listener);
    return this;
  }

  protected dispatchEvent<T>(type: string, eventData?: T): boolean {
    const event: CustomEvent<T> = new CustomEvent<T>(type, {
      detail: eventData
    });
    return this.canvas.element.dispatchEvent(event);
  }
}
