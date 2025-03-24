import { Injectable } from '@angular/core';
import { IProducerOverviewTableService } from './iproducer-overview-table.service';
import { AppLocalizationService } from '../localization/app-localization.service';
import {
  PmDropdownOption,
  IColumnHeader,
  Row,
  Icon,
  EActionButtonElementType,
  ICell
} from 'hsu-library';
import {
  DEFAULT_PER_PAGE,
  PER_PAGE_1,
  PER_PAGE_2,
  PER_PAGE_3,
  TableBaseService
} from '../table/table-base.service';
import {
  ProducerOverviewOutput,
  TradeTypeDto,
  UserStatus
} from '../../shared/service-proxies/service-proxies';


export const enum EProducerOverviewColumns {
  CompanyColumn = 'companyName',
  TradeColumn = 'tradeTypeName',
  AddressColumn = 'address',
  MailColumn = 'mail',
  PhoneColumn = 'phone',
  IsActiveColumn = 'status',
  DetailsColumn = 'details',
}

@Injectable()
export class ProducerOverviewTableService extends IProducerOverviewTableService {
  constructor(
    private readonly localizationService: AppLocalizationService,
    private readonly tableBaseService: TableBaseService
  ) {
    super();
  }

  public getPaginationOptions(): PmDropdownOption<string>[] {
    const paginationCounts: number[] = [DEFAULT_PER_PAGE, PER_PAGE_1, PER_PAGE_2, PER_PAGE_3];
    return paginationCounts.map(amount => ({
      key: amount.toString(),
      value: amount.toString()
    }));
  }

  public getProducerOverviewColumnHeaders(showDetailsColumn: boolean): IColumnHeader[] {
    const columnHeaders: IColumnHeader[] = [
      this.tableBaseService.createTextColumnHeader(EProducerOverviewColumns.CompanyColumn, this.localizationService.loc('ProducerTableHeader.Name'), true),
      this.tableBaseService.createTextColumnHeader(EProducerOverviewColumns.TradeColumn, this.localizationService.loc('ProducerTableHeader.TradeType'), true),
      this.tableBaseService.createTextColumnHeader(EProducerOverviewColumns.AddressColumn, this.localizationService.loc('ProducerTableHeader.Address'), false),
      this.tableBaseService.createTextColumnHeader(EProducerOverviewColumns.MailColumn, this.localizationService.loc('ProducerTableHeader.Mail'), false),
      this.tableBaseService.createTextColumnHeader(EProducerOverviewColumns.PhoneColumn, this.localizationService.loc('ProducerTableHeader.Phone'), false),
      this.tableBaseService.createTextColumnHeader(EProducerOverviewColumns.IsActiveColumn, this.localizationService.loc('ProducerTableHeader.State'), true),
    ];

    if (showDetailsColumn) {
      columnHeaders.push(this.tableBaseService.createTextColumnHeader(EProducerOverviewColumns.DetailsColumn, this.localizationService.loc('ProducerTableHeader.Details'), false));
    }

    return columnHeaders;

  }

  public getProducerOverviewTableRow (showDetailsColumn: boolean, producer: ProducerOverviewOutput): Row {
    const tableCells: ICell[] = [
      this.tableBaseService.createTextCell(producer.companyName ?? ''),
      this.tableBaseService.createTextCell(this.mapTradeToString(producer.trade)),
      this.tableBaseService.createTextCell(this.tableBaseService.mapAddress(producer.street, producer.zipCode,producer.city)),
      this.tableBaseService.createTextCell(producer.email),
      this.tableBaseService.createTextCell(producer.phoneNumber),
      this.tableBaseService.createTextCell(this.mapProducerStatus(producer.status)),
    ];

    if (showDetailsColumn) {
      tableCells.push(this.tableBaseService.createActionCell(Icon.ARROW, '', EActionButtonElementType.PRODUCT_DETAILS));
    }

    return {
      rowId: producer.userId,
      isHighlighted: false,
      cells: tableCells
    }
  }

  private mapTradeToString(trade: TradeTypeDto): string {
    return trade.tradeTypeName
      ? this.localizationService.loc(`${this.localizationService.getLocalizedTradeTypeName(trade.tradeTypeName)}`)
      : this.localizationService.loc('UserProfile.WorkType.Unknown')
  }

  private mapProducerStatus (status:UserStatus): string {
    return  this.localizationService.loc(`Profile.State.${UserStatus[status]}`)
  }

}
