import { AppLocalizationService } from '../../localization/app-localization.service';
import { IDropdownService } from './idropdown.service';
import { Injectable } from '@angular/core';
import {
  EUserStatus,
  IProducerTradeType,
  PmDropdownOption,
  PRODUCER_RATING_UNSPECIFIED,
} from 'hsu-library';

@Injectable()
export class DropdownService extends IDropdownService {
  constructor(
    private readonly localizationService: AppLocalizationService,
  ) {
    super();
  }

  getRatingDropdownOptions(maxRating: number): PmDropdownOption<number>[] {
    const ratingDropdownOptions: PmDropdownOption<number>[] = [
      {
        key: PRODUCER_RATING_UNSPECIFIED,
        value: this.localizationService.loc('Profile.UndefinedRating'),
      }
    ];
    for (let iterator: number = 1; iterator <= maxRating; iterator++) {
      ratingDropdownOptions.push({
        key: iterator,
        value: iterator.toString(),
      });
    }
    return ratingDropdownOptions;
  }

  getTradeTypeDropdownOptions(producerTradeTypes: IProducerTradeType[]): PmDropdownOption<number>[] {
    return producerTradeTypes.map((type: IProducerTradeType) => ({
      key: type.key,
      value: type.value
    }));
  }

  getStateDropdownOptions(): PmDropdownOption<EUserStatus>[] {
    return [
      {
        key: EUserStatus.Active,
        value: this.localizationService.loc('Profile.State.Active'),
      },
      {
        key: EUserStatus.InActive,
        value: this.localizationService.loc('Profile.State.InActive'),
      },
    ];
  }
}
