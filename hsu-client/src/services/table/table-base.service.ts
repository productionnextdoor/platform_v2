import { Injectable } from '@angular/core';
import { ITableBaseService } from './itable-base.service';
import {
  ActionCell,
  CheckboxCell,
  ECellType,
  StatusCell,
  TextCell,
  RatingCell,
  ERatingType,
  CheckboxColumnHeader,
  TableHeaderType,
  TextColumnHeader,
  PmCheckboxState,
  EActionButtonElementType,
  Icon
} from 'hsu-library';
import {
  BadRatingLimit,
  MaxRating
} from './table-service.shared';

export const DEFAULT_PER_PAGE: number = 10;
export const PER_PAGE_1: number = 20;
export const PER_PAGE_2: number = 30;
export const PER_PAGE_3: number = 40;
export const DEBOUNCE_TIME: number = 300;
export const MIN_SEARCH_LENGTH: number = 3;

@Injectable()
export class TableBaseService extends ITableBaseService {

  public createTextCell(text: string): TextCell {
    return {
      type: ECellType.TEXT_CELL,
      text: text
    }
  }

  public createActionCell(icon: Icon, link: string, type: EActionButtonElementType, disabled: boolean = false): ActionCell {
    return {
      type: ECellType.ACTION_CELL,
      actions: [
        {
          icon: icon,
          link: link,
          type: type
        }
      ],
      disabled: disabled
    }
  }

  public createCheckboxCell(value: PmCheckboxState, disabled: boolean = false): CheckboxCell {
    return {
      type: ECellType.CHECKBOX_CELL,
      value: value,
      disabled: disabled
    }
  }

  public createStatusCell(text: string): StatusCell {
    return {
      type: ECellType.STATUS_CELL,
      text: text
    }
  }

  public createRatingCell(rating: number, maxRating: number): RatingCell {
    return {
      type: ECellType.RATING_CELL,
      ratingScore: `${rating.toFixed(1)}/${MaxRating.toFixed(1)}`,
      ratingType: this.getRatingStarType(rating, maxRating)
    }
  }

  public createTextColumnHeader(columnIdentifier: string, columnTitle: string, sortable: boolean): TextColumnHeader {
    return {
      type: TableHeaderType.Text,
      columnIdentifier: columnIdentifier,
      columnTitle: columnTitle,
      sortable: sortable
    }
  }

  public createCheckboxColumnHeader(columnIdentifier: string,): CheckboxColumnHeader {
    return {
      type: TableHeaderType.Checkbox,
      columnIdentifier: columnIdentifier,
    }
  }

  public mapAddress(street?: string, zipCode?: string, city?: string): string {
    if (street && zipCode && city) {
      return street + ', ' + zipCode + ' ' + city;
    }
    return '-';
  }

  private getRatingStarType(number: number, maxRating: number): ERatingType {
    if (number === maxRating) {
      return ERatingType.BEST;
    }

    if (number < BadRatingLimit) {
      return ERatingType.WORST;
    }
    return ERatingType.DEFAULT;
  }
}
