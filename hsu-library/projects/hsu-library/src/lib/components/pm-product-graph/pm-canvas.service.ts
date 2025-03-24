import { IMousePosition, PmCanvasBaseComponent } from './components/pm-canvas-base.component';

export interface ICanvasFont {
  family: string;
  size: number;
  style: string;
}

/** Default font for the canvas. */
const DEFAULT_FONT: string = 'Arial';

/** Default font size for the canvas. */
const DEFAULT_FONT_SIZE: number = 16;

export class PmCanvas {
  private readonly ctx!: CanvasRenderingContext2D;
  private components: PmCanvasBaseComponent[] = [];

  constructor(public readonly element: HTMLCanvasElement) {
    const ctx: CanvasRenderingContext2D | null = element.getContext('2d');
    if (!ctx) {
      throw new Error('Could not get canvas context');
    }

    this.element = element;
    this.ctx = ctx;
  }

  public get context(): CanvasRenderingContext2D {
    return this.ctx;
  }

  public get width(): number {
    return this.element.width;
  }

  public get height(): number {
    return this.element.height;
  }

  public getComponents(): PmCanvasBaseComponent[] {
    return this.components;
  }

  public addComponent(component: PmCanvasBaseComponent): void {
    this.components.push(component);
  }

  public removeComponent(component: PmCanvasBaseComponent): void {
    this.components = this.components.filter((comp: PmCanvasBaseComponent): boolean => comp !== component);
  }

  public clearComponents(): void {
    this.components = [];
  }

  /**
   * Set the cursor for the canvas.
   * @param cursor
   */
  setCursor(cursor: string): void {
    this.element.style.cursor = cursor;
  }

  /**
   * Clear the canvas.
   */
  public clear(): void {
    this.setCursor('default');
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  /**
   * Set the canvas context path of a line.
   * @param posX1
   * @param posY1
   * @param posX2
   * @param posY2
   */
  public line(posX1: number, posY1: number, posX2: number, posY2: number): void {
    this.ctx.beginPath();
    this.ctx.moveTo(posX1, posY1);
    this.ctx.lineTo(posX2, posY2);
    this.ctx.closePath();
  }

  /**
   * Set the canvas context path of a rectangle.
   * @param posX
   * @param posY
   * @param width
   * @param height
   * @param radiusLeft
   * @param radiusRight
   */
  public rectangle(posX: number, posY: number, width: number, height: number, radiusLeft: number = 0, radiusRight: number = radiusLeft): void {
    const radiusRX: number = Math.min(width / 2, radiusRight);
    const radiusRY: number = Math.min(height / 2, radiusRight);
    const radiusLX: number = Math.min(width / 2, radiusLeft);
    const radiusLY: number = Math.min(height / 2, radiusLeft);

    this.ctx.beginPath();
    this.ctx.moveTo(posX + radiusLX, posY);
    this.ctx.lineTo(posX + width - radiusRX, posY);
    this.ctx.quadraticCurveTo(posX + width, posY, posX + width, posY + radiusRY);
    this.ctx.lineTo(posX + width, posY + height - radiusRY);
    this.ctx.quadraticCurveTo(posX + width, posY + height, posX + width - radiusRX, posY + height);
    this.ctx.lineTo(posX + radiusLX, posY + height);
    this.ctx.quadraticCurveTo(posX, posY + height, posX, posY + height - radiusLY);
    this.ctx.lineTo(posX, posY + radiusLY);
    this.ctx.quadraticCurveTo(posX, posY, posX + radiusLX, posY);
    this.ctx.closePath();
  }

  /**
   * Set the canvas context path of a circle.
   * @param posX
   * @param posY
   * @param radius
   */
  public circle(posX: number, posY: number, radius: number): void {
    this.ctx.beginPath();
    this.ctx.arc(posX, posY, radius, 0, 2 * Math.PI);
    this.ctx.closePath();
  }

  /**
   * Set the canvas context shadow. This needs to be called before fill or stroke in order to work.
   * @param color
   * @param blur
   * @param offsetX
   * @param offsetY
   */
  public shadow(color: string, blur: number, offsetX: number = 0, offsetY: number = 0): void {
    this.ctx.shadowColor = color;
    this.ctx.shadowBlur = blur;
    this.ctx.shadowOffsetX = offsetX;
    this.ctx.shadowOffsetY = offsetY;
  }

  /**
   * Reset the canvas context shadow.
   */
  protected shadowReset(): void {
    this.ctx.shadowColor = 'transparent';
    this.ctx.shadowBlur = 0;
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;
  }

  /**
   * Use the canvas context path as a clip. This will clip everything drawn outside the path. It is important to call
   * unclip after drawing the clipped content.
   */
  public clip(): void {
    this.ctx.save();
    this.ctx.clip();
  }

  /**
   * Reset the canvas context clip.
   */
  public unclip(): void {
    this.ctx.restore();
  }

  /**
   * Fill the canvas context path with a color.
   * @param color
   */
  public fill(color: string): void {
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.shadowReset();
  }

  /**
   * Stroke the canvas context path with a color and width.
   * @param color
   * @param width
   * @param dash
   */
  public stroke(color: string, width: number = 1, dash: number[] = []): void {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = width;
    this.ctx.setLineDash(dash);
    this.ctx.stroke();
    this.shadowReset();
  }

  /**
   * Draw an image on the canvas.
   * @param posX
   * @param posY
   * @param text
   * @param color
   * @param font
   * @param centered
   */
  public text(posX: number, posY: number, text: string, color: string = '#000', font?: ICanvasFont, centered: boolean = false): void {
    let offsetX: number = 0;

    if (centered) {
      const metrics: TextMetrics = this.measureText(text, font);
      offsetX = metrics.width / 2;
    }

    const fontSize: number = font ? font.size : DEFAULT_FONT_SIZE;

    this.ctx.textBaseline = 'top';
    this.ctx.fillStyle = color;
    this.ctx.font = font ? `${font.style} ${fontSize}px ${font.family}` : `${fontSize}px ${DEFAULT_FONT}`;
    this.ctx.fillText(text, posX - offsetX, posY);
    this.shadowReset();
  }

  /**
   * Measure the width of a text with a given font and return the TextMetrics.
   * @param text
   * @param font
   */
  public measureText(text: string, font?: ICanvasFont): TextMetrics {
    this.ctx.font = font ? `${font.style} ${font.size}px ${font.family}` : `${DEFAULT_FONT_SIZE}px ${DEFAULT_FONT}`;
    return this.ctx.measureText(text);
  }

  /**
   * Get the mouse position on the canvas.
   * @param event
   */
  public getMousePosition(event: MouseEvent): IMousePosition {
    // get canvas screen position
    const canvas: HTMLCanvasElement = event.target as HTMLCanvasElement;
    const rect: DOMRect = canvas.getBoundingClientRect();

    // calculate mouse position on canvas
    const scaleX: number = canvas.width / rect.width;
    const scaleY: number = canvas.height / rect.height;
    const mouseX: number = (event.clientX - rect.left) * scaleX;
    const mouseY: number = (event.clientY - rect.top) * scaleY;

    return {
      mouseX,
      mouseY
    };
  }

  /**
   * Check if a point is in the canvas context path.
   * @param posX
   * @param posY
   */
  public isPointInPath(posX: number, posY: number): boolean {
    return this.ctx.isPointInPath(posX, posY);
  }

  /**
   * Check if a point is in the canvas context stroke
   * @param posX
   * @param posY
   */
  public isPointInStroke(posX: number, posY: number): boolean {
    return this.ctx.isPointInStroke(posX, posY);
  }
}
