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
  IStepMeasurementVariants,
  IWorkPieceVariantsCost,
  EWorkstepType,
  IWorkstepMatrixData,
  IMatrixRow,
  IMatrixColumn,
  IMatrixCell,
  EMatrixRowType,
  EFillMode,
  IFillRule,
  IFillSourceOption,
  IWorkstepMatrixLocalisations,
  WorkstepMatrixLocalisations
} from './pm-workstep-matrix.shared';
import {
  getAvailableRowSources,
  getAvailableColumnSources,
  getFillMultiplier,
  updateRowCellsEditableState,
  updateColumnCellsEditableState
} from './pm-workstep-matrix.fill-helpers';
import { EPmInputType } from '../../components/pm-input/pm-input.component';
import { Icon, IconSize } from '../../components/pm-icon/pm-icon.shared';
import { PmCheckboxState } from '../../components/pm-checkbox/pm-checkbox.shared';
import {
  DefaultMargins,
  IComponentMargin,
  PmComponentMargin
} from '../../utils/pm-component-margin';
import { TextType } from '../../components/pm-text/pm-text.shared';

@Component({
  selector: 'pm-workstep-matrix',
  templateUrl: './pm-workstep-matrix.component.html',
  styleUrls: ['./pm-workstep-matrix.component.scss']
})
export class PmWorkstepMatrixComponent implements OnInit, OnChanges {
  @Input()
  stepMeasurementVariants: IStepMeasurementVariants[] = [];

  @Input()
  localisations: IWorkstepMatrixLocalisations = WorkstepMatrixLocalisations;

  @Input()
  readonly: boolean = false;

  @Output()
  dataChange: EventEmitter<IStepMeasurementVariants[]> = new EventEmitter<IStepMeasurementVariants[]>();

  @Output()
  validationChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  matrixData: IWorkstepMatrixData = {
    columns: [],
    rows: []
  };

  validationErrors: Map<string, string> = new Map();
  isValid: boolean = true;

  private internalData: IStepMeasurementVariants[] = [];

  protected readonly EPmInputType = EPmInputType;
  protected readonly DefaultMargins = DefaultMargins;
  protected readonly EMatrixRowType = EMatrixRowType;
  protected readonly EFillMode = EFillMode;
  protected readonly PmCheckboxState = PmCheckboxState;
  protected readonly TextType = TextType;
  protected readonly Icon = Icon;
  protected readonly IconSize = IconSize;

  protected materialTextMargin: IComponentMargin = new PmComponentMargin(0, 0, DefaultMargins.Small, 0);

  // Fill assistant state
  activePopoverRowId: string | null = null;
  activePopoverColumnId: string | null = null;
  rowFillSourceOptions: IFillSourceOption[] = [];
  columnFillSourceOptions: IFillSourceOption[] = [];

  get columnCount(): number {
    return this.matrixData.columns.length;
  }

  ngOnInit(): void {
    if (this.stepMeasurementVariants && this.stepMeasurementVariants.length > 0) {
      // Deep copy to avoid reference issues
      this.internalData = JSON.parse(JSON.stringify(this.stepMeasurementVariants));
      this.buildMatrixData();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['stepMeasurementVariants'] && !changes['stepMeasurementVariants'].firstChange) {
      if (this.hasStructureChanged(changes)) {
        this.internalData = JSON.parse(JSON.stringify(this.stepMeasurementVariants));
        this.buildMatrixData();
      }
    }
  }

  private hasStructureChanged(changes: SimpleChanges): boolean {
    const oldMeasurements: IStepMeasurementVariants[] = changes['stepMeasurementVariants'].previousValue;
    const newMeasurements: IStepMeasurementVariants[] = changes['stepMeasurementVariants'].currentValue;
    
    if (!oldMeasurements || !newMeasurements) {
      return true;
    }
    if (oldMeasurements.length !== newMeasurements.length) {
      return true;
    }
    return oldMeasurements.some((old: IStepMeasurementVariants, idx: number) => 
      !newMeasurements[idx] || old.measurementId !== newMeasurements[idx].measurementId);
  }

  private buildMatrixData(): void {
    const measurementsToUse: IStepMeasurementVariants[] = this.getDataSource();
    
    if (!measurementsToUse || measurementsToUse.length === 0) {
      this.matrixData = {
        columns: [],
        rows: []
      };
      return;
    }

    const columns: IMatrixColumn[] = this.buildColumns(measurementsToUse);
    const rows: IMatrixRow[] = this.buildRows(measurementsToUse, columns);

    this.matrixData = {
      columns,
      rows
    };
    this.validateData();
  }

  private getDataSource(): IStepMeasurementVariants[] {
    return this.internalData.length > 0 ? this.internalData : this.stepMeasurementVariants;
  }

  private buildColumns(measurementsToUse: IStepMeasurementVariants[]): IMatrixColumn[] {
    return measurementsToUse.map((variant: IStepMeasurementVariants) => {
      const allMaterialsCannotProduce: boolean = variant.workPieceVariantsCost?.length > 0 &&
        variant.workPieceVariantsCost.every((mat: IWorkPieceVariantsCost) => mat.canProduce === PmCheckboxState.ACTIVE);
      
      return {
        columnId: `col-${variant.measurementId}`,
        measurementId: variant.measurementId,
        measurementName: variant.measurementsName,
        measurementType: variant.measurementVariantType,
        isStandard: variant.measurementVariantType === EWorkstepType.DEFAULT,
        canProduce: allMaterialsCannotProduce ? PmCheckboxState.ACTIVE : PmCheckboxState.DEFAULT
      };
    });
  }

  private buildRows(measurementsToUse: IStepMeasurementVariants[], columns: IMatrixColumn[]): IMatrixRow[] {
    const rows: IMatrixRow[] = [];
    const materialVariants: IWorkPieceVariantsCost[] = measurementsToUse[0].workPieceVariantsCost || [];

    this.addMaterialRows(rows, materialVariants, measurementsToUse, columns);
    this.addCostRows(rows, measurementsToUse, columns);
    return rows;
  }

  private isColumnEditable(columns: IMatrixColumn[], variantIndex: number): boolean {
    return columns[variantIndex]?.canProduce !== PmCheckboxState.ACTIVE;
  }

  private addMaterialRows(
    rows: IMatrixRow[],
    materialVariants: IWorkPieceVariantsCost[],
    measurementsToUse: IStepMeasurementVariants[],
    columns: IMatrixColumn[]
  ): void {
    materialVariants.forEach((material: IWorkPieceVariantsCost) => {
      const cells: IMatrixCell[] = this.buildMaterialCells(material, measurementsToUse, columns);
      const allMeasurementsCannotProduce: boolean = this.checkAllMeasurementsCannotProduce(material, measurementsToUse);

      rows.push({
        rowId: `material-${material.workPieceId}-${material.workPieceVariantId}`,
        rowType: EMatrixRowType.MATERIAL_VARIANT,
        label: `${material.description.group}: ${material.description.material}`,
        cells: cells,
        workPieceVariantCostId: material.workPieceVariantCostId,
        description: material.description,
        isStandard: material.isStandard,
        canProduce: allMeasurementsCannotProduce ? PmCheckboxState.ACTIVE : PmCheckboxState.DEFAULT
      });
    });
  }

  private buildMaterialCells(
    material: IWorkPieceVariantsCost,
    measurementsToUse: IStepMeasurementVariants[],
    columns: IMatrixColumn[]
  ): IMatrixCell[] {
    return measurementsToUse.map((variant: IStepMeasurementVariants, variantIndex: number) => {
      const matCost: IWorkPieceVariantsCost | undefined = variant.workPieceVariantsCost?.find(
        (mat: IWorkPieceVariantsCost) => mat.workPieceId === material.workPieceId &&
             mat.workPieceVariantId === material.workPieceVariantId
      );
      const columnEditable: boolean = this.isColumnEditable(columns, variantIndex);
      return {
        value: matCost?.materialCost ?? 0,
        isEditable: !this.readonly && matCost?.canProduce !== PmCheckboxState.ACTIVE && columnEditable,
        isRequired: false,
        measurementId: variant.measurementId,
        workPieceVariantId: material.workPieceVariantId,
        workPieceId: material.workPieceId
      };
    });
  }

  private checkAllMeasurementsCannotProduce(
    material: IWorkPieceVariantsCost,
    measurementsToUse: IStepMeasurementVariants[]
  ): boolean {
    return measurementsToUse.every((variant: IStepMeasurementVariants) => {
      const matCost: IWorkPieceVariantsCost | undefined = variant.workPieceVariantsCost?.find(
        (mat: IWorkPieceVariantsCost) => mat.workPieceId === material.workPieceId &&
             mat.workPieceVariantId === material.workPieceVariantId
      );
      return matCost?.canProduce === PmCheckboxState.ACTIVE;
    });
  }

  private addCostRows(
    rows: IMatrixRow[],
    measurementsToUse: IStepMeasurementVariants[],
    columns: IMatrixColumn[]
  ): void {
    rows.push(this.buildWorkCostRow(measurementsToUse, columns));
    rows.push(this.buildTransportCostRow(measurementsToUse, columns));
    rows.push(this.buildProcessingTimeRow(measurementsToUse, columns));
    rows.push(this.buildWorkHoursRow(measurementsToUse, columns));
  }

  private buildWorkCostRow(measurementsToUse: IStepMeasurementVariants[], columns: IMatrixColumn[]): IMatrixRow {
    return {
      rowId: 'work-cost',
      rowType: EMatrixRowType.WORK_COST,
      label: this.localisations.workCostLabel,
      cells: measurementsToUse.map((variant: IStepMeasurementVariants, variantIndex: number) => ({
        value: variant.workPieceVariantsCost?.[0]?.workCost ?? 0,
        isEditable: !this.readonly && this.isColumnEditable(columns, variantIndex),
        isRequired: this.isColumnEditable(columns, variantIndex),
        measurementId: variant.measurementId
      }))
    };
  }

  private buildTransportCostRow(measurementsToUse: IStepMeasurementVariants[], columns: IMatrixColumn[]): IMatrixRow {
    return {
      rowId: 'transport-cost',
      rowType: EMatrixRowType.TRANSPORT_COST,
      label: this.localisations.transportCostLabel,
      cells: measurementsToUse.map((variant: IStepMeasurementVariants, variantIndex: number) => ({
        value: variant.transportAndAssemblyCost ?? 0,
        isEditable: !this.readonly && this.isColumnEditable(columns, variantIndex),
        isRequired: false,
        measurementId: variant.measurementId
      }))
    };
  }

  private buildProcessingTimeRow(measurementsToUse: IStepMeasurementVariants[], columns: IMatrixColumn[]): IMatrixRow {
    return {
      rowId: 'processing-time',
      rowType: EMatrixRowType.PROCESSING_TIME,
      label: this.localisations.processingTimeLabel,
      cells: measurementsToUse.map((variant: IStepMeasurementVariants, variantIndex: number) => ({
        value: variant.orderProcessingTime ?? 0,
        isEditable: !this.readonly && this.isColumnEditable(columns, variantIndex),
        isRequired: this.isColumnEditable(columns, variantIndex),
        measurementId: variant.measurementId
      }))
    };
  }

  private buildWorkHoursRow(measurementsToUse: IStepMeasurementVariants[], columns: IMatrixColumn[]): IMatrixRow {
    return {
      rowId: 'work-hours',
      rowType: EMatrixRowType.WORK_HOURS,
      label: this.localisations.workHoursLabel,
      cells: measurementsToUse.map((variant: IStepMeasurementVariants, variantIndex: number) => ({
        value: variant.workHours ?? 0,
        isEditable: !this.readonly && this.isColumnEditable(columns, variantIndex),
        isRequired: this.isColumnEditable(columns, variantIndex),
        measurementId: variant.measurementId
      }))
    };
  }

  private validateData(): void {
    this.validationErrors.clear();
    const measurementsToValidate: IStepMeasurementVariants[] = this.getDataSource();

    let hasErrors: boolean = false;
    for (const [variantIndex, variant] of measurementsToValidate.entries()) {
      if (this.isVariantSkipped(variant)) continue;

      hasErrors = hasErrors || this.validateVariantFields(variant, variantIndex);
    }

    this.isValid = !hasErrors;
    this.validationChange.emit(this.isValid);
  }

  private isGreaterThanZero(value: number | undefined | null): boolean {
    return value !== undefined && value !== null && value > 0;
  }

  private isZeroOrGreater(value: number | undefined | null): boolean {
    return value !== undefined && value !== null && value >= 0;
  }

  private isVariantSkipped(variant: IStepMeasurementVariants): boolean {
    return variant.canProduce === PmCheckboxState.ACTIVE;
  }

  private validateVariantFields(variant: IStepMeasurementVariants, variantIndex: number): boolean {
    let hasErrors: boolean = false;

    if (!this.isGreaterThanZero(variant.workHours)) {
      this.validationErrors.set(`workHours-${variantIndex}`, this.localisations.validationMessages.workHoursRequired);
      hasErrors = true;
    }

    if (!this.isGreaterThanZero(variant.orderProcessingTime)) {
      this.validationErrors.set(`processingTime-${variantIndex}`, this.localisations.validationMessages.processingTimeRequired);
      hasErrors = true;
    }

    if (!this.isGreaterThanZero(variant.workPieceVariantsCost?.[0]?.workCost)) {
      this.validationErrors.set(`workCost-${variantIndex}`, this.localisations.validationMessages.workCostRequired);
      hasErrors = true;
    }

    if (!this.isZeroOrGreater(variant.transportAndAssemblyCost)) {
      this.validationErrors.set(`transport-${variantIndex}`, this.localisations.validationMessages.transportCostRequired);
      hasErrors = true;
    }

    return hasErrors;
  }

  onCellValueChange(row: IMatrixRow, cellIndex: number, newValue: number): void {
    const sanitizedValue: number = Number(newValue) || 0;
    const cell: IMatrixCell = row.cells[cellIndex];
    cell.value = sanitizedValue;
    this.ensureInternalDataCopy();

    const measurementsToUpdate: IStepMeasurementVariants[] = this.getDataSource();
    const measurement: IStepMeasurementVariants | undefined = measurementsToUpdate.find(
      (variant: IStepMeasurementVariants) => variant.measurementId === cell.measurementId
    );

    if (!measurement) return;

    this.updateMeasurementValue(row.rowType, measurement, cell, sanitizedValue);

    this.emitDataChange();
    this.validateData();
  }

  private ensureInternalDataCopy(): void {
    if (this.internalData.length === 0 && this.stepMeasurementVariants.length > 0) {
      this.internalData = JSON.parse(JSON.stringify(this.stepMeasurementVariants));
    }
  }

  private updateMeasurementValue(
    rowType: EMatrixRowType,
    measurement: IStepMeasurementVariants,
    cell: IMatrixCell,
    newValue: number
  ): void {
    switch (rowType) {
      case EMatrixRowType.MATERIAL_VARIANT:
        this.updateMaterialCost(measurement, cell, newValue);
        break;
      case EMatrixRowType.WORK_COST:
        measurement.workPieceVariantsCost?.forEach((mat: IWorkPieceVariantsCost) => {
          mat.workCost = newValue;
        });
        break;
      case EMatrixRowType.WORK_HOURS:
        measurement.workHours = newValue;
        break;
      case EMatrixRowType.TRANSPORT_COST:
        measurement.transportAndAssemblyCost = newValue;
        break;
      case EMatrixRowType.PROCESSING_TIME:
        measurement.orderProcessingTime = newValue;
        break;
    }
  }

  private updateMaterialCost(
    measurement: IStepMeasurementVariants,
    cell: IMatrixCell,
    newValue: number
  ): void {
    const matCost: IWorkPieceVariantsCost | undefined = measurement.workPieceVariantsCost?.find(
      (mat: IWorkPieceVariantsCost) => mat.workPieceId === cell.workPieceId &&
           mat.workPieceVariantId === cell.workPieceVariantId
    );
    if (matCost) {
      matCost.materialCost = newValue;
    }
  }

  private emitDataChange(): void {
    const measurementsToEmit: IStepMeasurementVariants[] = this.getDataSource();
    this.dataChange.emit([...measurementsToEmit]);
  }

  onCheckboxChange(row: IMatrixRow, newState: PmCheckboxState): void {
    row.canProduce = newState;
    const measurementsToUpdate: IStepMeasurementVariants[] = this.getDataSource();
    const rowIsActive: boolean = newState === PmCheckboxState.ACTIVE;

    measurementsToUpdate.forEach((measurement: IStepMeasurementVariants, measurementIndex: number) => {
      this.updateRowMaterialCanProduce(row, measurement, measurementIndex, rowIsActive);
    });

    this.emitDataChange();
    this.validateData();
  }

  private updateRowMaterialCanProduce(
    row: IMatrixRow,
    measurement: IStepMeasurementVariants,
    measurementIndex: number,
    rowIsActive: boolean
  ): void {
    const matCost: IWorkPieceVariantsCost | undefined = measurement.workPieceVariantsCost?.find(
      (mat: IWorkPieceVariantsCost) => mat.workPieceId === row.cells[0]?.workPieceId &&
           mat.workPieceVariantId === row.cells[0]?.workPieceVariantId
    );
    if (!matCost) return;

    const columnIsActive: boolean = this.matrixData.columns[measurementIndex]?.canProduce === PmCheckboxState.ACTIVE;
    matCost.canProduce = this.resolveCanProduceState(rowIsActive, columnIsActive);

    this.updateCellEditableState(row, measurement, rowIsActive, columnIsActive);
  }

  private resolveCanProduceState(rowIsActive: boolean, columnIsActive: boolean): PmCheckboxState {
    return (rowIsActive || columnIsActive) ? PmCheckboxState.ACTIVE : PmCheckboxState.DEFAULT;
  }

  private updateCellEditableState(
    row: IMatrixRow,
    measurement: IStepMeasurementVariants,
    rowIsActive: boolean,
    columnIsActive: boolean
  ): void {
    const cellIdx: number = this.matrixData.columns.findIndex(
      (col: IMatrixColumn) => col.measurementId === measurement.measurementId
    );
    if (cellIdx >= 0 && row.cells[cellIdx]) {
      row.cells[cellIdx].isEditable = !this.readonly && !rowIsActive && !columnIsActive;
    }
  }

  onColumnCheckboxChange(column: IMatrixColumn, newState: PmCheckboxState): void {
    column.canProduce = newState;
    this.updateColumnMeasurement(column, newState);
    this.updateColumnCells(column, newState);
    this.emitDataChange();
    this.validateData();
  }

  private updateColumnMeasurement(column: IMatrixColumn, newState: PmCheckboxState): void {
    const measurementsToUpdate: IStepMeasurementVariants[] = this.getDataSource();
    const measurement: IStepMeasurementVariants | undefined = measurementsToUpdate.find(
      (variant: IStepMeasurementVariants) => variant.measurementId === column.measurementId
    );
    if (!measurement) return;

    measurement.canProduce = newState;
    const columnIsActive: boolean = newState === PmCheckboxState.ACTIVE;
    
    measurement.workPieceVariantsCost?.forEach((material: IWorkPieceVariantsCost) => {
      const materialRow: IMatrixRow | undefined = this.matrixData.rows.find(
        (row: IMatrixRow) => row.rowType === EMatrixRowType.MATERIAL_VARIANT &&
               row.cells[0]?.workPieceId === material.workPieceId &&
               row.cells[0]?.workPieceVariantId === material.workPieceVariantId
      );
      const rowIsActive: boolean = materialRow?.canProduce === PmCheckboxState.ACTIVE;
      material.canProduce = (rowIsActive || columnIsActive) ? PmCheckboxState.ACTIVE : PmCheckboxState.DEFAULT;
    });
  }

  private updateColumnCells(column: IMatrixColumn, newState: PmCheckboxState): void {
    const colIdx: number = this.matrixData.columns.findIndex(
      (col: IMatrixColumn) => col.measurementId === column.measurementId
    );
    
    if (colIdx < 0) return;

    this.matrixData.rows.forEach((row: IMatrixRow) => {
      if (row.cells[colIdx]) {
        const rowCanProduce: boolean = row.canProduce !== PmCheckboxState.ACTIVE;
        row.cells[colIdx].isEditable = !this.readonly && newState !== PmCheckboxState.ACTIVE && rowCanProduce;
      }
    });
  }

  getValidationError(key: string): string | undefined {
    return this.validationErrors.get(key);
  }

  hasValidationError(key: string): boolean {
    return this.validationErrors.has(key);
  }

  // ── Fill Assistant ────────────────────────────────────────────────

  openRowFillPopover(row: IMatrixRow): void {
    if (this.readonly) return;
    this.closeAllPopovers();
    this.activePopoverRowId = row.rowId;
    this.rowFillSourceOptions = getAvailableRowSources(this.matrixData, row.rowId);
  }

  openColumnFillPopover(column: IMatrixColumn): void {
    if (this.readonly) return;
    this.closeAllPopovers();
    this.activePopoverColumnId = column.columnId;
    this.columnFillSourceOptions = getAvailableColumnSources(this.matrixData, column.columnId);
  }

  closeAllPopovers(): void {
    this.activePopoverRowId = null;
    this.activePopoverColumnId = null;
  }

  onRowFillApply(row: IMatrixRow, rule: IFillRule): void {
    row.fillRule = rule;
    this.applyRowFillRule(row);
    row.fillRule = {
      mode: EFillMode.MANUAL
    };
    updateRowCellsEditableState(row, true, this.readonly, this.matrixData.columns);
    this.closeAllPopovers();
    this.emitDataChange();
    this.validateData();
  }

  onColumnFillApply(column: IMatrixColumn, rule: IFillRule): void {
    column.fillRule = rule;
    this.applyColumnFillRule(column);
    column.fillRule = {
      mode: EFillMode.MANUAL
    };
    updateColumnCellsEditableState(this.matrixData, column, true, this.readonly);
    this.closeAllPopovers();
    this.emitDataChange();
    this.validateData();
  }

  private applyRowFillRule(row: IMatrixRow): void {
    if (!row.fillRule || row.fillRule.mode === EFillMode.MANUAL) {
      updateRowCellsEditableState(row, true, this.readonly, this.matrixData.columns);
      return;
    }

    const sourceRow: IMatrixRow | undefined = this.matrixData.rows.find(
      (matrixRow: IMatrixRow) => matrixRow.rowId === row.fillRule!.sourceId
    );
    if (!sourceRow) return;

    const multiplier: number = getFillMultiplier(row.fillRule);
    row.cells.forEach((cell: IMatrixCell, index: number) => {
      const sourceValue: number = sourceRow.cells[index]?.value ?? 0;
      const newValue: number = Math.round(sourceValue * multiplier * 100) / 100;
      cell.value = newValue;
      this.syncCellToInternalData(cell, newValue);
    });
  }

  private applyColumnFillRule(column: IMatrixColumn): void {
    if (!column.fillRule || column.fillRule.mode === EFillMode.MANUAL) {
      updateColumnCellsEditableState(this.matrixData, column, true, this.readonly);
      return;
    }

    const sourceColumn: IMatrixColumn | undefined = this.matrixData.columns.find(
      (matrixCol: IMatrixColumn) => matrixCol.columnId === column.fillRule!.sourceId
    );
    if (!sourceColumn) return;

    const colIdx: number = this.matrixData.columns.indexOf(column);
    const sourceColIdx: number = this.matrixData.columns.indexOf(sourceColumn);
    const multiplier: number = getFillMultiplier(column.fillRule);

    this.matrixData.rows.forEach((row: IMatrixRow) => {
        const sourceValue: number = row.cells[sourceColIdx]?.value ?? 0;
        const newValue: number = Math.round(sourceValue * multiplier * 100) / 100;
        if (row.cells[colIdx]) {
          row.cells[colIdx].value = newValue;
          this.syncCellToInternalData(row.cells[colIdx], newValue, row.rowType);
        }
      });
  }

  private syncCellToInternalData(cell: IMatrixCell, newValue: number, rowType: EMatrixRowType = EMatrixRowType.MATERIAL_VARIANT): void {
    this.ensureInternalDataCopy();
    const measurementsToUpdate: IStepMeasurementVariants[] = this.getDataSource();
    const measurement: IStepMeasurementVariants | undefined = measurementsToUpdate.find(
      (variant: IStepMeasurementVariants) => variant.measurementId === cell.measurementId
    );
    if (measurement) {
      this.updateMeasurementValue(rowType, measurement, cell, newValue);
    }
  }

  isFirstNonMaterialRow(row: IMatrixRow, index: number): boolean {
    return index > 0
      && this.matrixData.rows[index - 1].rowType === EMatrixRowType.MATERIAL_VARIANT
      && row.rowType !== EMatrixRowType.MATERIAL_VARIANT;
  }

  isRowFillActive(row: IMatrixRow): boolean {
    return !!row.fillRule && row.fillRule.mode !== EFillMode.MANUAL;
  }

  isColumnFillActive(column: IMatrixColumn): boolean {
    return !!column.fillRule && column.fillRule.mode !== EFillMode.MANUAL;
  }
}
