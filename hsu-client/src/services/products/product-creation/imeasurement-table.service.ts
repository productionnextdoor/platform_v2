import {
  IColumnHeader, IMeasurement, Row
} from 'hsu-library';

export abstract class IMeasurementTableService {
  public abstract getSortingColumnHeaders(): IColumnHeader[];
  public abstract getMeasurementsRowData (item: IMeasurement, first: boolean, last: boolean): Row;
  public abstract setMeasurementsRowData(product: IMeasurement[]) : Row[];
}
