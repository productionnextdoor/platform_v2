import { Injectable } from '@angular/core';
import { AppLocalizationService } from '../localization/app-localization.service';
import { IDeveloperTableService } from './ideveloper-table.service';
import {
  IColumnHeader,
  PmDropdownOption,
  Icon,
  Row,
  EActionButtonElementType
} from 'hsu-library';

import {
  DEFAULT_PER_PAGE,
  PER_PAGE_1,
  PER_PAGE_2,
  PER_PAGE_3,
  TableBaseService
} from '../table/table-base.service';

import { DeveloperOverviewOutput, UserStatus } from '../../shared/service-proxies/service-proxies';

export const enum EDeveloperOverviewColumns {
  NameColumn = 'name',
  AddressColumn = 'address',
  MailColumn = 'mail',
  PhoneColumn = 'phone',
  ProductColumn = 'product',
  IsActiveColumn = 'status',
  DetailsColumn = 'details',
}

@Injectable()
export class DeveloperTableService extends IDeveloperTableService {

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

  public getDeveloperOverviewColumnHeaders(): IColumnHeader[] {
    return [
      this.tableBaseService.createTextColumnHeader(EDeveloperOverviewColumns.NameColumn, this.localizationService.loc('DeveloperTableHeader.Name'), true),
      this.tableBaseService.createTextColumnHeader(EDeveloperOverviewColumns.AddressColumn, this.localizationService.loc('DeveloperTableHeader.Address'), false),
      this.tableBaseService.createTextColumnHeader(EDeveloperOverviewColumns.MailColumn, this.localizationService.loc('DeveloperTableHeader.Mail'), false),
      this.tableBaseService.createTextColumnHeader(EDeveloperOverviewColumns.PhoneColumn, this.localizationService.loc('DeveloperTableHeader.Phone'), false),
      this.tableBaseService.createTextColumnHeader(EDeveloperOverviewColumns.ProductColumn, this.localizationService.loc('DeveloperTableHeader.Products'), false),
      this.tableBaseService.createTextColumnHeader(EDeveloperOverviewColumns.IsActiveColumn, this.localizationService.loc('DeveloperTableHeader.State'), true),
      this.tableBaseService.createTextColumnHeader(EDeveloperOverviewColumns.DetailsColumn, this.localizationService.loc('DeveloperTableHeader.Details'), false),
    ];
  }

  public getDeveloperOverviewTableRow(developer: DeveloperOverviewOutput): Row {
    return {
      rowId: developer.userId,
      isHighlighted: false,
      cells: [
        this.tableBaseService.createTextCell(developer.contactPersonFullName ?? ''),
        this.tableBaseService.createTextCell(this.tableBaseService.mapAddress(developer.street, developer.zipCode,developer.city)),
        this.tableBaseService.createTextCell(developer.email ?? ''),
        this.tableBaseService.createTextCell(developer.phoneNumber ?? ''),
        this.tableBaseService.createTextCell(developer.numberOfProducts.toString()),
        this.tableBaseService.createTextCell(this.mapDeveloperStatus(developer.status)),
        this.tableBaseService.createActionCell(Icon.ARROW, '', EActionButtonElementType.PRODUCT_DETAILS),
      ]
    }
  }

  private mapDeveloperStatus(status:UserStatus ): string {
    return  this.localizationService.loc(`Profile.State.${UserStatus[status]}`)

  }
}
