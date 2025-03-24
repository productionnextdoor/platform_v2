import {
  Component, ElementRef, EventEmitter, HostListener, Input, OnInit, OnChanges, Output, ViewChild
} from '@angular/core';
import { IEventResult, PmCanvasBaseComponent } from './components/pm-canvas-base.component';
import { PmCanvasChainComponent } from './components/pm-canvas-chain.component';
import { EStateMode, PmCanvasStateComponent } from './components/pm-canvas-state.component';
import { PmCanvasStepComponent } from './components/pm-canvas-step.component';
import { PmCanvas } from './pm-canvas.service';
import { productGraphConfig } from './pm-product-graph.config';
import { PmProductGraphService } from './pm-product-graph.service';
import {
  EProductGraphMode, EProductStateType,
  IProductGraphConfig,
  IProductGraphData,
  IProductGraphNewStepArgs,
  IProductGraphProducer,
  IProductGraphState,
  IProductGraphStep
} from './pm-product-graph.shared';

@Component({
  selector: 'pm-product-graph',
  templateUrl: './pm-product-graph.component.html',
  styleUrls: ['./pm-product-graph.component.scss']
})
export class PmProductGraphComponent implements OnInit, OnChanges {

  /** @ignore */
  @ViewChild('canvas', {
    static: true
  }) canvasElement!: ElementRef;

  @Input()
  states: IProductGraphState[] = [];

  @Input()
  steps: IProductGraphStep[] = [];

  @Input()
  producers: IProductGraphProducer[] = [];

  @Input()
  mode: EProductGraphMode = EProductGraphMode.VIEW;

  @Input()
  producerId: number | null = null;

  @Input()
  selectedStartState: IProductGraphState | null = null;

  @Input()
  config: IProductGraphConfig = productGraphConfig;

  @Output()
  stateClick: EventEmitter<IProductGraphState> = new EventEmitter();

  @Output()
  stateLeftClick: EventEmitter<IProductGraphState> = new EventEmitter();

  @Output()
  stateRightClick: EventEmitter<IProductGraphState> = new EventEmitter();

  @Output()
  addStep: EventEmitter<IProductGraphNewStepArgs> = new EventEmitter();

  @Output()
  addState: EventEmitter<IProductGraphState> = new EventEmitter();

  @Output()
  editStep: EventEmitter<IProductGraphStep> = new EventEmitter();

  @Output()
  infoClick: EventEmitter<IProductGraphStep> = new EventEmitter();

  private canvasService!: PmCanvas;

  ngOnInit(): void {
    if (!this.canvasElement) {
      throw new Error('Could not get canvas element');
    }

    const canvas: HTMLCanvasElement = this.canvasElement.nativeElement;
    this.canvasService = new PmCanvas(canvas);

    this.initEventListeners();
    this.initComponents();
    this.updateModes();
    this.renderComponents();

    this.preloadFontIfNotLoaded(this.config.fonts.default.family);
    this.preloadFontIfNotLoaded(this.config.fonts.icon.family);
  }

  ngOnChanges(): void {
    if (!this.canvasService) {
      // component is not initialized yet, so we can't update anything
      return;
    }

    this.initComponents();
    this.updateModes();
    this.renderComponents();
  }

  private initEventListeners(): void {
    const canvas: HTMLCanvasElement = this.canvasElement.nativeElement;

    canvas.addEventListener('click', this.onMouseMove.bind(this));
    canvas.addEventListener('mousedown', this.onMouseMove.bind(this));
    canvas.addEventListener('mouseup', this.onMouseMove.bind(this));
    canvas.addEventListener('mouseenter', this.onMouseMove.bind(this));
    canvas.addEventListener('mouseleave', this.onMouseMove.bind(this));
    canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    canvas.addEventListener('contextmenu', this.onContextMenu.bind(this));
    canvas.addEventListener('stateClick', this.onStateClick.bind(this));
    canvas.addEventListener('stateLeftClick', this.onStateLeftClick.bind(this));
    canvas.addEventListener('stateRightClick', this.onStateRightClick.bind(this));
    canvas.addEventListener('addState', this.onAddState.bind(this));
    canvas.addEventListener('editStep', this.onEditStep.bind(this));
    canvas.addEventListener('infoClick', this.onInfoClick.bind(this));
  }

  private initComponents(): void {
    this.canvasService.clearComponents();

    // Initialize states
    this.states.forEach((state: IProductGraphState): void => {
      this.canvasService.addComponent(new PmCanvasStateComponent(this.canvasService, state, this.config));
    });

    // Initialize steps
    this.getSortedSteps().forEach((step: IProductGraphStep): void => {
      const producer: string = this.producers.find((prod: IProductGraphProducer): boolean => prod.producerId === step.producerId)?.name ?? '';
      this.canvasService.addComponent(new PmCanvasStepComponent(this.canvasService, step, producer, this.config, this.mode, this.producerId));
    });

    // Initialize chain steps
    this.states.forEach((state: IProductGraphState): void => {
      if (!state.nextId || this.stepExists(state.stateId, state.nextId) || this.isFinalAndHasSteps(state.stateId, state.nextId)) {
        return;
      }

      this.canvasService.addComponent(new PmCanvasChainComponent(this.canvasService, {
        start: state.stateId,
        end: state.nextId
      }, this.config, this.mode));
    });

    this.update();
  }

  private getSortedSteps(): IProductGraphStep[] {
    return this.steps.sort((stepA: IProductGraphStep, stepB: IProductGraphStep): number => {
      const priorityA: number = stepA.producerId === this.producerId ? 0 : 1;
      const priorityB: number = stepB.producerId === this.producerId ? 0 : 1;

      return priorityA - priorityB;
    });
  }

  private isFinalAndHasSteps(startStateId: number, endStateId: number): boolean {
    const isFinal: boolean = this.states.some(
      (state: IProductGraphState): boolean => state.stateId === endStateId && state.type === EProductStateType.ProductFinal
    );

    if (!isFinal) {
      return false;
    }

    const workPieceStepIds: number[] = [];
    let prevStateId: number | null = startStateId;
    while (prevStateId) {
      const prevState: IProductGraphState | undefined = this.states.find((state: IProductGraphState): boolean => state.nextId === prevStateId);
      if (!prevState) {
        break;
      }

      this.steps.forEach((step: IProductGraphStep): void => {
        if (step.start === prevState.stateId) {
          workPieceStepIds.push(step.stepId);
        }
      });

      prevStateId = prevState.stateId;
    }

    return this.steps.some((step: IProductGraphStep): boolean => step.end === endStateId && !workPieceStepIds.includes(step.stepId));
  }

  private hasSteps(stateId: number): boolean {
    return this.steps.some((step: IProductGraphStep): boolean => step.start === stateId);
  }

  private updateModes(): void {
    const components: PmCanvasBaseComponent[] = this.canvasService.getComponents();

    const stateComponents: PmCanvasStateComponent[] = components.filter(
      (component: PmCanvasBaseComponent): boolean => component.type === PmCanvasStateComponent.TYPE
    ) as PmCanvasStateComponent[];
    this.updateStateModes(stateComponents);
  }

  private updateStateModes(components: PmCanvasStateComponent[]): void {
    components.forEach((component: PmCanvasStateComponent): void => {
      component.mode = EStateMode.NONE;
    });

    if (this.mode !== EProductGraphMode.EDIT) {
      return;
    }

    if (this.selectedStartState === null) {
      components.forEach((component: PmCanvasStateComponent): void => {
        component.mode = EStateMode.VALID_START;
      });
      return;
    }

    let stateId: number | null = this.selectedStartState?.stateId;
    do {
      const current: PmCanvasStateComponent | undefined = components.find(
        (comp: PmCanvasStateComponent): boolean => comp.state.stateId === stateId
      );

      if (!current) {
        break;
      }

      current.mode = stateId === this.selectedStartState.stateId ? EStateMode.SELECTED_START : EStateMode.VALID_END;
      stateId = current.state.nextId;
    } while (stateId);
  }

  private stepExists(start: number, end: number): boolean {
    return this.steps.some((step: IProductGraphStep): boolean => {
      return step.start === start && step.end === end;
    });
  }

  private update(): void {
    const components: PmCanvasBaseComponent[] = this.canvasService.getComponents();

    components.forEach((component: PmCanvasBaseComponent): void => {
      component.update();
    });

    const graphData: IProductGraphData = {
      states: this.states,
      steps: this.steps
    };
    PmProductGraphService.positionComponentsOnCanvas(graphData, components, this.config);
    this.updateCanvasSize();
  }

  /**
   * Renders all components on the canvas.
   */
  private renderComponents(): void {
    this.canvasService.clear();
    this.update();

    const components: PmCanvasBaseComponent[] = this.canvasService.getComponents();

    // Render the components in reverse order to make some kind of z-index. This will make the mouse events work better.
    const reversedComponents: PmCanvasBaseComponent[] = components.slice().reverse();
    reversedComponents.forEach((component: PmCanvasBaseComponent): void => {
      component.preRender();
    });

    reversedComponents.forEach((component: PmCanvasBaseComponent): void => {
      component.render();
    });

    reversedComponents.forEach((component: PmCanvasBaseComponent): void => {
      component.postRender();
    });
  }

  private updateCanvasSize(): void {
    const components: PmCanvasBaseComponent[] = this.canvasService.getComponents();

    let width: number = 0,
      height: number = 0,
      minX: number = 0,
      minY: number = 0;

    components.forEach((component: PmCanvasBaseComponent): void => {
      width = Math.max(width, component.posX + component.width);
      height = Math.max(height, component.posY + component.height);
      minX = Math.min(minX, component.posX);
      minY = Math.min(minY, component.posY);
    });

    this.setCanvasSize(width - minX + this.config.grid.paddingX * 2, height - minY + this.config.grid.paddingY * 2);
    this.canvasService.context.translate(-minX + this.config.grid.paddingX, -minY + this.config.grid.paddingY);
  }

  /**
   * Handles mouse events on the canvas and propagates them to the components.
   * @param event
   */
  private onMouseMove(event: MouseEvent): void {
    const components: PmCanvasBaseComponent[] = this.canvasService.getComponents();

    let iter: number = 0,
      forceUpdate: boolean = false,
      preventDefault: boolean = false;

    do {
      const component: PmCanvasBaseComponent = components[iter];
      const result: IEventResult | null = component.handleMouseEvent(event, preventDefault);

      if (result) {
        if (result.forceUpdate) {
          forceUpdate = true;
        }

        if (result.preventDefault) {
          preventDefault = true;
        }
      }
    } while (++iter < components.length);

    if (forceUpdate) {
      this.renderComponents();
    }
  }

  /**
   * This is used to prevent the context menu from showing up when right-clicking on the canvas. This is not needed for
   * the actual component, but a nice feature to have.
   * @param event
   */
  private onContextMenu(event: MouseEvent): false {
    event.preventDefault();
    return false;
  }

  /**
   * Emits the stateClick event when a state is clicked.
   * @param event
   */
  private onStateClick(event: CustomEvent<IProductGraphState>): void {
    this.stateClick.emit(event.detail);
  }

  /**
   * Emits the stateLeftClick event when a state is left-clicked.
   * @param event
   */
  private onStateLeftClick(event: CustomEvent<IProductGraphState>): void {
    this.stateLeftClick.emit(event.detail);

    if (this.selectedStartState) {
      this.addStep.emit({
        start: this.selectedStartState,
        end: event.detail
      });
    }

    this.selectedStartState = null;
    this.updateModes();
    this.renderComponents();
  }

  /**
   * Emits the stateRightClick event when a state is right-clicked.
   * @param event
   */
  private onStateRightClick(event: CustomEvent<IProductGraphState>): void {
    this.stateRightClick.emit(event.detail);

    if (this.selectedStartState === event.detail) {
      return;
    }

    this.selectedStartState = event.detail;
    this.updateModes();
    this.renderComponents();
  }

  /**
   * Emits the addState event when a step is added.
   * @param event
   */
  private onAddState(event: CustomEvent<IProductGraphState>): void {
    this.addState.emit(event.detail);
  }

  /**
   Emits the editStep event when a step is edited.
   * @param event
   */
  private onEditStep(event: CustomEvent<IProductGraphStep>): void {
    this.editStep.emit(event.detail);
  }

  /**
   Emits the infoClick event when a info button is clicked.
   * @param event
   */
  private onInfoClick(event: CustomEvent<IProductGraphStep>): void {
    this.infoClick.emit(event.detail);
  }

  /**
   * Resizes the canvas when the window is resized.
   */
  @HostListener('window:resize', ['$event'])
  private _windowResize(): void {
    this.renderComponents();
  }

  /**
   * Sets the size of the canvas.
   * @param width
   * @param height
   */
  private setCanvasSize(width: number, height: number): void {
    const canvas: HTMLCanvasElement = this.canvasElement.nativeElement;
    canvas.width = width;
    canvas.height = height;
  }

  /**
   * Preloads the font if it is not already loaded and renders the components when the font is loaded.
   * @param fontName
   */
  private preloadFontIfNotLoaded(fontName: string): void {
    const fontsAPI: FontFaceSet = document.fonts;
    const font: string = `0 ${fontName}`; // font-size is 0 because we only want to check if the font is loaded

    if (fontsAPI.check(font)) {
      return;
    }

    fontsAPI.load(font).then(() => {
      if (fontsAPI.check(font)) {
        this.renderComponents();
      }
    });
  }
}
