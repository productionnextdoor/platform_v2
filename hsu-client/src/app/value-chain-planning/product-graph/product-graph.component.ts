import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  EProductGraphMode,
  IProductGraphState,
  IProductGraphStep,
  IProductGraphNewStepArgs,
  EProductStateType,
  TextType,
  IProductGraphData
} from 'hsu-library';
import { AuthService } from '../../../services/account/auth.service';
import {
  DeleteOrEditStateInput,
  ProductionStateCreateInput,
  ProductionStateServiceProxy,
  StateLockStatusDto,
  StateLockStatusInput
} from '../../../shared/service-proxies/service-proxies';
import { DateTime } from 'luxon';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  map,
  Observable,
  Subject
} from 'rxjs';
import {
  DEBOUNCE_TIME,
  MIN_SEARCH_LENGTH
} from '../../../services/table/table-base.service';
import { WithRx } from '../../../shared/mixins/with-rx.mixin';
import {
  AppLocalizationService
} from '../../../services/localization/app-localization.service';
import { PermissionsManagerService } from '../../../services/permissions/permissions-manager.service';
import { PERMISSIONS } from '../../../services/permissions/permissions';
import {
  graphLocalisations,
  IGraphLocalisations
} from './product-graph.shared';
import { IProductGraphService } from '../../../services/value-chain-planning/product-graph/iproduct-graph.service';

@Component({
  selector: 'product-graph',
  templateUrl: './product-graph.component.html',
})
export class ProductGraphComponent extends WithRx() implements OnInit, OnChanges {

  @Input()
  public productionDetailsId: number = 0;

  @Input()
  public graphMode: EProductGraphMode = EProductGraphMode.VIEW;

  @Output()
  loadingState: EventEmitter<boolean> = new EventEmitter<boolean>();

  //Graph view
  protected producerId: number | null = null;
  protected states: IProductGraphState[] = [];
  protected steps: IProductGraphStep[] = [];

  //States
  protected lockTime: number = 0;
  protected lockedState?: IProductGraphState;
  protected stateForEdit: IProductGraphState;
  protected canDelete: boolean = false;
  protected suggestions: string[] = [];

  //Step wizard
  protected startState?: IProductGraphState;
  protected endState?: IProductGraphState;
  protected stepId: number = 0;
  protected productFinalWorkPiecesCount: number = 0;

  //Popups
  protected statePopupShown: boolean = false;
  protected stateLockPopupShown: boolean = false;
  protected showFinalProductNote: boolean = false;
  protected showWorkstepWizard: boolean = false;
  protected workstepReadonly: boolean = false;

  //Localisation
  protected localisations: IGraphLocalisations = graphLocalisations;

  private stateFilterQuery$ = new Subject<string>();

  protected readonly TextType = TextType;

  constructor(
    private readonly graphService: IProductGraphService,
    private readonly stateService: ProductionStateServiceProxy,
    private readonly localizationService: AppLocalizationService,
    private readonly permissionsService: PermissionsManagerService,
    authService: AuthService
  ) {
    super();
    this.producerId = authService.getCurrentUserId();
    this.stateForEdit = this.resetStateForEdit()
  }

  ngOnInit(): void {
    this.initStateNameFilter();
    this.initLocalization();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productionDetailsId'] && this.productionDetailsId !== 0) {
      this.getGraphData()
        .subscribe();
    }

  }

  //Steps
  addWorkstep(states: IProductGraphNewStepArgs): void {
    if (!this.permissionsService.isGranted(PERMISSIONS.valueChainPlanning.steps.createOrUpdate)) {
      return;
    }

    this.startState = states.start
    this.endState = states.end

    if (this.endState?.type === EProductStateType.ProductFinal) {
      if (this.productFinalWorkPiecesCount > 1) {
        this.showFinalProductNote = true
        return;
      }
    }

    this.showWorkstepWizard = true
  }

  editWorkstep(step: IProductGraphStep): void {
    if (!this.permissionsService.isGranted(PERMISSIONS.valueChainPlanning.steps.createOrUpdate)) {
      return;
    }
    this.stepId = step.stepId;
    this.workstepReadonly = false;
    this.showWorkstepWizard = true;
  }

  showWorkstep(step: IProductGraphStep): void {
    if (!this.permissionsService.isGranted(PERMISSIONS.valueChainPlanning.steps.get)) {
      return;
    }
    this.stepId = step.stepId;
    this.workstepReadonly = true;
    this.showWorkstepWizard = true;
  }

  finalProductNoteClose(): void {
    this.startState = undefined;
    this.endState = undefined;
    this.showFinalProductNote = false;
  }

  finalProductNoteConfirm(): void {
    this.showFinalProductNote = false;
    this.showWorkstepWizard = true;
  }

  stepWizardClose(): void {
    this.stepId = 0;
    this.startState = undefined;
    this.endState = undefined;
    this.showWorkstepWizard = false;
    this.getGraphData()
      .subscribe();
  }

  //States
  addNewState(state: IProductGraphState): void {
    if (!this.permissionsService.isGranted(PERMISSIONS.valueChainPlanning.states.create)) {
      return;
    }

    this.stateService
      .getStateLockStatus(this.productionDetailsId, state.stateId, state.nextId ?? 0)
      .pipe(
        map((result: StateLockStatusDto) => {
          if (!result.isUnlocked) {
            this.stateLockPopupShown = true;
            return;
          }

          this.localisations.addStatePopup.title = this.localizationService.loc('ProductDetails.StatePopup.Title.New');
          this.localisations.addStatePopup.confirm = this.localizationService.loc('ProductDetails.StatePopup.Confirm.New');
          this.lockedState = state;
          this.lockTime = result.stateLockTime.diff(DateTime.now()).as('seconds');
          this.statePopupShown = true;
        }),
        catchError(() => {
          return this.getGraphData();
        })
      )
      .subscribe();
  }

  editState(editState: IProductGraphState): void {
    if (editState.type !== EProductStateType.WorkPieceIntermediate ||
      !this.permissionsService.isGranted(PERMISSIONS.valueChainPlanning.states.update)) {
      return;
    }
    this.stateService
      .getStateLockStatus(this.productionDetailsId, editState.stateId, editState.nextId ?? 0)
      .pipe(
        map((result: StateLockStatusDto) => {
          if (!result.isUnlocked) {
            this.stateLockPopupShown = true;
            return;
          }
          this.localisations.addStatePopup.title = this.localizationService.loc('ProductDetails.StatePopup.Title.Edit');
          this.localisations.addStatePopup.confirm = this.localizationService.loc('ProductDetails.StatePopup.Confirm.Edit');
          this.stateForEdit = editState
          this.lockedState = editState
          this.lockTime = result.stateLockTime.diff(DateTime.now()).as('seconds');
          this.canDelete = result.canDelete;
          this.statePopupShown = true;
        },
        ),
        catchError(() => {
          return this.getGraphData();
        })
      )
      .subscribe();
  }

  onDeleteState(): void {
    if (!this.permissionsService.isGranted(PERMISSIONS.valueChainPlanning.states.delete)) {
      return;
    }
    this.loadingState.emit(true)
    this.stateService
      .deleteState(
        this.productionDetailsId,
        this.stateForEdit.stateId,
        this.stateForEdit.label
      )
      .pipe(
        this.switchMapCancelable(this.getGraphData.bind(this)),
        finalize(() => (this.loadingState.emit(false))))
      .subscribe();
    this.statePopupShown = false
    this.stateForEdit = this.resetStateForEdit();
  }

  onStateCancel(): void {
    this.statePopupShown = false
    this.stateForEdit = this.resetStateForEdit();
    if (!this.lockedState) return
    this.stateService
      .cancelStateLock(new StateLockStatusInput({
        productionDetailsId: this.productionDetailsId,
        previousStateId: this.lockedState.stateId,
        nextStateId: this.lockedState.nextId ?? 0
      }))
      .subscribe();
  }

  onStateTimerReset(): void {
    if (!this.lockedState) return

    this.stateService
      .resetStateLockStatus(new StateLockStatusInput({
        productionDetailsId: this.productionDetailsId,
        previousStateId: this.lockedState.stateId,
        nextStateId: this.lockedState.nextId ?? 0
      }))
      .subscribe({
        next: (result: StateLockStatusDto): void => {
          if (result.isUnlocked) {
            this.lockTime = result.stateLockTime.diff(DateTime.now()).as('seconds');
          }
        }
      });
  }

  onConfirm(stateName: string): void {
    if (this.stateForEdit.stateId) {
      this.updateState(stateName)
      return
    }
    this.createState(stateName)
  }

  onStateNameChange(stateName: string): void {
    this.stateFilterQuery$.next(stateName);
  }

  private createState(stateName: string): void {
    if (!this.lockedState) return
    this.loadingState.emit(true)
    this.stateService
      .createNewState(new ProductionStateCreateInput({
        description: stateName,
        productionDetailsId: this.productionDetailsId,
        previousStateId: this.lockedState.stateId,
        nextStateId: this.lockedState.nextId ?? 0,
      }))
      .pipe(
        this.switchMapCancelable(this.getGraphData.bind(this)),
        finalize(() => (this.loadingState.emit(false))
        ))
      .subscribe();
    this.statePopupShown = false
    this.stateForEdit = this.resetStateForEdit();
  }

  private updateState(stateName: string): void {
    this.loadingState.emit(true)
    this.stateService
      .editState(new DeleteOrEditStateInput({
        stateId: this.stateForEdit.stateId,
        description: stateName,
        productionDetailsId: this.productionDetailsId,
      }))
      .pipe(
        this.switchMapCancelable(this.getGraphData.bind(this)),
        finalize(() => (this.loadingState.emit(false)
        )))
      .subscribe();
    this.statePopupShown = false
    this.stateForEdit = this.resetStateForEdit();
  }

  private initStateNameFilter(): void {
    this.stateFilterQuery$
      .pipe(
        filter((query: string) => query.length >= MIN_SEARCH_LENGTH || query.length === 0),
        debounceTime(DEBOUNCE_TIME),
        distinctUntilChanged(),
        this.switchMapCancelable((query: string) => this.stateService.getStateNames(query)),
      )
      .subscribe(
        {
          next: (result: string[]): void => {
            this.suggestions = result;
          }
        });
  }

  private initLocalization(): void {
    this.localisations = {
      addStatePopup: {
        title: '',
        description: this.localizationService.loc('ProductDetails.StatePopup.Description'),
        state: this.localizationService.loc('ProductDetails.StatePopup.State'),
        statePlaceholder: this.localizationService.loc('ProductDetails.StatePopup.StatePlaceholder'),
        confirm: '',
        cancel: this.localizationService.loc('ProductDetails.StatePopup.Cancel'),
        delete: this.localizationService.loc('ProductDetails.StatePopup.Delete')
      },
      lockedStatePopup: {
        title: this.localizationService.loc('ProductDetails.LockedStatePopup.Title'),
        description: this.localizationService.loc('ProductDetails.LockedStatePopup.Description'),
        confirm: this.localizationService.loc('ProductDetails.LockedStatePopup.Confirm')
      },
      finalProductNotePopup: {
        title: this.localizationService.loc('ProductDetails.FinalProductStatePopup.Title'),
        description: this.localizationService.loc('ProductDetails.FinalProductStatePopup.Description'),
        cancel: this.localizationService.loc('ProductDetails.FinalProductStatePopup.Cancel'),
        confirm: this.localizationService.loc('ProductDetails.FinalProductStatePopup.Confirm')
      }
    }
  }

  private resetStateForEdit() {
    return {
      stateId: 0,
      label: '',
      nextId: 0,
      type: EProductStateType.WorkPieceIntermediate,
      productionDetailsId: this.productionDetailsId
    }
  }

  private getGraphData(): Observable<void> {
    this.loadingState.emit(true);
    return this.graphService
      .getProductGraphData(this.productionDetailsId)
      .pipe(
        map((result: IProductGraphData): void => {
          this.states = result.states;
          this.steps = result.steps
          this.productFinalWorkPiecesCount = this.states.filter((state: IProductGraphState): boolean => state.type === EProductStateType.WorkPieceFinal).length;
        }),
        finalize(() => (this.loadingState.emit(false)))
      )
  }
}
