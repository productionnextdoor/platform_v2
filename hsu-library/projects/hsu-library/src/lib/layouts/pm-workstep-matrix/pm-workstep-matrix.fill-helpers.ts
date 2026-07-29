import {
  IWorkstepMatrixData,
  IMatrixRow,
  IMatrixColumn,
  IMatrixCell,
  IFillSourceOption,
  IFillRule,
  EFillMode,
  EMatrixRowType
} from './pm-workstep-matrix.shared';
import { PmCheckboxState } from '../../components/pm-checkbox/pm-checkbox.shared';

export function getAvailableRowSources(matrixData: IWorkstepMatrixData, excludeRowId: string): IFillSourceOption[] {
  return matrixData.rows
    .filter((row: IMatrixRow) =>
      row.rowType === EMatrixRowType.MATERIAL_VARIANT &&
      row.rowId !== excludeRowId
    )
    .map((row: IMatrixRow) => ({
      sourceId: row.rowId,
      label: row.label
    }));
}

export function getAvailableColumnSources(matrixData: IWorkstepMatrixData, excludeColumnId: string): IFillSourceOption[] {
  return matrixData.columns
    .filter((col: IMatrixColumn) =>
      col.columnId !== excludeColumnId
    )
    .map((col: IMatrixColumn) => ({
      sourceId: col.columnId,
      label: col.measurementName
    }));
}

export function getFillMultiplier(fillRule: IFillRule): number {
  if (fillRule.mode === EFillMode.PERCENTAGE) {
    return (fillRule.percentage ?? 100) / 100;
  }
  return 1;
}

export function updateRowCellsEditableState(
  row: IMatrixRow,
  editable: boolean,
  readonly: boolean,
  columns: IMatrixColumn[]
): void {
  row.cells.forEach((cell: IMatrixCell, index: number) => {
    const columnIsActive: boolean = columns[index]?.canProduce === PmCheckboxState.ACTIVE;
    const rowIsActive: boolean = row.canProduce === PmCheckboxState.ACTIVE;
    cell.isEditable = !readonly && editable && !columnIsActive && !rowIsActive;
  });
}

export function updateColumnCellsEditableState(
  matrixData: IWorkstepMatrixData,
  column: IMatrixColumn,
  editable: boolean,
  readonly: boolean
): void {
  const colIdx: number = matrixData.columns.indexOf(column);
  if (colIdx < 0) return;

  matrixData.rows
    .filter((row: IMatrixRow) => row.rowType === EMatrixRowType.MATERIAL_VARIANT)
    .forEach((row: IMatrixRow) => {
      if (row.cells[colIdx]) {
        const rowIsActive: boolean = row.canProduce === PmCheckboxState.ACTIVE;
        const columnIsActive: boolean = column.canProduce === PmCheckboxState.ACTIVE;
        row.cells[colIdx].isEditable = !readonly && editable && !rowIsActive && !columnIsActive;
      }
    });
}
