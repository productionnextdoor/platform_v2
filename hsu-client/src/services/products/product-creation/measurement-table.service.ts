import { Injectable } from '@angular/core';
import { IMeasurementTableService } from './imeasurement-table.service';
import { AppLocalizationService } from '../../localization/app-localization.service';
import {
  IColumnHeader,
  IMeasurement,
  Row
} from 'hsu-library';
import { ITableBaseService } from '../../table/itable-base.service';

export const enum ESortingColumns {
  DragHandleColumn = 'dragHandle',
  PositionColumn = 'position',
  HeightColumn = 'height',
  WidthColumn = 'width',
  DepthColumn = 'depth',
}

@Injectable()
export class MeasurementTableService extends IMeasurementTableService {

  constructor(
    private readonly localizationService: AppLocalizationService,
    protected readonly tableBaseService: ITableBaseService,
  ) {
    super();
  }

  public getSortingColumnHeaders(): IColumnHeader[] {
    return [
      this.tableBaseService.createTextColumnHeader(ESortingColumns.DragHandleColumn, '', false),
      this.tableBaseService.createTextColumnHeader(ESortingColumns.PositionColumn, this.localizationService.loc('ProductCreateOrEditSortingMeasurements.ColumnPosition'), false),
      this.tableBaseService.createTextColumnHeader(ESortingColumns.HeightColumn, this.localizationService.loc('Measurement.Height'), false),
      this.tableBaseService.createTextColumnHeader(ESortingColumns.WidthColumn, this.localizationService.loc('Measurement.Width'), false),
      this.tableBaseService.createTextColumnHeader(ESortingColumns.DepthColumn, this.localizationService.loc('Measurement.Depth'), false)
    ];
  }

  public getMeasurementsRowData (item: IMeasurement, first: boolean = false, last: boolean = false): Row {
    return {
      rowId: item.measurementId,
      isHighlighted: item.isDefaultMeasurement,
      cells: [
        this.tableBaseService.createTextCell(
          item.position + (first !== last && first ? ' - ' + this.localizationService.loc('ProductCreateOrEditSortingMeasurements.MinimumVariant') : '')
          + (first !== last && last ? ' - ' + this.localizationService.loc('ProductCreateOrEditSortingMeasurements.MaximumVariant') : ''),
        ),
        this.tableBaseService.createTextCell(item.height.toString() + ' ' + this.localizationService.loc('Measurement.Unit')),
        this.tableBaseService.createTextCell(item.width.toString() + ' ' + this.localizationService.loc('Measurement.Unit')),
        this.tableBaseService.createTextCell(item.depth.toString() + ' ' + this.localizationService.loc('Measurement.Unit')),
      ]
    }
  }

  public setMeasurementsRowData(product: IMeasurement[]) : Row[] {
    return product.map((item, index) => (
      this.getMeasurementsRowData(item, index === 0, index === product.length - 1)
    ));
  }
}
